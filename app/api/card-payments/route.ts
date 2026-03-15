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
      .select("id, order_no, customer_name, customer_phone, customer_email, card_last4, card_brand, card_holder, card_expiry_month, card_expiry_year, total, status, created_at")
      .eq("payment_method", "card")
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Failed to fetch card payments:", error)
      return NextResponse.json({ error: "Failed to fetch card payments" }, { status: 500 })
    }

    return NextResponse.json({ orders: data || [] })
  } catch (error) {
    console.error("Failed to fetch card payments:", error)
    return NextResponse.json({ error: "Failed to fetch card payments" }, { status: 500 })
  }
}
