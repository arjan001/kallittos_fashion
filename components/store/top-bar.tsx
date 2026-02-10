"use client"

import { runningOffers } from "@/lib/data"

export function TopBar() {
  const doubled = [...runningOffers, ...runningOffers]

  return (
    <div className="bg-foreground text-background overflow-hidden">
      <div className="animate-marquee flex whitespace-nowrap py-2">
        {doubled.map((offer, i) => (
          <span key={i} className="mx-8 text-xs tracking-widest uppercase">
            {offer}
          </span>
        ))}
      </div>
    </div>
  )
}
