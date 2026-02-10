import { DeliveryPage } from "@/components/store/delivery-page"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Delivery Locations & Rates",
  description:
    "Check Kallitos Fashion delivery locations and shipping rates across Kenya. Free shipping on orders above KSh 5,000. Same-day delivery available in Nairobi.",
  openGraph: {
    title: "Delivery Locations & Rates | Kallitos Fashion",
    description: "Free shipping on orders above KSh 5,000. Same-day delivery in Nairobi.",
  },
}

export default function Page() {
  return <DeliveryPage />
}
