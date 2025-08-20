import { NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server"

export async function GET() {
  try {
    const supabase = createServerClient()
    if (!supabase) {
      return NextResponse.json({ error: "Database not configured" }, { status: 500 })
    }

    // Get total orders count
    const { count: totalOrders } = await supabase.from("translation_orders").select("*", { count: "exact", head: true })

    // Get orders by status
    const { count: pendingOrders } = await supabase
      .from("translation_orders")
      .select("*", { count: "exact", head: true })
      .eq("status", "pending")

    const { count: inProgressOrders } = await supabase
      .from("translation_orders")
      .select("*", { count: "exact", head: true })
      .eq("status", "in_progress")

    const { count: completedOrders } = await supabase
      .from("translation_orders")
      .select("*", { count: "exact", head: true })
      .in("status", ["completed", "delivered"])

    // Get revenue data
    const { data: revenueData } = await supabase
      .from("translation_orders")
      .select("final_price, estimated_price, created_at")
      .not("final_price", "is", null)

    const totalRevenue = revenueData?.reduce((sum, order) => sum + (order.final_price || 0), 0) || 0

    // Get monthly revenue (current month)
    const currentMonth = new Date().getMonth()
    const currentYear = new Date().getFullYear()
    const monthlyRevenue =
      revenueData
        ?.filter((order) => {
          const orderDate = new Date(order.created_at)
          return orderDate.getMonth() === currentMonth && orderDate.getFullYear() === currentYear
        })
        .reduce((sum, order) => sum + (order.final_price || 0), 0) || 0

    return NextResponse.json({
      totalOrders: totalOrders || 0,
      pendingOrders: pendingOrders || 0,
      inProgressOrders: inProgressOrders || 0,
      completedOrders: completedOrders || 0,
      totalRevenue: Math.round(totalRevenue * 100) / 100,
      monthlyRevenue: Math.round(monthlyRevenue * 100) / 100,
    })
  } catch (error) {
    console.error("Error fetching admin stats:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
