import { Suspense } from "react"
import { ShopPage } from "@/components/store/shop-page"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Shop All Denim",
  description:
    "Browse Kallittos Fashions\u2019 full collection of curated thrift & brand-new mom jeans, wide-leg denim, vintage jackets, dungarees & more. Filter by category, size, and price. Sustainable fashion delivered across Kenya.",
  keywords: [
    "Thrift denim jackets", "Mom jeans thrifted", "Wide-leg denim trends", "Oversized denim jackets",
    "Buy jeans online Kenya", "Online denim shop Kenya", "Affordable fashion Nairobi",
    "Premium thrift denim", "Denim dungarees", "Baggy jeans trend 2026",
  ],
  openGraph: {
    title: "Shop All Denim | Kallittos Fashions",
    description: "Curated thrift & brand-new denim. Mom jeans, vintage jackets, wide-leg denim & more. Style meets sustainability.",
  },
}

export default function Page() {
  return (
    <Suspense>
      <ShopPage />
    </Suspense>
  )
}
