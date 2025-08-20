"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, FileText, Download, Save, Mail, Globe, DollarSign } from "lucide-react"
import { LANGUAGES } from "@/lib/types"
import type { TranslationOrder } from "@/lib/types"

interface AdminOrderDetailsProps {
  order: TranslationOrder
  onBack: () => void
  onUpdate: () => void
}

export default function AdminOrderDetails({ order, onBack, onUpdate }: AdminOrderDetailsProps) {
  const [status, setStatus] = useState(order.status)
  const [finalPrice, setFinalPrice] = useState(order.final_price?.toString() || order.estimated_price?.toString() || "")
  const [notes, setNotes] = useState("")
  const [isUpdating, setIsUpdating] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)

  const handleStatusUpdate = async () => {
    setIsUpdating(true)
    try {
      const formData = new FormData()
      formData.append("orderId", order.id)
      formData.append("status", status)
      formData.append("notes", notes)
      if (finalPrice) formData.append("finalPrice", finalPrice)
      if (uploadedFile) formData.append("translatedFile", uploadedFile)

      const response = await fetch("/api/admin/orders/update", {
        method: "POST",
        body: formData,
      })

      if (response.ok) {
        alert("Order updated successfully!")
        onUpdate()
      } else {
        alert("Failed to update order")
      }
    } catch (error) {
      console.error("Error updating order:", error)
      alert("Failed to update order")
    } finally {
      setIsUpdating(false)
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0])
    }
  }

  const handleFileDownload = async (file: any) => {
    try {
      const response = await fetch(
        `/api/files/download?filePath=${encodeURIComponent(file.file_path)}&fileName=${encodeURIComponent(file.file_name)}`,
      )
      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = file.file_name
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)
      } else {
        alert("Failed to download file")
      }
    } catch (error) {
      console.error("Error downloading file:", error)
      alert("Failed to download file")
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "in_progress":
        return "bg-blue-100 text-blue-800"
      case "completed":
        return "bg-green-100 text-green-800"
      case "delivered":
        return "bg-purple-100 text-purple-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const formatStatus = (status: string) => {
    return status
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Orders
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Order {order.order_number}</h1>
            <p className="text-gray-600">Submitted on {new Date(order.created_at).toLocaleDateString()}</p>
          </div>
        </div>
        <Badge className={getStatusColor(order.status)}>{formatStatus(order.status)}</Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Order Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Client Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Mail className="h-5 w-5" />
                <span>Client Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm text-gray-500">Name</Label>
                  <p className="font-medium">
                    {order.client?.first_name} {order.client?.last_name}
                  </p>
                </div>
                <div>
                  <Label className="text-sm text-gray-500">Email</Label>
                  <p className="font-medium">{order.client?.email}</p>
                </div>
                {order.client?.phone && (
                  <div>
                    <Label className="text-sm text-gray-500">Phone</Label>
                    <p className="font-medium">{order.client.phone}</p>
                  </div>
                )}
                {order.client?.company && (
                  <div>
                    <Label className="text-sm text-gray-500">Company</Label>
                    <p className="font-medium">{order.client.company}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Translation Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Globe className="h-5 w-5" />
                <span>Translation Details</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm text-gray-500">Source Language</Label>
                  <p className="font-medium">{LANGUAGES[order.source_language as keyof typeof LANGUAGES]}</p>
                </div>
                <div>
                  <Label className="text-sm text-gray-500">Target Language</Label>
                  <p className="font-medium">{LANGUAGES[order.target_language as keyof typeof LANGUAGES]}</p>
                </div>
                <div>
                  <Label className="text-sm text-gray-500">Document Type</Label>
                  <p className="font-medium">{order.document_type}</p>
                </div>
                <div>
                  <Label className="text-sm text-gray-500">Urgency</Label>
                  <p className="font-medium capitalize">{order.urgency}</p>
                </div>
                {order.word_count && (
                  <div>
                    <Label className="text-sm text-gray-500">Word Count</Label>
                    <p className="font-medium">{order.word_count.toLocaleString()} words</p>
                  </div>
                )}
              </div>

              {order.special_instructions && (
                <div>
                  <Label className="text-sm text-gray-500">Special Instructions</Label>
                  <p className="font-medium bg-gray-50 p-3 rounded-lg">{order.special_instructions}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Files */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5" />
                <span>Files</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {order.files && order.files.length > 0 ? (
                <div className="space-y-3">
                  {order.files.map((file) => (
                    <div key={file.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <FileText className="h-5 w-5 text-blue-600" />
                        <div>
                          <p className="font-medium">{file.file_name}</p>
                          <p className="text-xs text-gray-500">
                            {file.is_source ? "Source Document" : "Translated Document"} •{" "}
                            {(file.file_size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => handleFileDownload(file)}>
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No files uploaded</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Actions Panel */}
        <div className="space-y-6">
          {/* Status Update */}
          <Card>
            <CardHeader>
              <CardTitle>Update Order</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="status">Status</Label>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="finalPrice">Final Price ($)</Label>
                <Input
                  id="finalPrice"
                  type="number"
                  step="0.01"
                  value={finalPrice}
                  onChange={(e) => setFinalPrice(e.target.value)}
                  placeholder="Enter final price"
                />
              </div>

              <div>
                <Label htmlFor="notes">Update Notes</Label>
                <Textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add notes about this update..."
                  rows={3}
                />
              </div>

              <Button onClick={handleStatusUpdate} disabled={isUpdating} className="w-full">
                <Save className="h-4 w-4 mr-2" />
                {isUpdating ? "Updating..." : "Update Order"}
              </Button>
            </CardContent>
          </Card>

          {/* File Upload */}
          <Card>
            <CardHeader>
              <CardTitle>Upload Translated Document</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="translatedFile">Translated File</Label>
                <Input id="translatedFile" type="file" onChange={handleFileUpload} accept=".pdf,.doc,.docx,.txt" />
                {uploadedFile && <p className="text-sm text-gray-600 mt-2">Selected: {uploadedFile.name}</p>}
              </div>
              <p className="text-xs text-gray-500">
                Upload the completed translation. This will be available for the client to download.
              </p>
            </CardContent>
          </Card>

          {/* Pricing Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <DollarSign className="h-5 w-5" />
                <span>Pricing</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Estimated Price:</span>
                <span className="font-medium">${order.estimated_price || "0.00"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Final Price:</span>
                <span className="font-medium">${order.final_price || "TBD"}</span>
              </div>
              <div className="flex justify-between border-t pt-2">
                <span className="font-medium">Status:</span>
                <span className="font-medium">{order.final_price ? "Finalized" : "Pending"}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
