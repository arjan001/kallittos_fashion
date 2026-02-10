import type { Metadata } from "next"
import { WishlistPage } from "@/components/store/wishlist-page"

export const metadata: Metadata = {
  title: "Wishlist",
  description: "Your saved denim favourites at Kallittos Fashions. Curate your perfect thrift & new denim collection and shop when you are ready.",
  robots: { index: false, follow: true },
}

export default function Page() {
  return <WishlistPage />
}
