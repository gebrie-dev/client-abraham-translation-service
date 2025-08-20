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

    const { orderId, amount, paymentMethod } = await request.json()

    if (!orderId || !amount || !paymentMethod) {
      return NextResponse.json({ error: "Missing required payment information" }, { status: 400 })
    }

    // Get order details for email
    const { data: order } = await supabase
      .from("translation_orders")
      .select(`
        *,
        client:clients(*)
      `)
      .eq("id", orderId)
      .single()

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 })
    }

    // In production, you would:
    // 1. Create a payment intent with Stripe
    // 2. Confirm the payment with the provided payment method
    // 3. Handle the payment result

    // For demo purposes, we'll simulate a successful payment
    const paymentSuccessful = true // In reality, this would come from Stripe

    if (paymentSuccessful) {
      // Update order status to in_progress
      const { error: updateError } = await supabase
        .from("translation_orders")
        .update({
          status: "in_progress",
        })
        .eq("id", orderId)

      if (updateError) {
        console.error("Error updating order:", updateError)
        return NextResponse.json({ error: "Failed to update order status" }, { status: 500 })
      }

      // Add status history
      await supabase.from("order_status_history").insert({
        order_id: orderId,
        status: "in_progress",
        notes: "Payment received successfully. Translation work has begun.",
      })

      const emailData = {
        orderNumber: order.order_number,
        clientName: `${order.client.first_name} ${order.client.last_name}`,
        clientEmail: order.client.email,
        sourceLanguage: LANGUAGES[order.source_language as keyof typeof LANGUAGES],
        targetLanguage: LANGUAGES[order.target_language as keyof typeof LANGUAGES],
        documentType: order.document_type,
        urgency: order.urgency,
        finalPrice: order.final_price,
      }

      const paymentEmail = EmailService.generatePaymentConfirmationEmail(emailData)
      await EmailService.sendEmail(order.client.email, paymentEmail)

      return NextResponse.json({
        success: true,
        message: "Payment processed successfully",
      })
    } else {
      return NextResponse.json({ error: "Payment failed. Please try again." }, { status: 400 })
    }
  } catch (error) {
    console.error("Payment processing error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
