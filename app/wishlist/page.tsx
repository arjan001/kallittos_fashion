import type { Metadata } from "next"
import { WishlistPage } from "@/components/store/wishlist-page"

export const metadata: Metadata = {
  title: "Wishlist",
  description: "Your saved items at Kallitos Fashion. Add your favorite pieces and shop when ready.",
}

export default function Page() {
  return <WishlistPage />
}
