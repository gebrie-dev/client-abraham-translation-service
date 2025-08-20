import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { createServerClient } from "@/lib/supabase/server"
import { LANGUAGES } from "@/lib/types"
import { notFound } from "next/navigation"
import PaymentForm from "@/components/payment-form"
import { CreditCard, Shield, Clock } from "lucide-react"

interface PageProps {
  params: {
    orderId: string
  }
}

export default async function PaymentPage({ params }: PageProps) {
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

  // Check if order is already paid or not ready for payment
  if (order.status !== "pending" || !order.final_price) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="p-8 text-center">
            <h1 className="text-xl font-semibold mb-4">Payment Not Available</h1>
            <p className="text-gray-600">
              {order.status !== "pending"
                ? "This order has already been processed."
                : "Payment is not yet available for this order. Please wait for price confirmation."}
            </p>
          </CardContent>
        </Card>
      </div>
    )
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
            <div className="flex items-center space-x-2">
              <Shield className="h-4 w-4 text-green-600" />
              <span className="text-sm text-gray-600">Secure Payment</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Complete Your Payment</h1>
          <p className="text-lg text-gray-600">Secure payment for your translation order</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment Form */}
          <div className="lg:col-span-2">
            <PaymentForm order={order} />
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CreditCard className="h-5 w-5" />
                  <span>Order Summary</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-500">Order Number</span>
                    <span className="font-mono text-sm">{order.order_number}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-500">Languages</span>
                    <span className="text-sm">
                      {LANGUAGES[order.source_language as keyof typeof LANGUAGES]} →{" "}
                      {LANGUAGES[order.target_language as keyof typeof LANGUAGES]}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-500">Document Type</span>
                    <span className="text-sm">{order.document_type}</span>
                  </div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm text-gray-500">Urgency</span>
                    <Badge variant="secondary" className="capitalize">
                      {order.urgency}
                    </Badge>
                  </div>
                  {order.word_count && (
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-sm text-gray-500">Word Count</span>
                      <span className="text-sm">{order.word_count.toLocaleString()} words</span>
                    </div>
                  )}
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold">Total Amount</span>
                    <span className="text-2xl font-bold text-blue-600">${order.final_price}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Security Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="h-5 w-5" />
                  <span>Secure Payment</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">256-bit SSL encryption</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">PCI DSS compliant</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Powered by Stripe</span>
                </div>
              </CardContent>
            </Card>

            {/* Timeline */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="h-5 w-5" />
                  <span>What Happens Next</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center text-xs font-semibold">
                    1
                  </div>
                  <div>
                    <p className="text-sm font-medium">Payment Processing</p>
                    <p className="text-xs text-gray-500">Secure payment confirmation</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center text-xs font-semibold">
                    2
                  </div>
                  <div>
                    <p className="text-sm font-medium">Translation Begins</p>
                    <p className="text-xs text-gray-500">Work starts immediately</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center text-xs font-semibold">
                    3
                  </div>
                  <div>
                    <p className="text-sm font-medium">Delivery</p>
                    <p className="text-xs text-gray-500">
                      {order.urgency === "standard" && "5-7 business days"}
                      {order.urgency === "urgent" && "2-3 business days"}
                      {order.urgency === "rush" && "24 hours"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
