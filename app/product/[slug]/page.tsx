import { ProductDetailPage } from "@/components/store/product-detail-page"
import { getProductBySlug } from "@/lib/supabase-data"
import type { Metadata } from "next"

export const dynamic = "force-dynamic"

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  try {
    const product = await getProductBySlug(slug)
    if (!product) return { title: "Product Not Found | Kallittos Fashions" }
    const desc = product.description.slice(0, 155) + (product.description.length > 155 ? "..." : "")
    return {
      title: `${product.name} | Kallittos Fashions`,
      description: `${desc} | Shop curated thrift & new denim at Kallittos Fashions.`,
      keywords: [
        product.name, "Kallittos Fashions", "thrift denim Kenya",
        "curated denim", "sustainable fashion", "buy jeans online Kenya",
      ],
      openGraph: {
        title: `${product.name} | Kallittos Fashions`,
        description: `${desc} Style meets sustainability.`,
        images: product.images[0] ? [{ url: product.images[0], width: 600, height: 800, alt: `${product.name} - Kallittos Fashions` }] : [],
        type: "website",
        siteName: "Kallittos Fashions",
      },
      twitter: {
        card: "summary_large_image",
        title: `${product.name} | Kallittos Fashions`,
        description: desc,
        images: product.images[0] ? [product.images[0]] : [],
        creator: "@kallittos",
      },
    }
  } catch {
    return { title: "Product Not Found | Kallittos Fashions" }
  }
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  return <ProductDetailPage slug={slug} />
}
