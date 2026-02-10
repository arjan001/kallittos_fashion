import { getProducts } from "@/lib/supabase-data"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    console.log("[v0] /api/products GET called")
    const products = await getProducts()
    console.log("[v0] products fetched:", products.length)
    return NextResponse.json(products)
  } catch (error) {
    console.error("[v0] Failed to fetch products:", error)
    return NextResponse.json({ error: "Failed to fetch products", details: String(error) }, { status: 500 })
  }
}
