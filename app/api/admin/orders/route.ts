import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET() {
  const supabase = await createClient()

  const { data: orders, error } = await supabase
    .from("orders")
    .select("*, delivery_locations(name)")
    .order("created_at", { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  // Get order items for each order
  const orderIds = (orders || []).map((o) => o.id)
  const { data: items } = await supabase
    .from("order_items")
    .select("*")
    .in("order_id", orderIds.length > 0 ? orderIds : ["none"])

  const itemsByOrder: Record<string, typeof items> = {}
  for (const item of items || []) {
    if (!itemsByOrder[item.order_id]) itemsByOrder[item.order_id] = []
    itemsByOrder[item.order_id].push(item)
  }

  const result = (orders || []).map((o) => ({
    id: o.id,
    orderNo: o.order_number,
    customer: o.customer_name,
    phone: o.customer_phone,
    email: o.customer_email || "",
    items: (itemsByOrder[o.id] || []).map((item) => ({
      name: item.product_name,
      qty: item.quantity,
      price: Number(item.unit_price),
      variation: item.variation || undefined,
      image: item.product_image || undefined,
    })),
    subtotal: Number(o.subtotal),
    delivery: Number(o.delivery_fee),
    total: Number(o.total),
    location: o.delivery_locations?.name || o.delivery_address || "",
    address: o.delivery_address || "",
    notes: o.notes || "",
    status: o.status,
    orderedVia: o.ordered_via || "website",
    date: o.created_at ? new Date(o.created_at).toISOString().split("T")[0] : "",
  }))

  return NextResponse.json(result)
}

export async function PATCH(request: Request) {
  const supabase = await createClient()
  const body = await request.json()

  if (!body.id || !body.status) {
    return NextResponse.json({ error: "Missing id or status" }, { status: 400 })
  }

  const { error } = await supabase
    .from("orders")
    .update({ status: body.status })
    .eq("id", body.id)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
