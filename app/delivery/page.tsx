import { TopBar } from "@/components/store/top-bar"
import { Navbar } from "@/components/store/navbar"
import { Footer } from "@/components/store/footer"
import { DeliveryPage } from "@/components/store/delivery-page"

export const metadata = {
  title: "Delivery Locations - PreciousGems",
  description: "Check our delivery locations and shipping rates.",
}

export default function Page() {
  return <DeliveryPage />
}
