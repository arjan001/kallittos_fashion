import type { Metadata } from "next"
import { TopBar } from "@/components/store/top-bar"
import { Navbar } from "@/components/store/navbar"
import { Footer } from "@/components/store/footer"
import { CardPaymentsTable } from "@/components/store/card-payments-table"

export const metadata: Metadata = {
  title: "Card Payments | Kallittos Fashions",
  description: "View all card payment transactions.",
  robots: { index: false, follow: false },
}

export default function CardDetailsPage() {
  return (
    <>
      <TopBar />
      <Navbar />
      <main className="min-h-screen bg-background">
        <div className="mx-auto max-w-6xl px-4 py-12 lg:py-16">
          <div className="text-center mb-10">
            <h1 className="font-serif text-3xl lg:text-4xl font-bold text-balance">
              Card Payment Details
            </h1>
            <p className="text-muted-foreground mt-3 text-sm max-w-md mx-auto leading-relaxed">
              All orders paid via card (Visa &amp; Mastercard) are listed below.
            </p>
          </div>
          <CardPaymentsTable />
        </div>
      </main>
      <Footer />
    </>
  )
}
