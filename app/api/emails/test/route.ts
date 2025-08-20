import { NextResponse } from "next/server"
import { EmailService } from "@/lib/email"

export async function POST() {
  try {
    const testData = {
      orderNumber: "ATS-2024-0001",
      clientName: "John Smith",
      clientEmail: "client@abrahamtranslation.com",
      sourceLanguage: "English",
      targetLanguage: "Spanish",
      documentType: "Legal Document",
      urgency: "standard",
      estimatedPrice: 150.0,
      finalPrice: 150.0,
      wordCount: 1250,
      specialInstructions: "Please ensure legal terminology is accurate.",
      status: "completed",
      notes: "Translation completed and reviewed by certified linguist.",
    }

    // Test different email types
    const confirmationEmail = EmailService.generateOrderConfirmationEmail(testData)
    const paymentEmail = EmailService.generatePaymentConfirmationEmail(testData)
    const statusEmail = EmailService.generateStatusUpdateEmail(testData)
    const adminEmail = EmailService.generateAdminNotificationEmail(testData)

    await EmailService.sendEmail("client@abrahamtranslation.com", confirmationEmail)
    await EmailService.sendEmail("client@abrahamtranslation.com", paymentEmail)
    await EmailService.sendEmail("client@abrahamtranslation.com", statusEmail)
    await EmailService.sendEmail("abraham@abrahamtranslation.com", adminEmail)

    return NextResponse.json({
      success: true,
      message: "Test emails sent successfully (check console logs)",
    })
  } catch (error) {
    console.error("Error sending test emails:", error)
    return NextResponse.json({ error: "Failed to send test emails" }, { status: 500 })
  }
}
