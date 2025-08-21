import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Clock, CheckCircle } from "lucide-react"
import OrderSubmissionForm from "@/components/order-submission-form"

export default function SubmitOrderPage() {
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
              Need help? Call <span className="font-semibold text-blue-600">+251 911141966</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Submit Your Document</h1>
          <p className="text-lg text-gray-600">
            Get an instant quote for professional translation services. Upload your document and we'll provide pricing
            and timeline immediately.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <OrderSubmissionForm />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Process Steps */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">How It Works</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Upload Document</h4>
                    <p className="text-sm text-gray-600">Securely upload your document for translation</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Get Instant Quote</h4>
                    <p className="text-sm text-gray-600">Receive pricing and timeline immediately</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Approve & Pay</h4>
                    <p className="text-sm text-gray-600">Confirm your order and make secure payment</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold">
                    4
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Receive Translation</h4>
                    <p className="text-sm text-gray-600">Get your professional translation on time</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Trust Indicators */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Why Choose Us?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Shield className="h-5 w-5 text-green-500" />
                  <span className="text-sm text-gray-700">100% Confidential & Secure</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-sm text-gray-700">Certified Translators</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-green-500" />
                  <span className="text-sm text-gray-700">Fast Turnaround</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-sm text-gray-700">Quality Guaranteed</span>
                </div>
              </CardContent>
            </Card>

          

         
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Supported Languages</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {[
                    "English",
                    "Spanish",
                    "French",
                    "German",
                    "Italian",
                    "Portuguese",
                    "Russian",
                    "Chinese",
                    "Japanese",
                    "Korean",
                    "Arabic",
                    "Amharic",
                    "affan Oromo",
                    "Tigrinya",
                  ].map((language) => (
                    <Badge key={language} variant="secondary" className="text-xs">
                      {language}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
