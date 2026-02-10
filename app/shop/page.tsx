import { Suspense } from "react"
import { ShopPage } from "@/components/store/shop-page"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Shop Thrift Jeans & Denim | Kallittos Fashions Kenya",
  description:
    "Browse Kallittos Fashions full collection of curated thrift & brand-new mom jeans, skinny jeans, boyfriend jeans, denim shorts, wide-leg denim & more. Best denim designs in Kenya. Filter by category, size, and price. Delivered across Nairobi & Kenya.",
  keywords: [
    "kallittosfashions shop", "buy thrift jeans online Kenya", "shop denim Nairobi",
    "mom jeans Kenya", "skinny jeans Nairobi", "boyfriend jeans Kenya", "ripped jeans Kenya",
    "denim shorts Kenya", "best jeans Kenya", "affordable jeans Nairobi",
    "mtumba jeans online", "thrift denim collection", "premium thrift jeans",
    "women jeans Kenya", "plus size jeans Nairobi", "Kenya denim online shop",
  ],
  openGraph: {
    title: "Shop Thrift Jeans & Denim | Kallittos Fashions Kenya",
    description: "Best curated thrift & new denim in Kenya. Mom jeans, skinny, boyfriend, shorts & more. Delivered across Nairobi & Kenya.",
  },
}

export default function Page() {
  return (
    <Suspense>
      <ShopPage />
    </Suspense>
  )
}
