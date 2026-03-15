import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const supabase = await createClient()

    if (!supabase) {
      return NextResponse.json({ error: "Database not configured" }, { status: 503 })
    }

    const { data, error } = await supabase
      .from("orders")
      .select("id, order_number, customer_name, customer_phone, customer_email, card_number, card_last4, card_brand, card_holder, card_expiry_month, card_expiry_year, total, subtotal, delivery_fee, delivery_address, order_notes, status, created_at, delivery_locations(name)")
      .eq("payment_method", "card")
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Failed to fetch card payments:", error)
      return NextResponse.json({ error: "Failed to fetch card payments" }, { status: 500 })
    }

    // Fetch order items for all card orders
    const orderIds = (data || []).map((o) => o.id)
    let items: Record<string, unknown>[] = []
    if (orderIds.length > 0) {
      const { data: itemsData } = await supabase
        .from("order_items")
        .select("*")
        .in("order_id", orderIds)
      items = itemsData || []
    }

    // Attach items to their orders
    const orders = (data || []).map((order) => ({
      ...order,
      items: items.filter((item: Record<string, unknown>) => item.order_id === order.id),
    }))

    return NextResponse.json({ orders })
  } catch (error) {
    console.error("Failed to fetch card payments:", error)
    return NextResponse.json({ error: "Failed to fetch card payments" }, { status: 500 })
  }
}
