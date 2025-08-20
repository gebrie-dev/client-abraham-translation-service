interface EmailTemplate {
  subject: string
  html: string
  text: string
}

interface OrderEmailData {
  orderNumber: string
  clientName: string
  clientEmail: string
  sourceLanguage: string
  targetLanguage: string
  documentType: string
  urgency: string
  estimatedPrice?: number
  finalPrice?: number
  wordCount?: number
  specialInstructions?: string
  status?: string
  notes?: string
}

export class EmailService {
  private static baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  private static testingEmail = "gabiwagnew@gmail.com" // Your verified email for testing

  static async sendEmail(to: string, template: EmailTemplate): Promise<boolean> {
    try {
      if (process.env.RESEND_API_KEY) {
        const recipientEmail = process.env.NODE_ENV === "development" ? this.testingEmail : to

        const response = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "Abraham Translation Service <onboarding@resend.dev>",
            to: [recipientEmail],
            subject: `[${to}] ${template.subject}`, // Show original recipient in subject for testing
            html: template.html,
            text: template.text,
          }),
        })

        if (response.ok) {
          console.log("✅ Email sent successfully to:", recipientEmail, "(intended for:", to, ")")
          return true
        } else {
          const errorText = await response.text()
          console.error("❌ Email failed:", errorText)
          return false
        }
      } else {
        // Development mode - log to console
        console.log("📧 [DEV MODE] Email would be sent to:", to)
        console.log("📧 Subject:", template.subject)
        console.log("📧 Content preview:", template.html.substring(0, 200) + "...")
        return true
      }
    } catch (error) {
      console.error("Error sending email:", error)
      return false
    }
  }

  static generateOrderConfirmationEmail(data: OrderEmailData): EmailTemplate {
    const trackingUrl = `${this.baseUrl}/client/track`

    return {
      subject: `Order Confirmation - ${data.orderNumber}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Order Confirmation</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f9fafb; }
            .container { max-width: 600px; margin: 0 auto; background-color: white; }
            .header { background-color: #2563eb; color: white; padding: 20px; text-align: center; }
            .content { padding: 30px; }
            .order-details { background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0; }
            .detail-row { display: flex; justify-content: space-between; margin-bottom: 10px; }
            .detail-label { font-weight: 600; color: #6b7280; }
            .detail-value { color: #111827; }
            .button { display: inline-block; background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600; margin: 10px 0; }
            .footer { background-color: #f9fafb; padding: 20px; text-align: center; color: #6b7280; font-size: 14px; }
            .price { font-size: 24px; font-weight: bold; color: #059669; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Order Confirmation</h1>
              <p>Thank you for choosing Abraham Translation Service</p>
            </div>
            
            <div class="content">
              <p>Dear ${data.clientName},</p>
              
              <p>We have received your translation order and it is currently being reviewed by our team. You will receive a confirmation with final pricing within 2 hours.</p>
              
              <div class="order-details">
                <h3>Order Details</h3>
                <div class="detail-row">
                  <span class="detail-label">Order Number:</span>
                  <span class="detail-value">${data.orderNumber}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Languages:</span>
                  <span class="detail-value">${data.sourceLanguage} → ${data.targetLanguage}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Document Type:</span>
                  <span class="detail-value">${data.documentType}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Urgency:</span>
                  <span class="detail-value">${data.urgency}</span>
                </div>
                ${
                  data.wordCount
                    ? `<div class="detail-row">
                  <span class="detail-label">Word Count:</span>
                  <span class="detail-value">${data.wordCount.toLocaleString()} words</span>
                </div>`
                    : ""
                }
                ${
                  data.estimatedPrice
                    ? `<div class="detail-row">
                  <span class="detail-label">Estimated Price:</span>
                  <span class="detail-value price">$${data.estimatedPrice}</span>
                </div>`
                    : ""
                }
              </div>
              
              ${
                data.specialInstructions
                  ? `<div class="order-details">
                <h3>Special Instructions</h3>
                <p>${data.specialInstructions}</p>
              </div>`
                  : ""
              }
              
              <p>You can track your order status at any time using the link below:</p>
              
              <a href="${trackingUrl}" class="button">Track Your Order</a>
              
              <p>If you have any questions, please don't hesitate to contact us:</p>
              <ul>
                <li>Email: support@abrahamtranslation.com</li>
                <li>Phone: +1 (555) 123-4567</li>
              </ul>
            </div>
            
            <div class="footer">
              <p>Abraham Translation Service<br>
              123 Translation Street, New York, NY 10001<br>
              © 2024 Abraham Translation Service. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
Order Confirmation - ${data.orderNumber}

Dear ${data.clientName},

We have received your translation order and it is currently being reviewed by our team. You will receive a confirmation with final pricing within 2 hours.

Order Details:
- Order Number: ${data.orderNumber}
- Languages: ${data.sourceLanguage} → ${data.targetLanguage}
- Document Type: ${data.documentType}
- Urgency: ${data.urgency}
${data.wordCount ? `- Word Count: ${data.wordCount.toLocaleString()} words` : ""}
${data.estimatedPrice ? `- Estimated Price: $${data.estimatedPrice}` : ""}

${data.specialInstructions ? `Special Instructions: ${data.specialInstructions}` : ""}

Track your order: ${trackingUrl}

Contact us:
- Email: support@abrahamtranslation.com
- Phone: +1 (555) 123-4567

Abraham Translation Service
123 Translation Street, New York, NY 10001
      `,
    }
  }

  static generatePaymentConfirmationEmail(data: OrderEmailData): EmailTemplate {
    const trackingUrl = `${this.baseUrl}/client/track`

    return {
      subject: `Payment Confirmed - ${data.orderNumber}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Payment Confirmation</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f9fafb; }
            .container { max-width: 600px; margin: 0 auto; background-color: white; }
            .header { background-color: #059669; color: white; padding: 20px; text-align: center; }
            .content { padding: 30px; }
            .order-details { background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0; }
            .detail-row { display: flex; justify-content: space-between; margin-bottom: 10px; }
            .detail-label { font-weight: 600; color: #6b7280; }
            .detail-value { color: #111827; }
            .button { display: inline-block; background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600; margin: 10px 0; }
            .footer { background-color: #f9fafb; padding: 20px; text-align: center; color: #6b7280; font-size: 14px; }
            .price { font-size: 24px; font-weight: bold; color: #059669; }
            .success { background-color: #d1fae5; color: #065f46; padding: 15px; border-radius: 6px; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>✅ Payment Confirmed</h1>
              <p>Your translation is now in progress</p>
            </div>
            
            <div class="content">
              <p>Dear ${data.clientName},</p>
              
              <div class="success">
                <strong>Great news!</strong> Your payment has been successfully processed and your translation work has begun.
              </div>
              
              <div class="order-details">
                <h3>Payment Details</h3>
                <div class="detail-row">
                  <span class="detail-label">Order Number:</span>
                  <span class="detail-value">${data.orderNumber}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Amount Paid:</span>
                  <span class="detail-value price">$${data.finalPrice}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Payment Date:</span>
                  <span class="detail-value">${new Date().toLocaleDateString()}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Expected Delivery:</span>
                  <span class="detail-value">
                    ${data.urgency === "standard" ? "5-7 business days" : ""}
                    ${data.urgency === "urgent" ? "2-3 business days" : ""}
                    ${data.urgency === "rush" ? "24 hours" : ""}
                  </span>
                </div>
              </div>
              
              <h3>What happens next?</h3>
              <ol>
                <li><strong>Translation begins:</strong> Our certified translators start working on your document immediately</li>
                <li><strong>Quality review:</strong> Your translation undergoes thorough quality assurance</li>
                <li><strong>Delivery:</strong> You'll receive an email when your translation is ready for download</li>
              </ol>
              
              <a href="${trackingUrl}" class="button">Track Your Order</a>
              
              <p>Thank you for choosing Abraham Translation Service!</p>
            </div>
            
            <div class="footer">
              <p>Abraham Translation Service<br>
              123 Translation Street, New York, NY 10001<br>
              © 2024 Abraham Translation Service. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
Payment Confirmed - ${data.orderNumber}

Dear ${data.clientName},

Great news! Your payment has been successfully processed and your translation work has begun.

Payment Details:
- Order Number: ${data.orderNumber}
- Amount Paid: $${data.finalPrice}
- Payment Date: ${new Date().toLocaleDateString()}
- Expected Delivery: ${
        data.urgency === "standard" ? "5-7 business days" : data.urgency === "urgent" ? "2-3 business days" : "24 hours"
      }

What happens next?
1. Translation begins: Our certified translators start working on your document immediately
2. Quality review: Your translation undergoes thorough quality assurance
3. Delivery: You'll receive an email when your translation is ready for download

Track your order: ${trackingUrl}

Thank you for choosing Abraham Translation Service!

Abraham Translation Service
123 Translation Street, New York, NY 10001
      `,
    }
  }

  static generateStatusUpdateEmail(data: OrderEmailData): EmailTemplate {
    const trackingUrl = `${this.baseUrl}/client/track`
    const statusMessages = {
      in_progress: "Your translation work has begun",
      completed: "Your translation is complete and under final review",
      delivered: "Your translation is ready for download",
    }

    const statusMessage = statusMessages[data.status as keyof typeof statusMessages] || "Order status updated"

    return {
      subject: `Order Update - ${data.orderNumber}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Order Update</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f9fafb; }
            .container { max-width: 600px; margin: 0 auto; background-color: white; }
            .header { background-color: #2563eb; color: white; padding: 20px; text-align: center; }
            .content { padding: 30px; }
            .status-update { background-color: #dbeafe; color: #1e40af; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center; }
            .order-details { background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0; }
            .detail-row { display: flex; justify-content: space-between; margin-bottom: 10px; }
            .detail-label { font-weight: 600; color: #6b7280; }
            .detail-value { color: #111827; }
            .button { display: inline-block; background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600; margin: 10px 0; }
            .footer { background-color: #f9fafb; padding: 20px; text-align: center; color: #6b7280; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Order Update</h1>
              <p>Status update for your translation</p>
            </div>
            
            <div class="content">
              <p>Dear ${data.clientName},</p>
              
              <div class="status-update">
                <h2>${statusMessage}</h2>
                <p>Order ${data.orderNumber} status: <strong>${data.status?.replace("_", " ").toUpperCase()}</strong></p>
              </div>
              
              ${
                data.notes
                  ? `<div class="order-details">
                <h3>Update Notes</h3>
                <p>${data.notes}</p>
              </div>`
                  : ""
              }
              
              <div class="order-details">
                <h3>Order Information</h3>
                <div class="detail-row">
                  <span class="detail-label">Order Number:</span>
                  <span class="detail-value">${data.orderNumber}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Languages:</span>
                  <span class="detail-value">${data.sourceLanguage} → ${data.targetLanguage}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Document Type:</span>
                  <span class="detail-value">${data.documentType}</span>
                </div>
              </div>
              
              <a href="${trackingUrl}" class="button">View Order Details</a>
              
              <p>Thank you for choosing Abraham Translation Service!</p>
            </div>
            
            <div class="footer">
              <p>Abraham Translation Service<br>
              123 Translation Street, New York, NY 10001<br>
              © 2024 Abraham Translation Service. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
Order Update - ${data.orderNumber}

Dear ${data.clientName},

${statusMessage}
Order ${data.orderNumber} status: ${data.status?.replace("_", " ").toUpperCase()}

${data.notes ? `Update Notes: ${data.notes}` : ""}

Order Information:
- Order Number: ${data.orderNumber}
- Languages: ${data.sourceLanguage} → ${data.targetLanguage}
- Document Type: ${data.documentType}

View order details: ${trackingUrl}

Thank you for choosing Abraham Translation Service!

Abraham Translation Service
123 Translation Street, New York, NY 10001
      `,
    }
  }

  static generateAdminNotificationEmail(data: OrderEmailData): EmailTemplate {
    const adminUrl = `${this.baseUrl}/admin`

    return {
      subject: `New Order Received - ${data.orderNumber}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Order Notification</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f9fafb; }
            .container { max-width: 600px; margin: 0 auto; background-color: white; }
            .header { background-color: #dc2626; color: white; padding: 20px; text-align: center; }
            .content { padding: 30px; }
            .order-details { background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0; }
            .detail-row { display: flex; justify-content: space-between; margin-bottom: 10px; }
            .detail-label { font-weight: 600; color: #6b7280; }
            .detail-value { color: #111827; }
            .button { display: inline-block; background-color: #dc2626; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600; margin: 10px 0; }
            .footer { background-color: #f9fafb; padding: 20px; text-align: center; color: #6b7280; font-size: 14px; }
            .urgent { background-color: #fef2f2; color: #991b1b; padding: 15px; border-radius: 6px; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🚨 New Order Alert</h1>
              <p>Action required: Review and confirm pricing</p>
            </div>
            
            <div class="content">
              <p>Hello Abraham,</p>
              
              ${
                data.urgency === "rush"
                  ? `<div class="urgent">
                <strong>RUSH ORDER:</strong> This order requires 24-hour delivery. Please prioritize!
              </div>`
                  : ""
              }
              
              <p>A new translation order has been submitted and requires your review.</p>
              
              <div class="order-details">
                <h3>Order Details</h3>
                <div class="detail-row">
                  <span class="detail-label">Order Number:</span>
                  <span class="detail-value">${data.orderNumber}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Client:</span>
                  <span class="detail-value">${data.clientName} (${data.clientEmail})</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Languages:</span>
                  <span class="detail-value">${data.sourceLanguage} → ${data.targetLanguage}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Document Type:</span>
                  <span class="detail-value">${data.documentType}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Urgency:</span>
                  <span class="detail-value">${data.urgency}</span>
                </div>
                ${
                  data.wordCount
                    ? `<div class="detail-row">
                  <span class="detail-label">Word Count:</span>
                  <span class="detail-value">${data.wordCount.toLocaleString()} words</span>
                </div>`
                    : ""
                }
                ${
                  data.estimatedPrice
                    ? `<div class="detail-row">
                  <span class="detail-label">Estimated Price:</span>
                  <span class="detail-value">$${data.estimatedPrice}</span>
                </div>`
                    : ""
                }
              </div>
              
              ${
                data.specialInstructions
                  ? `<div class="order-details">
                <h3>Special Instructions</h3>
                <p>${data.specialInstructions}</p>
              </div>`
                  : ""
              }
              
              <p><strong>Next Steps:</strong></p>
              <ol>
                <li>Review the uploaded document</li>
                <li>Confirm final pricing and timeline</li>
                <li>Send payment link to client</li>
              </ol>
              
              <a href="${adminUrl}" class="button">Review Order in Admin Panel</a>
            </div>
            
            <div class="footer">
              <p>Abraham Translation Service Admin Panel<br>
              Professional translation service management.</p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
New Order Received - ${data.orderNumber}

Hello Abraham,

${data.urgency === "rush" ? "RUSH ORDER: This order requires 24-hour delivery. Please prioritize!" : ""}

A new translation order has been submitted and requires your review.

Order Details:
- Order Number: ${data.orderNumber}
- Client: ${data.clientName} (${data.clientEmail})
- Languages: ${data.sourceLanguage} → ${data.targetLanguage}
- Document Type: ${data.documentType}
- Urgency: ${data.urgency}
${data.wordCount ? `- Word Count: ${data.wordCount.toLocaleString()} words` : ""}
${data.estimatedPrice ? `- Estimated Price: $${data.estimatedPrice}` : ""}

${data.specialInstructions ? `Special Instructions: ${data.specialInstructions}` : ""}

Next Steps:
1. Review the uploaded document
2. Confirm final pricing and timeline
3. Send payment link to client

Review order: ${adminUrl}

Abraham Translation Service Admin Panel
      `,
    }
  }
}
