import { CheckoutPage } from "@/components/store/checkout-page"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Checkout",
  description: "Complete your Kallitos Fashion order. Pay on delivery or order via WhatsApp.",
  robots: { index: false, follow: false },
}

export default function Page() {
  return <CheckoutPage />
}
