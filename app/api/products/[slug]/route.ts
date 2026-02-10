import { NextResponse } from "next/server"
import { getProductBySlug, getProducts } from "@/lib/supabase-data"

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const product = await getProductBySlug(slug)

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    // Fetch related products (same category)
    const allProducts = await getProducts()
    const similar = allProducts
      .filter((p) => p.id !== product.id && p.categorySlug === product.categorySlug)
      .slice(0, 4)

    const youMayLike = allProducts
      .filter((p) => p.id !== product.id && !similar.some((s) => s.id === p.id))
      .slice(0, 4)

    return NextResponse.json({ product, similar, youMayLike })
  } catch (error) {
    console.error("Failed to fetch product:", error)
    return NextResponse.json({ error: "Failed to fetch product" }, { status: 500 })
  }
}
