"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, FileText, X, Calculator, Clock } from "lucide-react"
import { LANGUAGES, DOCUMENT_TYPES, URGENCY_LEVELS } from "@/lib/types"

interface FormData {
  // Client Info
  firstName: string
  lastName: string
  email: string
  phone: string
  company: string

  // Order Details
  sourceLanguage: string
  targetLanguage: string
  documentType: string
  urgency: "standard" | "urgent" | "rush"
  specialInstructions: string

  // File
  file: File | null
}

export default function OrderSubmissionForm() {
  const router = useRouter()
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    sourceLanguage: "",
    targetLanguage: "",
    documentType: "",
    urgency: "standard",
    specialInstructions: "",
    file: null,
  })

  const [dragActive, setDragActive] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [wordCount, setWordCount] = useState<number | null>(null)
  const [estimatedPrice, setEstimatedPrice] = useState<number | null>(null)

  // Calculate estimated price based on word count and urgency
  const calculatePrice = (words: number, urgency: keyof typeof URGENCY_LEVELS) => {
    const basePrice = 0.12 // $0.12 per word
    const multiplier = URGENCY_LEVELS[urgency].multiplier
    return Math.round(words * basePrice * multiplier * 100) / 100
  }

  // Handle file upload
  const handleFileUpload = (file: File) => {
    if (file.size > 10 * 1024 * 1024) {
      // 10MB limit
      alert("File size must be less than 10MB")
      return
    }

    setFormData((prev) => ({ ...prev, file }))

    // Simulate word count calculation (in real app, you'd extract text and count)
    const estimatedWords = Math.floor(file.size / 6) // Rough estimate: 6 bytes per word
    setWordCount(estimatedWords)
    setEstimatedPrice(calculatePrice(estimatedWords, formData.urgency))
  }

  // Handle drag and drop
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0])
    }
  }

  // Update price when urgency changes
  const handleUrgencyChange = (urgency: "standard" | "urgent" | "rush") => {
    setFormData((prev) => ({ ...prev, urgency }))
    if (wordCount) {
      setEstimatedPrice(calculatePrice(wordCount, urgency))
    }
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Create FormData for file upload
      const submitData = new FormData()

      // Add all form fields
      Object.entries(formData).forEach(([key, value]) => {
        if (key === "file" && value) {
          submitData.append("file", value)
        } else if (typeof value === "string") {
          submitData.append(key, value)
        }
      })

      // Add calculated values
      if (wordCount) submitData.append("wordCount", wordCount.toString())
      if (estimatedPrice) submitData.append("estimatedPrice", estimatedPrice.toString())

      const response = await fetch("/api/orders/submit", {
        method: "POST",
        body: submitData,
      })

      if (response.ok) {
        const result = await response.json()
        router.push(`/client/order-confirmation/${result.orderId}`)
      } else {
        throw new Error("Failed to submit order")
      }
    } catch (error) {
      console.error("Error submitting order:", error)
      alert("Failed to submit order. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const isFormValid =
    formData.firstName &&
    formData.lastName &&
    formData.email &&
    formData.sourceLanguage &&
    formData.targetLanguage &&
    formData.documentType &&
    formData.file

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* File Upload */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Upload className="h-5 w-5" />
            <span>Upload Document</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {!formData.file ? (
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-gray-400"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-lg font-medium text-gray-900 mb-2">Drop your document here, or click to browse</p>
              <p className="text-sm text-gray-500 mb-4">Supports PDF, DOC, DOCX, TXT files up to 10MB</p>
              <input
                type="file"
                accept=".pdf,.doc,.docx,.txt"
                onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
                className="hidden"
                id="file-upload"
              />
              <Button type="button" variant="outline" onClick={() => document.getElementById("file-upload")?.click()}>
                Choose File
              </Button>
            </div>
          ) : (
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <FileText className="h-8 w-8 text-blue-600" />
                <div>
                  <p className="font-medium text-gray-900">{formData.file.name}</p>
                  <p className="text-sm text-gray-500">
                    {(formData.file.size / 1024 / 1024).toFixed(2)} MB
                    {wordCount && ` • ~${wordCount.toLocaleString()} words`}
                  </p>
                </div>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => {
                  setFormData((prev) => ({ ...prev, file: null }))
                  setWordCount(null)
                  setEstimatedPrice(null)
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Translation Details */}
      <Card>
        <CardHeader>
          <CardTitle>Translation Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="sourceLanguage">From Language *</Label>
              <Select
                value={formData.sourceLanguage}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, sourceLanguage: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select source language" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(LANGUAGES).map(([code, name]) => (
                    <SelectItem key={code} value={code}>
                      {name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="targetLanguage">To Language *</Label>
              <Select
                value={formData.targetLanguage}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, targetLanguage: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select target language" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(LANGUAGES).map(([code, name]) => (
                    <SelectItem key={code} value={code}>
                      {name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="documentType">Document Type *</Label>
              <Select
                value={formData.documentType}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, documentType: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select document type" />
                </SelectTrigger>
                <SelectContent>
                  {DOCUMENT_TYPES.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="urgency">Urgency Level</Label>
              <Select value={formData.urgency} onValueChange={handleUrgencyChange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(URGENCY_LEVELS).map(([key, { label }]) => (
                    <SelectItem key={key} value={key}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="specialInstructions">Special Instructions (Optional)</Label>
            <Textarea
              id="specialInstructions"
              placeholder="Any specific requirements or notes for the translator..."
              value={formData.specialInstructions}
              onChange={(e) => setFormData((prev) => ({ ...prev, specialInstructions: e.target.value }))}
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">First Name *</Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => setFormData((prev) => ({ ...prev, firstName: e.target.value }))}
                required
              />
            </div>
            <div>
              <Label htmlFor="lastName">Last Name *</Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => setFormData((prev) => ({ ...prev, lastName: e.target.value }))}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                required
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="company">Company (Optional)</Label>
            <Input
              id="company"
              value={formData.company}
              onChange={(e) => setFormData((prev) => ({ ...prev, company: e.target.value }))}
            />
          </div>
        </CardContent>
      </Card>

      {/* Price Estimate */}
      {estimatedPrice && (
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Calculator className="h-6 w-6 text-blue-600" />
                <div>
                  <h3 className="font-semibold text-gray-900">Estimated Price</h3>
                  <p className="text-sm text-gray-600">
                    {wordCount?.toLocaleString()} words • {URGENCY_LEVELS[formData.urgency].label}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-blue-600">${estimatedPrice}</div>
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="h-4 w-4 mr-1" />
                  {formData.urgency === "standard" && "5-7 days"}
                  {formData.urgency === "urgent" && "2-3 days"}
                  {formData.urgency === "rush" && "24 hours"}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Submit Button */}
      <div className="flex justify-end">
        <Button
          type="submit"
          size="lg"
          disabled={!isFormValid || isSubmitting}
          className="bg-blue-600 hover:bg-blue-700 px-8"
        >
          {isSubmitting ? "Submitting..." : "Submit Order"}
        </Button>
      </div>
    </form>
  )
}
