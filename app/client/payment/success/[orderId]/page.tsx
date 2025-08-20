import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Mail, ArrowRight, Download } from "lucide-react"
import Link from "next/link"
import { createServerClient } from "@/lib/supabase/server"
import { LANGUAGES } from "@/lib/types"
import { notFound } from "next/navigation"

interface PageProps {
  params: {
    orderId: string
  }
}

export default async function PaymentSuccessPage({ params }: PageProps) {
  const supabase = createServerClient()
  if (!supabase) {
    return <div>Database not configured</div>
  }

  const { data: order, error } = await supabase
    .from("translation_orders")
    .select(`
      *,
      client:clients(*)
    `)
    .eq("id", params.orderId)
    .single()

  if (error || !order) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">ATS</span>
              </div>
              <span className="text-xl font-bold text-gray-900">Abraham Translation Service</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Success Message */}
        <div className="text-center mb-8">
          <div className="bg-green-100 p-4 rounded-full w-fit mx-auto mb-4">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment Successful!</h1>
          <p className="text-lg text-gray-600">Your translation order is now being processed.</p>
        </div>

        {/* Order Details */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Payment Confirmation</span>
              <Badge className="bg-green-100 text-green-800">Paid</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Order Information</h3>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm text-gray-500">Order Number</span>
                    <p className="font-mono text-lg font-semibold text-blue-600">{order.order_number}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Languages</span>
                    <p className="font-medium">
                      {LANGUAGES[order.source_language as keyof typeof LANGUAGES]} →{" "}
                      {LANGUAGES[order.target_language as keyof typeof LANGUAGES]}
                    </p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Document Type</span>
                    <p className="font-medium">{order.document_type}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Urgency</span>
                    <p className="font-medium capitalize">{order.urgency}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Payment Details</h3>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm text-gray-500">Amount Paid</span>
                    <p className="text-2xl font-bold text-green-600">${order.final_price}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Payment Date</span>
                    <p className="font-medium">{new Date().toLocaleDateString()}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Payment Method</span>
                    <p className="font-medium">Credit Card</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Expected Delivery</span>
                    <p className="font-medium">
                      {order.urgency === "standard" && "5-7 business days"}
                      {order.urgency === "urgent" && "2-3 business days"}
                      {order.urgency === "rush" && "24 hours"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Mail className="h-5 w-5" />
              <span>What Happens Next?</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="bg-green-100 text-green-600 rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold">
                  ✓
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Payment Confirmed</h4>
                  <p className="text-sm text-gray-600">Your payment has been successfully processed.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold">
                  2
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Translation Begins</h4>
                  <p className="text-sm text-gray-600">
                    Our certified translators will begin working on your document immediately.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold">
                  3
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Quality Review</h4>
                  <p className="text-sm text-gray-600">
                    Your translation will undergo thorough quality assurance checks.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold">
                  4
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Delivery</h4>
                  <p className="text-sm text-gray-600">
                    You'll receive an email notification when your translation is ready for download.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Important Information */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Important Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Confirmation Email</h4>
              <p className="text-sm text-gray-600">
                A payment confirmation and receipt has been sent to{" "}
                <span className="font-semibold">{order.client?.email}</span>.
              </p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Track Your Order</h4>
              <p className="text-sm text-gray-600">
                Use order number <span className="font-mono font-semibold">{order.order_number}</span> to track your
                order progress at any time.
              </p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Need Help?</h4>
              <p className="text-sm text-gray-600">
                Contact us at <span className="font-semibold">support@abrahamtranslation.com</span> or{" "}
                <span className="font-semibold">+1 (555) 123-4567</span> if you have any questions.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/client/track">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Track Your Order
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
          <Button variant="outline" size="lg">
            <Download className="h-4 w-4 mr-2" />
            Download Receipt
          </Button>
          <Link href="/">
            <Button variant="outline" size="lg">
              Return to Homepage
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
