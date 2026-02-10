"use client"

import React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import { X } from "lucide-react"
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import useSWR from "swr"
import type { Offer } from "@/lib/types"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export function OfferModal() {
  const { data } = useSWR("/api/site-data", fetcher)
  const offer: Offer | null = data?.popupOffer || null
  const [isOpen, setIsOpen] = useState(false)
  const [email, setEmail] = useState("")
  const [dontShow, setDontShow] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    if (!offer) return
    const dismissed = localStorage.getItem("offer-dismissed-permanent")
    const sessionDismissed = sessionStorage.getItem("offer-dismissed")
    if (dismissed || sessionDismissed) return
    const timer = setTimeout(() => setIsOpen(true), 3000)
    return () => clearTimeout(timer)
  }, [offer])

  const handleClose = () => {
    setIsOpen(false)
    if (dontShow) {
      localStorage.setItem("offer-dismissed-permanent", "true")
    } else {
      sessionStorage.setItem("offer-dismissed", "true")
    }
  }

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    try {
      await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })
    } catch {
      // Continue even if API fails
    }
    setSubmitted(true)
    setTimeout(() => {
      handleClose()
    }, 2000)
  }

  if (!offer) return null

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="sm:max-w-[720px] p-0 overflow-hidden bg-background border-border gap-0 [&>button:last-child]:hidden">
        <DialogTitle className="sr-only">{offer.title}</DialogTitle>
        <DialogDescription className="sr-only">{offer.description}</DialogDescription>

        <div className="flex flex-col sm:flex-row">
          {/* Left - Image */}
          <div className="relative w-full sm:w-[320px] h-56 sm:h-auto sm:min-h-[420px] flex-shrink-0">
            <Image
              src={offer.image || "/placeholder.svg"}
              alt={offer.title}
              fill
              className="object-cover"
            />
          </div>

          {/* Right - Content */}
          <div className="flex-1 relative p-6 sm:p-8 flex flex-col justify-center">
            {/* Close button */}
            <button
              type="button"
              onClick={handleClose}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-secondary transition-colors"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </button>

            {submitted ? (
              <div className="text-center py-8">
                <div className="w-12 h-12 rounded-full bg-foreground text-background flex items-center justify-center mx-auto mb-4">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-serif font-bold">Thank You!</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  Check your inbox for your discount code.
                </p>
              </div>
            ) : (
              <>
                <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-1">
                  {offer.discount}
                </p>
                <h3 className="text-2xl font-serif font-bold leading-tight">
                  {offer.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                  {offer.description}
                </p>

                <form onSubmit={handleSubscribe} className="mt-6 space-y-3">
                  <div>
                    <label htmlFor="offer-email" className="text-sm font-medium mb-1.5 block">
                      Email Address <span className="text-destructive">*</span>
                    </label>
                    <input
                      id="offer-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter Your Email"
                      className="w-full h-11 px-4 border border-border rounded-sm bg-background text-foreground text-sm outline-none focus:border-foreground transition-colors placeholder:text-muted-foreground"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full h-11 bg-foreground text-background text-sm font-semibold rounded-sm hover:bg-foreground/90 transition-colors"
                  >
                    Subscribe
                  </button>
                </form>

                <label className="flex items-center gap-2.5 mt-5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={dontShow}
                    onChange={(e) => setDontShow(e.target.checked)}
                    className="w-4 h-4 rounded border-border accent-foreground"
                  />
                  <span className="text-sm text-muted-foreground">
                    {"Don't show this popup again"}
                  </span>
                </label>

                <p className="text-[10px] text-muted-foreground mt-4">
                  Valid until{" "}
                  {new Date(offer.validUntil).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
