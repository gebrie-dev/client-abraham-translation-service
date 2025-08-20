import { NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server"

export async function GET() {
  try {
    const supabase = createServerClient()
    if (!supabase) {
      return NextResponse.json({ error: "Database not configured" }, { status: 500 })
    }

    const { data: orders, error } = await supabase
      .from("translation_orders")
      .select(`
        *,
        client:clients(*),
        files:order_files(*)
      `)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching orders:", error)
      return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 })
    }

    return NextResponse.json({ orders: orders || [] })
  } catch (error) {
    console.error("Error in admin orders:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
