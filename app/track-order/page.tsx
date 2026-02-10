import type { Metadata } from "next"
import { TopBar } from "@/components/store/top-bar"
import { Navbar } from "@/components/store/navbar"
import { Footer } from "@/components/store/footer"
import { TrackOrderForm } from "@/components/store/track-order-form"

export const metadata: Metadata = {
  title: "Track My Order",
  description:
    "Track your Kallittos Fashions order in real time. Enter your order number or phone number to see the status of your delivery.",
}

export default function TrackOrderPage() {
  return (
    <>
      <TopBar />
      <Navbar />
      <main className="min-h-screen bg-background">
        <div className="mx-auto max-w-3xl px-4 py-12 lg:py-16">
          <div className="text-center mb-10">
            <h1 className="font-serif text-3xl lg:text-4xl font-bold text-balance">
              Track My Order
            </h1>
            <p className="text-muted-foreground mt-3 text-sm max-w-md mx-auto leading-relaxed">
              Enter your order number or the phone number you used when placing your order to check the status.
            </p>
          </div>
          <TrackOrderForm />
        </div>
      </main>
      <Footer />
    </>
  )
}
