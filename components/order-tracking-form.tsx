"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, FileText, Download, Clock, CheckCircle, AlertCircle, Globe, DollarSign } from "lucide-react"
import { LANGUAGES } from "@/lib/types"
import type { TranslationOrder, OrderFile, OrderStatusHistory } from "@/lib/types"

interface OrderWithDetails extends TranslationOrder {
  files: OrderFile[]
  status_history: OrderStatusHistory[]
}

export default function OrderTrackingForm() {
  const [searchType, setSearchType] = useState<"order" | "email">("order")
  const [searchValue, setSearchValue] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [orders, setOrders] = useState<OrderWithDetails[]>([])
  const [error, setError] = useState<string | null>(null)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchValue.trim()) return

    setIsSearching(true)
    setError(null)

    try {
      const params = new URLSearchParams({
        type: searchType,
        value: searchValue.trim(),
      })

      const response = await fetch(`/api/orders/track?${params}`)
      const data = await response.json()

      if (response.ok) {
        setOrders(data.orders || [])
        if (data.orders.length === 0) {
          setError("No orders found. Please check your order number or email address.")
        }
      } else {
        setError(data.error || "Failed to search orders")
      }
    } catch (error) {
      console.error("Search error:", error)
      setError("Failed to search orders. Please try again.")
    } finally {
      setIsSearching(false)
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4" />
      case "in_progress":
        return <AlertCircle className="h-4 w-4" />
      case "completed":
      case "delivered":
        return <CheckCircle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const formatStatus = (status: string) => {
    return status
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  }

  const handleFileDownload = async (filePath: string, fileName: string) => {
    try {
      const response = await fetch(`/api/files/download?path=${encodeURIComponent(filePath)}`)
      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = fileName
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)
      } else {
        alert("Failed to download file")
      }
    } catch (error) {
      console.error("Download error:", error)
      alert("Failed to download file")
    }
  }

  return (
    <div className="space-y-6">
      {/* Search Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Search className="h-5 w-5" />
            <span>Find Your Order</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="space-y-4">
            <Tabs value={searchType} onValueChange={(value) => setSearchType(value as "order" | "email")}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="order">Order Number</TabsTrigger>
                <TabsTrigger value="email">Email Address</TabsTrigger>
              </TabsList>

              <TabsContent value="order" className="space-y-4">
                <div>
                  <Label htmlFor="orderNumber">Order Number</Label>
                  <Input
                    id="orderNumber"
                    placeholder="e.g., ATS-2024-0001"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    className="mt-1"
                  />
                </div>
              </TabsContent>

              <TabsContent value="email" className="space-y-4">
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    className="mt-1"
                  />
                </div>
              </TabsContent>
            </Tabs>

            <Button type="submit" disabled={isSearching || !searchValue.trim()} className="w-full">
              {isSearching ? "Searching..." : "Track Order"}
            </Button>
          </form>

          {error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Order Results */}
      {orders.length > 0 && (
        <div className="space-y-6">
          {orders.map((order) => (
            <Card key={order.id} className="border-2">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl">Order {order.order_number}</CardTitle>
                    <p className="text-sm text-gray-600 mt-1">
                      Submitted on {new Date(order.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <Badge className={`${getStatusColor(order.status)} flex items-center space-x-1`}>
                    {getStatusIcon(order.status)}
                    <span>{formatStatus(order.status)}</span>
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Order Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="flex items-center space-x-2">
                    <Globe className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="text-xs text-gray-500">Languages</p>
                      <p className="text-sm font-medium">
                        {LANGUAGES[order.source_language as keyof typeof LANGUAGES]} →{" "}
                        {LANGUAGES[order.target_language as keyof typeof LANGUAGES]}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <FileText className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="text-xs text-gray-500">Document Type</p>
                      <p className="text-sm font-medium">{order.document_type}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="text-xs text-gray-500">Urgency</p>
                      <p className="text-sm font-medium capitalize">{order.urgency}</p>
                    </div>
                  </div>

                  {order.estimated_price && (
                    <div className="flex items-center space-x-2">
                      <DollarSign className="h-4 w-4 text-gray-500" />
                      <div>
                        <p className="text-xs text-gray-500">Price</p>
                        <p className="text-sm font-medium">${order.estimated_price}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Files */}
                {order.files && order.files.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Files</h4>
                    <div className="space-y-2">
                      {order.files.map((file) => (
                        <div key={file.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <FileText className="h-5 w-5 text-blue-600" />
                            <div>
                              <p className="font-medium text-gray-900">{file.file_name}</p>
                              <p className="text-xs text-gray-500">
                                {file.is_source ? "Source Document" : "Translated Document"} •{" "}
                                {(file.file_size / 1024 / 1024).toFixed(2)} MB
                              </p>
                            </div>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleFileDownload(file.file_path, file.file_name)}
                          >
                            <Download className="h-4 w-4 mr-1" />
                            Download
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Status Timeline */}
                {order.status_history && order.status_history.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Status History</h4>
                    <div className="space-y-3">
                      {order.status_history
                        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
                        .map((history, index) => (
                          <div key={history.id} className="flex items-start space-x-3">
                            <div
                              className={`w-2 h-2 rounded-full mt-2 ${index === 0 ? "bg-blue-600" : "bg-gray-300"}`}
                            />
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <span className="font-medium text-gray-900">{formatStatus(history.status)}</span>
                                <span className="text-xs text-gray-500">
                                  {new Date(history.created_at).toLocaleString()}
                                </span>
                              </div>
                              {history.notes && <p className="text-sm text-gray-600 mt-1">{history.notes}</p>}
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                )}

                {/* Special Instructions */}
                {order.special_instructions && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Special Instructions</h4>
                    <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">{order.special_instructions}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
