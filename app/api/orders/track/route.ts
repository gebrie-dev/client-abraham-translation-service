import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server"

export async function GET(request: NextRequest) {
  try {
    const supabase = createServerClient()
    if (!supabase) {
      return NextResponse.json({ error: "Database not configured" }, { status: 500 })
    }

    const { searchParams } = new URL(request.url)
    const type = searchParams.get("type") // "order" or "email"
    const value = searchParams.get("value")

    if (!type || !value) {
      return NextResponse.json({ error: "Missing search parameters" }, { status: 400 })
    }

    let query = supabase.from("translation_orders").select(`
        *,
        client:clients(*),
        files:order_files(*),
        status_history:order_status_history(*)
      `)

    if (type === "order") {
      query = query.eq("order_number", value)
    } else if (type === "email") {
      // First get client ID by email, then get orders
      const { data: client } = await supabase.from("clients").select("id").eq("email", value).single()

      if (!client) {
        return NextResponse.json({ orders: [] })
      }

      query = query.eq("client_id", client.id)
    } else {
      return NextResponse.json({ error: "Invalid search type" }, { status: 400 })
    }

    const { data: orders, error } = await query.order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching orders:", error)
      return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 })
    }

    return NextResponse.json({ orders: orders || [] })
  } catch (error) {
    console.error("Error in order tracking:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
