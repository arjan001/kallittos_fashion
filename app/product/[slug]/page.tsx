import { ProductDetailPage } from "@/components/store/product-detail-page"
import { products } from "@/lib/data"

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = products.find((p) => p.slug === slug)
  return {
    title: product ? `${product.name} - PreciousGems` : "Product Not Found",
    description: product?.description || "",
  }
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  return <ProductDetailPage slug={slug} />
}
