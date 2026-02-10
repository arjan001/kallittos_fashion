import { ShopPage } from "@/components/store/shop-page"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Shop All Denim",
  description:
    "Browse our full collection of thrift and brand-new jeans, denim jackets, dungarees, shorts and more. Filter by category, size, and price. Delivered across Kenya.",
  openGraph: {
    title: "Shop All Denim | Kallitos Fashion",
    description: "Browse curated thrift and new denim pieces. Jeans, jackets, dungarees and more.",
  },
}

export default function Page() {
  return <ShopPage />
}
