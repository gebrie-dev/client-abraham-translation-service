"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { CreditCard, Lock, AlertCircle } from "lucide-react"
import type { TranslationOrder } from "@/lib/types"

interface PaymentFormProps {
  order: TranslationOrder
}

export default function PaymentForm({ order }: PaymentFormProps) {
  const router = useRouter()
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [agreedToTerms, setAgreedToTerms] = useState(false)

  // Mock payment form - in production, you'd use Stripe Elements
  const [paymentData, setPaymentData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
    billingAddress: {
      line1: "",
      city: "",
      state: "",
      postalCode: "",
      country: "US",
    },
  })

  const handleInputChange = (field: string, value: string) => {
    if (field.startsWith("billing.")) {
      const billingField = field.split(".")[1]
      setPaymentData((prev) => ({
        ...prev,
        billingAddress: {
          ...prev.billingAddress,
          [billingField]: value,
        },
      }))
    } else {
      setPaymentData((prev) => ({
        ...prev,
        [field]: value,
      }))
    }
  }

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ""
    const parts = []

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }

    if (parts.length) {
      return parts.join(" ")
    } else {
      return v
    }
  }

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    if (v.length >= 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`
    }
    return v
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!agreedToTerms) {
      setError("Please agree to the terms and conditions")
      return
    }

    setIsProcessing(true)
    setError(null)

    try {
      // In production, you'd create a payment intent with Stripe
      const response = await fetch("/api/payments/process", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId: order.id,
          amount: order.final_price,
          paymentMethod: {
            card: {
              number: paymentData.cardNumber.replace(/\s/g, ""),
              exp_month: paymentData.expiryDate.split("/")[0],
              exp_year: `20${paymentData.expiryDate.split("/")[1]}`,
              cvc: paymentData.cvv,
            },
            billing_details: {
              name: paymentData.cardholderName,
              address: paymentData.billingAddress,
            },
          },
        }),
      })

      const result = await response.json()

      if (response.ok && result.success) {
        // Redirect to success page
        router.push(`/client/payment/success/${order.id}`)
      } else {
        setError(result.error || "Payment failed. Please try again.")
      }
    } catch (error) {
      console.error("Payment error:", error)
      setError("Payment failed. Please try again.")
    } finally {
      setIsProcessing(false)
    }
  }

  const isFormValid =
    paymentData.cardNumber.replace(/\s/g, "").length >= 13 &&
    paymentData.expiryDate.length === 5 &&
    paymentData.cvv.length >= 3 &&
    paymentData.cardholderName.trim() &&
    paymentData.billingAddress.line1.trim() &&
    paymentData.billingAddress.city.trim() &&
    paymentData.billingAddress.state.trim() &&
    paymentData.billingAddress.postalCode.trim() &&
    agreedToTerms

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <CreditCard className="h-5 w-5" />
          <span>Payment Information</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-4">
              <div className="flex items-center">
                <AlertCircle className="h-4 w-4 text-red-600 mr-2" />
                <span className="text-sm text-red-600">{error}</span>
              </div>
            </div>
          )}

          {/* Card Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Card Information</h3>

            <div>
              <Label htmlFor="cardNumber">Card Number</Label>
              <Input
                id="cardNumber"
                placeholder="1234 5678 9012 3456"
                value={paymentData.cardNumber}
                onChange={(e) => handleInputChange("cardNumber", formatCardNumber(e.target.value))}
                maxLength={19}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="expiryDate">Expiry Date</Label>
                <Input
                  id="expiryDate"
                  placeholder="MM/YY"
                  value={paymentData.expiryDate}
                  onChange={(e) => handleInputChange("expiryDate", formatExpiryDate(e.target.value))}
                  maxLength={5}
                  required
                />
              </div>
              <div>
                <Label htmlFor="cvv">CVV</Label>
                <Input
                  id="cvv"
                  placeholder="123"
                  value={paymentData.cvv}
                  onChange={(e) => handleInputChange("cvv", e.target.value.replace(/\D/g, ""))}
                  maxLength={4}
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="cardholderName">Cardholder Name</Label>
              <Input
                id="cardholderName"
                placeholder="John Doe"
                value={paymentData.cardholderName}
                onChange={(e) => handleInputChange("cardholderName", e.target.value)}
                required
              />
            </div>
          </div>

          {/* Billing Address */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Billing Address</h3>

            <div>
              <Label htmlFor="billingLine1">Address Line 1</Label>
              <Input
                id="billingLine1"
                placeholder="123 Main Street"
                value={paymentData.billingAddress.line1}
                onChange={(e) => handleInputChange("billing.line1", e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="billingCity">City</Label>
                <Input
                  id="billingCity"
                  placeholder="New York"
                  value={paymentData.billingAddress.city}
                  onChange={(e) => handleInputChange("billing.city", e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="billingState">State</Label>
                <Input
                  id="billingState"
                  placeholder="NY"
                  value={paymentData.billingAddress.state}
                  onChange={(e) => handleInputChange("billing.state", e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="billingPostalCode">Postal Code</Label>
              <Input
                id="billingPostalCode"
                placeholder="10001"
                value={paymentData.billingAddress.postalCode}
                onChange={(e) => handleInputChange("billing.postalCode", e.target.value)}
                required
              />
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="flex items-start space-x-2">
            <Checkbox
              id="terms"
              checked={agreedToTerms}
              onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
            />
            <Label htmlFor="terms" className="text-sm text-gray-600 leading-relaxed">
              I agree to the{" "}
              <a href="/terms" className="text-blue-600 hover:underline">
                Terms and Conditions
              </a>{" "}
              and{" "}
              <a href="/privacy" className="text-blue-600 hover:underline">
                Privacy Policy
              </a>
              . I authorize Abraham Translation Service to charge my payment method for the amount shown above.
            </Label>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={!isFormValid || isProcessing}
            className="w-full bg-blue-600 hover:bg-blue-700 py-3 text-lg"
          >
            <Lock className="h-4 w-4 mr-2" />
            {isProcessing ? "Processing Payment..." : `Pay $${order.final_price}`}
          </Button>

          <div className="text-center text-xs text-gray-500">
            Your payment information is encrypted and secure. We never store your card details.
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
