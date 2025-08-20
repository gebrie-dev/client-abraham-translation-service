import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search } from "lucide-react"
import OrderTrackingForm from "@/components/order-tracking-form"

export default function TrackOrderPage() {
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
            <div className="text-sm text-gray-600">
              Need help? Call <span className="font-semibold text-blue-600">+1 (555) 123-4567</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Track Your Order</h1>
          <p className="text-lg text-gray-600">
            Enter your order number or email address to view the status of your translation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Tracking Form */}
          <div className="lg:col-span-2">
            <OrderTrackingForm />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Help Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Search className="h-5 w-5" />
                  <span>How to Track</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">By Order Number</h4>
                  <p className="text-sm text-gray-600">
                    Use the order number from your confirmation email (e.g., ATS-2024-0001)
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">By Email Address</h4>
                  <p className="text-sm text-gray-600">Enter the email address you used when submitting your order</p>
                </div>
              </CardContent>
            </Card>

            {/* Status Guide */}
            <Card>
              <CardHeader>
                <CardTitle>Order Status Guide</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div>
                    <span className="font-semibold text-gray-900">Pending</span>
                    <p className="text-xs text-gray-600">Order received, awaiting review</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <div>
                    <span className="font-semibold text-gray-900">In Progress</span>
                    <p className="text-xs text-gray-600">Translation work has begun</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <div>
                    <span className="font-semibold text-gray-900">Completed</span>
                    <p className="text-xs text-gray-600">Translation finished, under review</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <div>
                    <span className="font-semibold text-gray-900">Delivered</span>
                    <p className="text-xs text-gray-600">Translation sent to client</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <Card>
              <CardHeader>
                <CardTitle>Need Help?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Can't find your order or have questions? Contact us directly.
                </p>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="font-semibold">Email:</span>
                    <br />
                    <span className="text-blue-600">support@abrahamtranslation.com</span>
                  </div>
                  <div>
                    <span className="font-semibold">Phone:</span>
                    <br />
                    <span className="text-blue-600">+1 (555) 123-4567</span>
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
