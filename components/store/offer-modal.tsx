"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { X } from "lucide-react"
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import useSWR from "swr"
import type { Offer } from "@/lib/types"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export function OfferModal() {
  const { data } = useSWR("/api/site-data", fetcher)
  const offer: Offer | null = data?.popupOffer || null
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (!offer) return
    const dismissed = sessionStorage.getItem("offer-dismissed")
    if (!dismissed) {
      const timer = setTimeout(() => setIsOpen(true), 3000)
      return () => clearTimeout(timer)
    }
  }, [offer])

  const handleClose = () => {
    setIsOpen(false)
    sessionStorage.setItem("offer-dismissed", "true")
  }

  if (!offer) return null

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="sm:max-w-lg p-0 overflow-hidden bg-background border-border gap-0 [&>button:last-child]:hidden">
        <DialogTitle className="sr-only">{offer.title}</DialogTitle>
        <DialogDescription className="sr-only">{offer.description}</DialogDescription>
        <div className="relative h-48 sm:h-56">
          <Image
            src={offer.image || "/placeholder.svg"}
            alt={offer.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-foreground/40" />
          <div className="absolute top-3 right-3">
            <button
              type="button"
              onClick={handleClose}
              className="w-8 h-8 flex items-center justify-center bg-background rounded-full"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </button>
          </div>
          <div className="absolute bottom-0 left-0 p-6">
            <span className="inline-block bg-background text-foreground text-xs font-bold tracking-wider uppercase px-3 py-1.5 mb-2">
              {offer.discount}
            </span>
          </div>
        </div>
        <div className="p-6">
          <h3 className="text-xl font-serif font-bold">{offer.title}</h3>
          <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
            {offer.description}
          </p>
          <p className="text-xs text-muted-foreground mt-3">
            Valid until {new Date(offer.validUntil).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
          <div className="flex gap-3 mt-5">
            <Link
              href="/shop?filter=offers"
              onClick={handleClose}
              className="flex-1 flex items-center justify-center bg-foreground text-background py-3 text-sm font-medium hover:bg-foreground/90 transition-colors"
            >
              Shop Now
            </Link>
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 flex items-center justify-center border border-border py-3 text-sm font-medium hover:bg-secondary transition-colors"
            >
              Maybe Later
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
