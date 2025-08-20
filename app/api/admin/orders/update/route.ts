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

    const formData = await request.formData()
    const orderId = formData.get("orderId") as string
    const status = formData.get("status") as string
    const notes = formData.get("notes") as string
    const finalPrice = formData.get("finalPrice") as string
    const translatedFile = formData.get("translatedFile") as File | null

    if (!orderId || !status) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Get current order details for email
    const { data: currentOrder } = await supabase
      .from("translation_orders")
      .select(`
        *,
        client:clients(*)
      `)
      .eq("id", orderId)
      .single()

    if (!currentOrder) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 })
    }

    // Update order
    const updateData: any = { status }
    if (finalPrice) {
      updateData.final_price = Number.parseFloat(finalPrice)
    }

    const { error: updateError } = await supabase.from("translation_orders").update(updateData).eq("id", orderId)

    if (updateError) {
      console.error("Error updating order:", updateError)
      return NextResponse.json({ error: "Failed to update order" }, { status: 500 })
    }

    // Add status history
    await supabase.from("order_status_history").insert({
      order_id: orderId,
      status,
      notes: notes || null,
    })

    // Handle file upload if provided
    if (translatedFile) {
      const fileExt = translatedFile.name.split(".").pop()
      const fileName = `${orderId}-translated.${fileExt}`
      const filePath = `orders/${orderId}/${fileName}`

      const { error: uploadError } = await supabase.storage.from("documents").upload(filePath, translatedFile, {
        upsert: true,
      })

      if (!uploadError) {
        // Save file record
        await supabase.from("order_files").insert({
          order_id: orderId,
          file_name: translatedFile.name,
          file_path: filePath,
          file_type: fileExt || "unknown",
          file_size: translatedFile.size,
          is_source: false,
        })
      }
    }

    const emailData = {
      orderNumber: currentOrder.order_number,
      clientName: `${currentOrder.client.first_name} ${currentOrder.client.last_name}`,
      clientEmail: currentOrder.client.email,
      sourceLanguage: LANGUAGES[currentOrder.source_language as keyof typeof LANGUAGES],
      targetLanguage: LANGUAGES[currentOrder.target_language as keyof typeof LANGUAGES],
      documentType: currentOrder.document_type,
      urgency: currentOrder.urgency,
      status,
      notes,
    }

    // Only send email for significant status changes
    if (["in_progress", "completed", "delivered"].includes(status)) {
      const statusEmail = EmailService.generateStatusUpdateEmail(emailData)
      await EmailService.sendEmail(currentOrder.client.email, statusEmail)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error in order update:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
