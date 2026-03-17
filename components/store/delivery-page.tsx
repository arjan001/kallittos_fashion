"use client"

import { MapPin, Truck, Clock, Package, Zap, Navigation } from "lucide-react"
import { TopBar } from "./top-bar"
import { Navbar } from "./navbar"
import { Footer } from "./footer"
import type { DeliveryLocation } from "@/lib/types"
import useSWR from "swr"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

function formatPrice(price: number): string {
  return `KSh ${price.toLocaleString()}`
}

const BOLT_GREEN = "#34D186"

export function DeliveryPage() {
  const { data: deliveryLocations = [] } = useSWR<DeliveryLocation[]>("/api/delivery-locations", fetcher)

  const pickupMtaaniLocations = deliveryLocations.filter((loc) =>
    loc.name.toLowerCase().includes("pick up mtaani")
  )
  const standardLocations = deliveryLocations.filter(
    (loc) => !loc.name.toLowerCase().includes("pick up mtaani")
  )

  return (
    <div className="min-h-screen flex flex-col">
      <TopBar />
      <Navbar />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-8">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-serif font-bold text-center">Delivery & Collection</h1>
            <p className="text-sm text-muted-foreground text-center mt-2">
              We deliver across Kenya. Free shipping on orders above KSh 5,000.
            </p>

            {/* Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10">
              <div className="flex flex-col items-center text-center p-6 border border-border rounded-sm">
                <Truck className="h-6 w-6 mb-3" />
                <h3 className="text-sm font-semibold">Fast Delivery</h3>
                <p className="text-xs text-muted-foreground mt-1">Same day in Nairobi CBD</p>
              </div>
              <div className="flex flex-col items-center text-center p-6 border border-border rounded-sm">
                <Clock className="h-6 w-6 mb-3" />
                <h3 className="text-sm font-semibold">Dispatch Days</h3>
                <p className="text-xs text-muted-foreground mt-1">Every Tuesday & Friday</p>
              </div>
              <div className="flex flex-col items-center text-center p-6 border border-border rounded-sm">
                <Package className="h-6 w-6 mb-3" />
                <h3 className="text-sm font-semibold">Free Shipping</h3>
                <p className="text-xs text-muted-foreground mt-1">Orders above KSh 5,000</p>
              </div>
            </div>

            {/* Bolt Delivery Section */}
            <div className="mt-10 border border-border rounded-sm overflow-hidden">
              <div className="px-6 py-4 flex items-center gap-3" style={{ backgroundColor: "#2B2D33" }}>
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: BOLT_GREEN }}>
                  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none">
                    <path
                      d="M13 2L4.09 12.11C3.69 12.59 3.89 13.34 4.48 13.53L10.28 15.42L9.49 21.17C9.37 21.92 10.28 22.37 10.78 21.82L19.91 11.89C20.31 11.41 20.11 10.66 19.52 10.47L13.72 8.58L14.51 2.83C14.63 2.08 13.72 1.63 13.22 2.18L13 2Z"
                      fill="white"
                      stroke="white"
                      strokeWidth="0.5"
                    />
                  </svg>
                </div>
                <div>
                  <h2 className="text-sm font-bold text-white">Bolt Express Delivery</h2>
                  <p className="text-xs text-white/60">On-demand delivery powered by Bolt</p>
                </div>
              </div>
              <div className="px-6 py-5 space-y-4">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Get your order delivered directly to your doorstep by a Bolt driver. Simply select Bolt Delivery
                  at checkout, and a driver will pick up your order from our store and deliver it right to you.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex items-center gap-3 p-3 bg-secondary/50 rounded-md">
                    <Zap className="h-5 w-5 flex-shrink-0" style={{ color: BOLT_GREEN }} />
                    <div>
                      <p className="text-xs font-semibold">Fast Delivery</p>
                      <p className="text-[11px] text-muted-foreground">30-60 mins in Nairobi</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-secondary/50 rounded-md">
                    <MapPin className="h-5 w-5 flex-shrink-0" style={{ color: BOLT_GREEN }} />
                    <div>
                      <p className="text-xs font-semibold">Door-to-Door</p>
                      <p className="text-[11px] text-muted-foreground">Direct to your location</p>
                    </div>
                  </div>
                </div>
                <div className="text-xs text-muted-foreground">
                  <span className="font-medium">Pricing:</span> Starts from KSh 150 (CBD) up to KSh 700+ depending on distance.
                  Select Bolt Delivery at checkout for exact pricing.
                </div>
              </div>
            </div>

            {/* Pick Up Mtaani Section */}
            {pickupMtaaniLocations.length > 0 && (
              <div className="mt-10 border border-border rounded-sm overflow-hidden">
                <div className="bg-orange-500 text-white px-6 py-3 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold">PM</div>
                  <div>
                    <h2 className="text-sm font-semibold">Pick Up Mtaani Collection Points</h2>
                    <p className="text-xs text-white/70">Collect your order at a convenient location near you</p>
                  </div>
                </div>
                <div className="px-6 py-4">
                  <p className="text-sm text-muted-foreground mb-4">
                    Pick Up Mtaani is a network of collection points across Nairobi and surrounding areas.
                    Select a pickup point at checkout, and we will deliver your parcel there. You will receive
                    an SMS when it is ready for collection.
                  </p>
                  <div className="divide-y divide-border">
                    {pickupMtaaniLocations.map((loc) => (
                      <div key={loc.id} className="flex items-center justify-between py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-6 h-6 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center flex-shrink-0">
                            <Navigation className="h-3 w-3 text-orange-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">{loc.name.replace("Pick Up Mtaani - ", "")}</p>
                            <p className="text-xs text-muted-foreground mt-0.5">{loc.estimatedDays}</p>
                          </div>
                        </div>
                        <span className="text-sm font-semibold">{formatPrice(loc.fee)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Standard Delivery Locations Table */}
            <div className="mt-10 border border-border rounded-sm overflow-hidden">
              <div className="bg-foreground text-background px-6 py-3 flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <h2 className="text-sm font-semibold">Standard Delivery Rates</h2>
              </div>
              <div className="divide-y divide-border">
                {standardLocations.map((loc) => (
                  <div key={loc.id} className="flex items-center justify-between px-6 py-4">
                    <div>
                      <p className="text-sm font-medium">{loc.name}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{loc.estimatedDays}</p>
                    </div>
                    <span className="text-sm font-semibold">{formatPrice(loc.fee)}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 p-5 bg-secondary rounded-sm">
              <h3 className="text-sm font-semibold mb-2">Physical Shop</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Dynamic Mall, 2nd Floor, Room ML 96, Nairobi CBD.
                <br />
                Open Monday - Saturday, 9AM - 6PM.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
