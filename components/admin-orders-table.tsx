"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Eye, Search } from "lucide-react"
import { LANGUAGES } from "@/lib/types"
import type { TranslationOrder } from "@/lib/types"

interface AdminOrdersTableProps {
  onOrderSelect: (order: TranslationOrder) => void
}

export default function AdminOrdersTable({ onOrderSelect }: AdminOrdersTableProps) {
  const [orders, setOrders] = useState<TranslationOrder[]>([])
  const [filteredOrders, setFilteredOrders] = useState<TranslationOrder[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  useEffect(() => {
    fetchOrders()
  }, [])

  useEffect(() => {
    filterOrders()
  }, [orders, searchTerm, statusFilter])

  const fetchOrders = async () => {
    try {
      const response = await fetch("/api/admin/orders")
      if (response.ok) {
        const data = await response.json()
        setOrders(data.orders || [])
      }
    } catch (error) {
      console.error("Error fetching orders:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const filterOrders = () => {
    let filtered = orders

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (order) =>
          order.order_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.client?.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          `${order.client?.first_name} ${order.client?.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Filter by status
    if (statusFilter !== "all") {
      filtered = filtered.filter((order) => order.status === statusFilter)
    }

    setFilteredOrders(filtered)
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

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <div className="text-gray-500">Loading orders...</div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Orders Management</CardTitle>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search by order number, client name, or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="in_progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        {filteredOrders.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            {orders.length === 0 ? "No orders found" : "No orders match your filters"}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-2">Order #</th>
                  <th className="text-left py-3 px-2">Client</th>
                  <th className="text-left py-3 px-2">Languages</th>
                  <th className="text-left py-3 px-2">Status</th>
                  <th className="text-left py-3 px-2">Price</th>
                  <th className="text-left py-3 px-2">Date</th>
                  <th className="text-left py-3 px-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-2">
                      <span className="font-mono text-sm">{order.order_number}</span>
                    </td>
                    <td className="py-3 px-2">
                      <div>
                        <div className="font-medium">
                          {order.client?.first_name} {order.client?.last_name}
                        </div>
                        <div className="text-sm text-gray-500">{order.client?.email}</div>
                      </div>
                    </td>
                    <td className="py-3 px-2">
                      <div className="text-sm">
                        {LANGUAGES[order.source_language as keyof typeof LANGUAGES]} →{" "}
                        {LANGUAGES[order.target_language as keyof typeof LANGUAGES]}
                      </div>
                    </td>
                    <td className="py-3 px-2">
                      <Badge className={getStatusColor(order.status)}>{formatStatus(order.status)}</Badge>
                    </td>
                    <td className="py-3 px-2">
                      <span className="font-medium">{order.estimated_price ? `$${order.estimated_price}` : "TBD"}</span>
                    </td>
                    <td className="py-3 px-2">
                      <span className="text-sm text-gray-500">{new Date(order.created_at).toLocaleDateString()}</span>
                    </td>
                    <td className="py-3 px-2">
                      <Button variant="outline" size="sm" onClick={() => onOrderSelect(order)}>
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
