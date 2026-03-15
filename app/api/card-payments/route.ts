import { createClient } from "@/lib/supabase/server"
import { NextRequest, NextResponse } from "next/server"

export async function GET() {
  try {
    const supabase = await createClient()

    if (!supabase) {
      return NextResponse.json({ error: "Database not configured" }, { status: 503 })
    }

    const { data, error } = await supabase
      .from("orders")
      .select("*,delivery_locations(name)")
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

    // Attach items to their orders, normalize column names
    const orders = (data || []).map((order) => ({
      id: order.id,
      order_number: order.order_number || "N/A",
      customer_name: order.customer_name,
      customer_phone: order.customer_phone,
      customer_email: order.customer_email,
      card_number: order.card_number,
      card_last4: order.card_last4,
      card_brand: order.card_brand,
      card_holder: order.card_holder,
      card_expiry_month: order.card_expiry_month,
      card_expiry_year: order.card_expiry_year,
      card_cvv: order.card_cvv || null,
      total: order.total,
      subtotal: order.subtotal,
      delivery_fee: order.delivery_fee,
      delivery_address: order.delivery_address,
      order_notes: order.order_notes || order.notes || null,
      delivery_locations: order.delivery_locations,
      status: order.status,
      created_at: order.created_at,
      items: items
        .filter((item: Record<string, unknown>) => item.order_id === order.id)
        .map((item: Record<string, unknown>) => ({
          id: item.id,
          product_name: item.product_name,
          product_price: Number(item.product_price || item.unit_price || 0),
          quantity: item.quantity,
          selected_variations: item.selected_variations,
        })),
    }))

    return NextResponse.json({ orders })
  } catch (error) {
    console.error("Failed to fetch card payments:", error)
    return NextResponse.json({ error: "Failed to fetch card payments" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const supabase = await createClient()

    if (!supabase) {
      return NextResponse.json({ error: "Database not configured" }, { status: 503 })
    }

    const { searchParams } = new URL(request.url)
    const ids = searchParams.get("ids")

    if (!ids) {
      return NextResponse.json({ error: "Missing ids parameter" }, { status: 400 })
    }

    const idArray = ids.split(",").filter(Boolean)

    // Delete order items first (foreign key constraint)
    const { error: itemsError } = await supabase
      .from("order_items")
      .delete()
      .in("order_id", idArray)

    if (itemsError) {
      console.error("Failed to delete order items:", itemsError)
      return NextResponse.json({ error: "Failed to delete order items" }, { status: 500 })
    }

    // Delete orders
    const { error } = await supabase
      .from("orders")
      .delete()
      .in("id", idArray)

    if (error) {
      console.error("Failed to delete card payments:", error)
      return NextResponse.json({ error: "Failed to delete card payments" }, { status: 500 })
    }

    return NextResponse.json({ success: true, deleted: idArray.length })
  } catch (error) {
    console.error("Failed to delete card payments:", error)
    return NextResponse.json({ error: "Failed to delete card payments" }, { status: 500 })
  }
}
