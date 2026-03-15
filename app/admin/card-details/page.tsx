import { AdminCardDetails } from "@/components/admin/card-details"

export const metadata = {
  title: "Card Payments | Kallittos Fashions",
  description: "View all card payment transactions.",
  robots: { index: false, follow: false },
}

export default function Page() {
  return <AdminCardDetails />
}
