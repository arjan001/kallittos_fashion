import { CollectionPage } from "@/components/store/collection-page"
import type { Metadata } from "next"
import { notFound } from "next/navigation"

const VALID_COLLECTIONS = ["men", "women", "babyshop"] as const

const META: Record<string, { title: string; description: string }> = {
  men: {
    title: "Shop Men's Denim Collection | Kallittos Fashions",
    description: "Shop rugged denim for the modern man. Slim fits, relaxed cuts, denim jackets & more. Curated thrift & brand-new pieces delivered across Kenya.",
  },
  women: {
    title: "Shop Women's Denim Collection | Kallittos Fashions",
    description: "Curated denim styles for every woman. Mom jeans, skinny jeans, wide-leg, denim skirts & jackets. Thrift finds & brand-new pieces delivered across Kenya.",
  },
  babyshop: {
    title: "Kali-ttos Little Wardrobe | Baby & Toddler Fashion | Kallittos Fashions",
    description: "Shop all baby clothing, shoes & accessories for ages 0-6. Rompers, onesies, tiny outfits & more at Kali-ttos Little Wardrobe. Follow @kalittos01 on TikTok. Delivered across Kenya.",
  },
}

export async function generateMetadata({ params }: { params: Promise<{ collection: string }> }): Promise<Metadata> {
  const { collection } = await params
  const meta = META[collection]
  if (!meta) return { title: "Collection Not Found" }
  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: `https://kallittofashions.com/shop/${collection}` },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `https://kallittofashions.com/shop/${collection}`,
      type: "website",
      siteName: "Kallittos Fashions",
      locale: "en_KE",
      images: [{ url: `https://kallittofashions.com/banners/${collection}-collection.jpg`, width: 1200, height: 630, alt: meta.title }],
    },
  }
}

export default async function Page({ params }: { params: Promise<{ collection: string }> }) {
  const { collection } = await params
  if (!VALID_COLLECTIONS.includes(collection as typeof VALID_COLLECTIONS[number])) {
    notFound()
  }
  return <CollectionPage collection={collection} />
}
