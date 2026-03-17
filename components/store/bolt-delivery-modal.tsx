"use client"

import { useState } from "react"
import { X, MapPin, Clock, CheckCircle, Loader2, Phone, Navigation } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { formatPrice } from "@/lib/format"

interface BoltDeliveryModalProps {
  isOpen: boolean
  onClose: () => void
  total: number
  customerPhone: string
  customerAddress: string
  onBoltRequested: (boltDetails: {
    pickupAddress: string
    dropoffAddress: string
    contactPhone: string
    estimatedFee: number
    notes: string
  }) => void
}

const BOLT_GREEN = "#34D186"
const BOLT_DARK = "#2B2D33"

// Bolt delivery fee tiers based on distance (Nairobi)
const BOLT_FEE_TIERS = [
  { label: "Within CBD (0-3 km)", fee: 150, range: "cbd" },
  { label: "Near CBD (3-7 km)", fee: 250, range: "near" },
  { label: "Mid-range (7-15 km)", fee: 350, range: "mid" },
  { label: "Far (15-25 km)", fee: 500, range: "far" },
  { label: "Very Far (25+ km)", fee: 700, range: "very-far" },
]

export function BoltDeliveryModal({
  isOpen,
  onClose,
  total,
  customerPhone,
  customerAddress,
  onBoltRequested,
}: BoltDeliveryModalProps) {
  const [step, setStep] = useState<"details" | "confirm" | "success">("details")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedTier, setSelectedTier] = useState("")
  const [dropoffAddress, setDropoffAddress] = useState(customerAddress)
  const [contactPhone, setContactPhone] = useState(customerPhone)
  const [deliveryNotes, setDeliveryNotes] = useState("")

  const selectedFee = BOLT_FEE_TIERS.find((t) => t.range === selectedTier)

  const pickupAddress = "Dynamic Mall, 2nd Floor Room ML 96, Nairobi CBD"

  const handleConfirm = async () => {
    if (!selectedFee || !dropoffAddress || !contactPhone) return
    setIsSubmitting(true)

    // Simulate Bolt API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    onBoltRequested({
      pickupAddress,
      dropoffAddress,
      contactPhone,
      estimatedFee: selectedFee.fee,
      notes: deliveryNotes,
    })

    setStep("success")
    setIsSubmitting(false)
  }

  const handleClose = () => {
    setStep("details")
    setSelectedTier("")
    setDeliveryNotes("")
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={handleClose} />

      <div className="relative w-full max-w-md bg-background rounded-lg shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
        {/* Header with Bolt branding */}
        <div className="relative px-6 py-5" style={{ backgroundColor: BOLT_DARK }}>
          <button
            onClick={handleClose}
            className="absolute right-4 top-4 text-white/60 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="flex items-center gap-3">
            {/* Bolt Logo */}
            <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: BOLT_GREEN }}>
              <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none">
                <path
                  d="M13 2L4.09 12.11C3.69 12.59 3.89 13.34 4.48 13.53L10.28 15.42L9.49 21.17C9.37 21.92 10.28 22.37 10.78 21.82L19.91 11.89C20.31 11.41 20.11 10.66 19.52 10.47L13.72 8.58L14.51 2.83C14.63 2.08 13.72 1.63 13.22 2.18L13 2Z"
                  fill="white"
                  stroke="white"
                  strokeWidth="0.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div>
              <h2 className="text-white text-lg font-bold">Bolt Delivery</h2>
              <p className="text-white/60 text-xs">Fast delivery powered by Bolt</p>
            </div>
          </div>
        </div>

        {step === "details" && (
          <div className="p-6 space-y-5">
            {/* Pickup Location (fixed) */}
            <div>
              <Label className="text-sm font-medium mb-1.5 block">Pickup Location</Label>
              <div className="flex items-start gap-3 p-3 bg-secondary/50 rounded-md border border-border">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ backgroundColor: `${BOLT_GREEN}20` }}
                >
                  <Navigation className="h-4 w-4" style={{ color: BOLT_GREEN }} />
                </div>
                <div>
                  <p className="text-sm font-medium">Kallittos Fashions Store</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{pickupAddress}</p>
                </div>
              </div>
            </div>

            {/* Dropoff Address */}
            <div>
              <Label htmlFor="bolt-dropoff" className="text-sm font-medium mb-1.5 block">
                Delivery Address *
              </Label>
              <Textarea
                id="bolt-dropoff"
                value={dropoffAddress}
                onChange={(e) => setDropoffAddress(e.target.value)}
                placeholder="Enter your full delivery address..."
                rows={2}
                className="resize-none"
              />
            </div>

            {/* Contact Phone */}
            <div>
              <Label htmlFor="bolt-phone" className="text-sm font-medium mb-1.5 block">
                Contact Phone *
              </Label>
              <Input
                id="bolt-phone"
                type="tel"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                placeholder="0712 345 678"
                className="h-11"
              />
            </div>

            {/* Distance / Fee Selection */}
            <div>
              <Label className="text-sm font-medium mb-2 block">Estimated Distance *</Label>
              <div className="space-y-2">
                {BOLT_FEE_TIERS.map((tier) => (
                  <button
                    key={tier.range}
                    type="button"
                    onClick={() => setSelectedTier(tier.range)}
                    className={`w-full flex items-center justify-between p-3 rounded-md border transition-all text-left ${
                      selectedTier === tier.range
                        ? "border-2 bg-secondary/50"
                        : "border-border hover:border-foreground/30 hover:bg-secondary/30"
                    }`}
                    style={
                      selectedTier === tier.range
                        ? { borderColor: BOLT_GREEN }
                        : {}
                    }
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                          selectedTier === tier.range ? "" : "border-muted-foreground/30"
                        }`}
                        style={
                          selectedTier === tier.range
                            ? { borderColor: BOLT_GREEN }
                            : {}
                        }
                      >
                        {selectedTier === tier.range && (
                          <div
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: BOLT_GREEN }}
                          />
                        )}
                      </div>
                      <div>
                        <span className="text-sm font-medium">{tier.label}</span>
                      </div>
                    </div>
                    <span className="text-sm font-bold">{formatPrice(tier.fee)}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Delivery Notes */}
            <div>
              <Label htmlFor="bolt-notes" className="text-sm font-medium mb-1.5 block">
                Delivery Notes (optional)
              </Label>
              <Textarea
                id="bolt-notes"
                value={deliveryNotes}
                onChange={(e) => setDeliveryNotes(e.target.value)}
                placeholder="Gate code, landmarks, building entrance..."
                rows={2}
                className="resize-none"
              />
            </div>

            {/* Fee Summary */}
            {selectedFee && (
              <div className="p-4 rounded-md" style={{ backgroundColor: `${BOLT_GREEN}10` }}>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Order Total</span>
                  <span className="font-medium">{formatPrice(total)}</span>
                </div>
                <div className="flex items-center justify-between text-sm mt-1">
                  <span className="text-muted-foreground">Bolt Delivery Fee</span>
                  <span className="font-medium">{formatPrice(selectedFee.fee)}</span>
                </div>
                <div className="flex items-center justify-between text-sm font-bold mt-2 pt-2 border-t border-border">
                  <span>Grand Total</span>
                  <span>{formatPrice(total + selectedFee.fee)}</span>
                </div>
              </div>
            )}

            {/* Info */}
            <div className="flex items-start gap-2 text-xs text-muted-foreground">
              <Clock className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" />
              <p>
                A Bolt driver will pick up your order from our store and deliver it directly to your address.
                Estimated delivery time: 30-60 minutes within Nairobi.
              </p>
            </div>

            <Button
              onClick={() => setStep("confirm")}
              disabled={!selectedFee || !dropoffAddress || !contactPhone}
              className="w-full h-12 text-sm font-semibold text-white disabled:opacity-40"
              style={{ backgroundColor: BOLT_GREEN }}
            >
              <MapPin className="h-4 w-4 mr-2" />
              Request Bolt Delivery — {selectedFee ? formatPrice(selectedFee.fee) : "Select distance"}
            </Button>
          </div>
        )}

        {step === "confirm" && (
          <div className="p-6 space-y-5">
            <h3 className="text-lg font-semibold">Confirm Bolt Delivery</h3>

            <div className="space-y-3">
              {/* Route visualization */}
              <div className="relative">
                <div className="flex items-start gap-3 p-3 bg-secondary/50 rounded-md">
                  <div className="flex flex-col items-center gap-1">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: BOLT_GREEN }}
                    />
                    <div className="w-0.5 h-8 bg-border" />
                    <div className="w-3 h-3 rounded-full bg-foreground" />
                  </div>
                  <div className="flex-1 space-y-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Pickup</p>
                      <p className="text-sm font-medium">{pickupAddress}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Dropoff</p>
                      <p className="text-sm font-medium">{dropoffAddress}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-secondary/50 rounded-md">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Contact</p>
                  <p className="text-sm font-medium">{contactPhone}</p>
                </div>
              </div>

              {selectedFee && (
                <div className="p-4 rounded-md border-2" style={{ borderColor: BOLT_GREEN }}>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Bolt Delivery Fee</span>
                    <span className="text-lg font-bold">{formatPrice(selectedFee.fee)}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{selectedFee.label}</p>
                </div>
              )}

              {deliveryNotes && (
                <div className="p-3 bg-secondary/50 rounded-md">
                  <p className="text-xs text-muted-foreground">Notes</p>
                  <p className="text-sm">{deliveryNotes}</p>
                </div>
              )}
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setStep("details")}
                className="flex-1 h-11 bg-transparent"
              >
                Back
              </Button>
              <Button
                onClick={handleConfirm}
                disabled={isSubmitting}
                className="flex-1 h-11 text-white font-semibold"
                style={{ backgroundColor: BOLT_GREEN }}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Requesting...
                  </>
                ) : (
                  <>
                    <svg viewBox="0 0 24 24" className="w-4 h-4 mr-2" fill="none">
                      <path
                        d="M13 2L4.09 12.11C3.69 12.59 3.89 13.34 4.48 13.53L10.28 15.42L9.49 21.17C9.37 21.92 10.28 22.37 10.78 21.82L19.91 11.89C20.31 11.41 20.11 10.66 19.52 10.47L13.72 8.58L14.51 2.83C14.63 2.08 13.72 1.63 13.22 2.18L13 2Z"
                        fill="white"
                        stroke="white"
                        strokeWidth="0.5"
                      />
                    </svg>
                    Confirm Delivery
                  </>
                )}
              </Button>
            </div>
          </div>
        )}

        {step === "success" && (
          <div className="p-6 text-center space-y-4">
            <div className="relative w-20 h-20 mx-auto">
              <div
                className="absolute inset-0 rounded-full animate-ping"
                style={{ backgroundColor: `${BOLT_GREEN}15`, animationDuration: "2s" }}
              />
              <div
                className="relative w-20 h-20 rounded-full flex items-center justify-center"
                style={{ backgroundColor: `${BOLT_GREEN}15` }}
              >
                <CheckCircle className="h-10 w-10" style={{ color: BOLT_GREEN }} />
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold">Bolt Delivery Requested!</h3>
              <p className="text-sm text-muted-foreground mt-2">
                Your order will be picked up from our store and delivered to your address via Bolt.
                You will receive a confirmation on your phone.
              </p>
            </div>

            {selectedFee && (
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium" style={{ backgroundColor: `${BOLT_GREEN}15`, color: BOLT_GREEN }}>
                <Clock className="h-4 w-4" />
                Est. delivery: 30-60 mins
              </div>
            )}

            <Button
              onClick={handleClose}
              className="w-full h-11 text-white font-semibold"
              style={{ backgroundColor: BOLT_GREEN }}
            >
              Done
            </Button>
          </div>
        )}

        {/* Bolt branding footer */}
        <div className="px-6 py-3 border-t border-border flex items-center justify-center gap-2">
          <span className="text-[10px] text-muted-foreground">Powered by</span>
          <div className="flex items-center gap-1">
            <div
              className="w-4 h-4 rounded flex items-center justify-center"
              style={{ backgroundColor: BOLT_GREEN }}
            >
              <svg viewBox="0 0 24 24" className="w-2.5 h-2.5" fill="none">
                <path
                  d="M13 2L4.09 12.11C3.69 12.59 3.89 13.34 4.48 13.53L10.28 15.42L9.49 21.17C9.37 21.92 10.28 22.37 10.78 21.82L19.91 11.89C20.31 11.41 20.11 10.66 19.52 10.47L13.72 8.58L14.51 2.83C14.63 2.08 13.72 1.63 13.22 2.18L13 2Z"
                  fill="white"
                />
              </svg>
            </div>
            <span className="text-xs font-bold" style={{ color: BOLT_DARK }}>Bolt</span>
          </div>
        </div>
      </div>
    </div>
  )
}
