import { ProductDetailPage } from "@/components/store/product-detail-page"
import { getProducts, getProductBySlug } from "@/lib/supabase-data"
import type { Metadata } from "next"

export async function generateStaticParams() {
  try {
    const products = await getProducts()
    return products.map((p) => ({ slug: p.slug }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  try {
    const product = await getProductBySlug(slug)
    if (!product) return { title: "Product Not Found" }
    return {
      title: product.name,
      description: product.description.slice(0, 160),
      openGraph: {
        title: `${product.name} | Kallitos Fashion`,
        description: product.description.slice(0, 160),
        images: product.images[0] ? [{ url: product.images[0], width: 600, height: 800, alt: product.name }] : [],
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: product.name,
        description: product.description.slice(0, 160),
        images: product.images[0] ? [product.images[0]] : [],
      },
    }
  } catch {
    return { title: "Product Not Found" }
  }
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  return <ProductDetailPage slug={slug} />
}
