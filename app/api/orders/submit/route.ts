import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server"
import { EmailService } from "@/lib/email"
import { LANGUAGES } from "@/lib/types"

export async function POST(request: NextRequest) {
  try {
    const supabase = createServerClient()
    if (!supabase) {
      return NextResponse.json({ error: "Database not configured" }, { status: 500 })
    }

    try {
      const { error: testError } = await supabase.from("clients").select("id").limit(1)
      if (testError) {
        console.error("Database table error:", testError)
        return NextResponse.json(
          {
            error: "Database tables not found. Please run the database setup script first.",
            details: testError.message,
          },
          { status: 500 },
        )
      }
    } catch (dbError) {
      console.error("Database connection error:", dbError)
      return NextResponse.json(
        {
          error: "Database connection failed. Please check your database setup.",
          details: dbError instanceof Error ? dbError.message : "Unknown database error",
        },
        { status: 500 },
      )
    }

    const formData = await request.formData()

    // Extract and validate form data
    const clientData = {
      first_name: formData.get("firstName") as string,
      last_name: formData.get("lastName") as string,
      email: formData.get("email") as string,
      phone: (formData.get("phone") as string) || null,
      company: (formData.get("company") as string) || null,
    }

    if (!clientData.first_name || !clientData.last_name || !clientData.email) {
      return NextResponse.json({ error: "Missing required client information" }, { status: 400 })
    }

    const orderData = {
      source_language: formData.get("sourceLanguage") as string,
      target_language: formData.get("targetLanguage") as string,
      document_type: formData.get("documentType") as string,
      urgency: formData.get("urgency") as string,
      special_instructions: (formData.get("specialInstructions") as string) || null,
      word_count: Number.parseInt(formData.get("wordCount") as string) || null,
      estimated_price: Number.parseFloat(formData.get("estimatedPrice") as string) || null,
      status: "pending",
    }

    if (!orderData.source_language || !orderData.target_language || !orderData.document_type) {
      return NextResponse.json({ error: "Missing required order information" }, { status: 400 })
    }

    const file = formData.get("file") as File

    // Check if client exists, if not create one
    const { data: existingClient, error: clientSelectError } = await supabase
      .from("clients")
      .select("id")
      .eq("email", clientData.email)
      .single()

    if (clientSelectError && clientSelectError.code !== "PGRST116") {
      console.error("Error checking existing client:", clientSelectError)
      return NextResponse.json(
        {
          error: "Database error while checking client",
          details: clientSelectError.message,
        },
        { status: 500 },
      )
    }

    let clientId: string

    if (existingClient) {
      clientId = existingClient.id
      // Update client info
      const { error: updateError } = await supabase.from("clients").update(clientData).eq("id", clientId)

      if (updateError) {
        console.error("Error updating client:", updateError)
        // Continue anyway, this is not critical
      }
    } else {
      // Create new client
      const { data: newClient, error: clientError } = await supabase
        .from("clients")
        .insert(clientData)
        .select("id")
        .single()

      if (clientError) {
        console.error("Error creating client:", clientError)
        return NextResponse.json(
          {
            error: "Failed to create client record",
            details: clientError.message,
          },
          { status: 500 },
        )
      }

      clientId = newClient.id
    }

    // Create order
    const { data: order, error: orderError } = await supabase
      .from("translation_orders")
      .insert({
        ...orderData,
        client_id: clientId,
      })
      .select("id, order_number")
      .single()

    if (orderError) {
      console.error("Error creating order:", orderError)
      return NextResponse.json(
        {
          error: "Failed to create order",
          details: orderError.message,
        },
        { status: 500 },
      )
    }

    // Handle file upload to Supabase Storage
    if (file) {
      const fileExt = file.name.split(".").pop()
      const fileName = `${order.id}-source.${fileExt}`
      const filePath = `orders/${order.id}/${fileName}`

      const { error: uploadError } = await supabase.storage.from("documents").upload(filePath, file)

      if (uploadError) {
        console.error("Error uploading file:", uploadError)
        // Continue without failing the order creation
      } else {
        // Save file record
        const { error: fileRecordError } = await supabase.from("order_files").insert({
          order_id: order.id,
          file_name: file.name,
          file_path: filePath,
          file_type: fileExt || "unknown",
          file_size: file.size,
          is_source: true,
        })

        if (fileRecordError) {
          console.error("Error saving file record:", fileRecordError)
          // Continue anyway, file was uploaded successfully
        }
      }
    }

    // Create initial status history
    const { error: statusError } = await supabase.from("order_status_history").insert({
      order_id: order.id,
      status: "pending",
      notes: "Order submitted successfully",
    })

    if (statusError) {
      console.error("Error creating status history:", statusError)
      // Continue anyway, this is not critical for order creation
    }

    try {
      const emailData = {
        orderNumber: order.order_number,
        clientName: `${clientData.first_name} ${clientData.last_name}`,
        clientEmail: clientData.email,
        sourceLanguage: LANGUAGES[orderData.source_language as keyof typeof LANGUAGES],
        targetLanguage: LANGUAGES[orderData.target_language as keyof typeof LANGUAGES],
        documentType: orderData.document_type,
        urgency: orderData.urgency,
        estimatedPrice: orderData.estimated_price,
        wordCount: orderData.word_count,
        specialInstructions: orderData.special_instructions,
      }

      // Send confirmation email to client
      const clientEmail = EmailService.generateOrderConfirmationEmail(emailData)
      await EmailService.sendEmail(clientData.email, clientEmail)

      // Send notification email to admin
      const adminEmail = EmailService.generateAdminNotificationEmail(emailData)
      await EmailService.sendEmail("abraham@abrahamtranslation.com", adminEmail)
    } catch (emailError) {
      console.error("Error sending emails:", emailError)
      // Don't fail the order creation due to email issues
    }

    return NextResponse.json({
      success: true,
      orderId: order.id,
      orderNumber: order.order_number,
    })
  } catch (error) {
    console.error("Error in order submission:", error)
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
