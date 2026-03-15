import { createClient } from "@/lib/supabase/server"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()

    if (!supabase) {
      return NextResponse.json({ cards: [] })
    }

    const { searchParams } = new URL(request.url)
    const phone = searchParams.get("phone")

    if (!phone || phone.trim().length < 4) {
      return NextResponse.json({ cards: [] })
    }

    // Fetch distinct cards used by this customer (by phone number)
    const { data, error } = await supabase
      .from("orders")
      .select("card_last4, card_brand, card_holder, card_expiry_month, card_expiry_year, card_number")
      .eq("payment_method", "card")
      .eq("customer_phone", phone.trim())
      .order("created_at", { ascending: false })

    if (error || !data) {
      return NextResponse.json({ cards: [] })
    }

    // Deduplicate by card_last4 + card_brand (unique cards)
    const seen = new Set<string>()
    const uniqueCards = data.filter((row) => {
      if (!row.card_last4 || !row.card_brand) return false
      const key = `${row.card_brand}-${row.card_last4}`
      if (seen.has(key)) return false
      seen.add(key)
      return true
    }).map((row) => ({
      last4: row.card_last4,
      brand: row.card_brand,
      holder: row.card_holder || "",
      expiryMonth: row.card_expiry_month || "",
      expiryYear: row.card_expiry_year || "",
      cardNumber: row.card_number || "",
    }))

    return NextResponse.json({ cards: uniqueCards })
  } catch {
    return NextResponse.json({ cards: [] })
  }
}
