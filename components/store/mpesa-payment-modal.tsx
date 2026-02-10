"use client"

import { useState } from "react"
import { X, CheckCircle, Loader2, Copy, Check, ChevronRight } from "lucide-react"
import { formatPrice } from "@/lib/format"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const TILL_NUMBER = "8 4 9 2 7 3 5"
const TILL_DIGITS = TILL_NUMBER.split(" ")
const BUSINESS_NAME = "KALLITTOS FASHION"

interface MpesaPaymentModalProps {
  isOpen: boolean
  onClose: () => void
  total: number
  onPaymentConfirmed: (mpesaCode: string, phone: string) => void
}

export function MpesaPaymentModal({ isOpen, onClose, total, onPaymentConfirmed }: MpesaPaymentModalProps) {
  const [step, setStep] = useState<"details" | "confirm">("details")
  const [mpesaCode, setMpesaCode] = useState("")
  const [mpesaPhone, setMpesaPhone] = useState("")
  const [copied, setCopied] = useState(false)
  const [isConfirming, setIsConfirming] = useState(false)

  if (!isOpen) return null

  const tillRaw = TILL_DIGITS.join("")

  const copyTill = () => {
    navigator.clipboard.writeText(tillRaw)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleConfirm = async () => {
    if (!mpesaCode.trim() || mpesaCode.trim().length < 8) return
    setIsConfirming(true)
    await new Promise((r) => setTimeout(r, 1000))
    onPaymentConfirmed(mpesaCode.trim().toUpperCase(), mpesaPhone.trim())
    setIsConfirming(false)
    // Reset for next use
    setStep("details")
    setMpesaCode("")
    setMpesaPhone("")
  }

  const handleClose = () => {
    setStep("details")
    setMpesaCode("")
    setMpesaPhone("")
    onClose()
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-foreground/60 backdrop-blur-sm" onClick={handleClose} />

      <div className="relative bg-background w-full max-w-md max-h-[90vh] overflow-y-auto rounded-sm shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        {/* Close button */}
        <button type="button" onClick={handleClose} className="absolute top-3 right-3 z-20 p-1.5 hover:bg-secondary rounded-sm transition-colors">
          <X className="h-5 w-5" />
        </button>

        {step === "details" && (
          <>
            {/* Lipa na M-Pesa Header -- Safaricom green */}
            <div className="bg-[#00843D] px-6 pt-8 pb-6 text-center relative overflow-hidden">
              {/* Subtle phone icon watermark */}
              <div className="absolute right-6 top-4 opacity-20">
                <svg width="48" height="72" viewBox="0 0 48 72" fill="white">
                  <rect x="6" y="0" width="36" height="72" rx="6" stroke="white" strokeWidth="2" fill="none" />
                  <rect x="14" y="6" width="20" height="48" rx="1" fill="white" opacity="0.3" />
                  <circle cx="24" cy="62" r="4" fill="white" opacity="0.4" />
                </svg>
              </div>

              <h2 className="text-white font-extrabold text-2xl tracking-tight">
                LIPA NA M
                <span className="relative inline-block mx-0.5">
                  <span className="text-white">-</span>
                </span>
                PESA
              </h2>

              {/* Red swoosh accent like the logo */}
              <div className="flex justify-center mt-1">
                <div className="w-16 h-1 bg-[#E4002B] rounded-full" />
              </div>
            </div>

            {/* Till Number Card */}
            <div className="px-6 pb-6">
              <div className="bg-background border-2 border-[#00843D]/20 rounded-sm -mt-3 relative z-10 shadow-lg">
                {/* Buy Goods label */}
                <div className="text-center pt-5 pb-3">
                  <p className="text-[#00843D] font-bold text-sm tracking-wider uppercase">
                    Buy Goods Till Number
                  </p>
                </div>

                {/* Digit boxes */}
                <div className="flex justify-center gap-1.5 px-4 pb-3">
                  {TILL_DIGITS.map((digit, i) => (
                    <div
                      key={i}
                      className="w-10 h-12 border-2 border-foreground/80 rounded-sm flex items-center justify-center"
                    >
                      <span className="text-[#00843D] text-xl font-extrabold">{digit}</span>
                    </div>
                  ))}
                </div>

                {/* Business name */}
                <div className="text-center pb-4">
                  <p className="text-foreground font-extrabold text-lg tracking-wide">{BUSINESS_NAME}</p>
                </div>

                {/* Copy button */}
                <div className="flex justify-center pb-4">
                  <button
                    type="button"
                    onClick={copyTill}
                    className="flex items-center gap-2 text-xs font-medium text-muted-foreground hover:text-foreground bg-secondary/60 hover:bg-secondary px-4 py-2 rounded-sm transition-colors"
                  >
                    {copied ? <Check className="h-3.5 w-3.5 text-[#00843D]" /> : <Copy className="h-3.5 w-3.5" />}
                    {copied ? "Copied!" : "Copy Till Number"}
                  </button>
                </div>

                {/* Safaricom M-PESA branding */}
                <div className="flex justify-end px-4 pb-3">
                  <div className="text-right">
                    <p className="text-[#00843D] text-xs font-bold leading-tight">Safaricom</p>
                    <p className="text-[10px] text-muted-foreground font-semibold tracking-wider">M-PESA</p>
                  </div>
                </div>
              </div>

              {/* Amount to pay */}
              <div className="mt-4 bg-[#00843D]/5 border border-[#00843D]/15 rounded-sm p-4 flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">Amount to Pay:</span>
                <span className="text-xl font-bold text-[#00843D]">{formatPrice(total)}</span>
              </div>

              {/* Instructions */}
              <div className="mt-5">
                <p className="text-sm font-semibold mb-3">How to Pay:</p>
                <ol className="space-y-2">
                  {[
                    "Go to M-PESA on your phone",
                    "Select Lipa na M-PESA",
                    "Select Buy Goods and Services",
                    `Enter Till Number: ${tillRaw}`,
                    `Enter Amount: ${formatPrice(total)}`,
                    "Enter your M-PESA PIN and confirm",
                  ].map((instruction, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm">
                      <span className="w-5 h-5 flex-shrink-0 rounded-full bg-[#00843D]/10 flex items-center justify-center text-[10px] font-bold text-[#00843D]">
                        {i + 1}
                      </span>
                      <span className="text-muted-foreground leading-relaxed">{instruction}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Proceed button */}
              <Button
                onClick={() => setStep("confirm")}
                className="w-full h-12 mt-5 bg-[#00843D] text-white hover:bg-[#006B32] text-sm font-semibold"
              >
                {"I've Sent the Payment"}
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </>
        )}

        {step === "confirm" && (
          <div className="p-6">
            <button type="button" onClick={() => setStep("details")} className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 mb-5">
              <ChevronRight className="h-3 w-3 rotate-180" /> Back
            </button>

            <div className="text-center py-2">
              <div className="w-16 h-16 mx-auto rounded-full bg-[#00843D]/10 flex items-center justify-center mb-3">
                <CheckCircle className="h-8 w-8 text-[#00843D]" />
              </div>
              <h3 className="text-lg font-serif font-bold">Confirm Your Payment</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Enter the M-PESA confirmation code from the SMS you received
              </p>
            </div>

            <div className="space-y-4 mt-5">
              <div>
                <Label className="text-sm font-medium mb-1.5 block">M-PESA Confirmation Code *</Label>
                <Input
                  value={mpesaCode}
                  onChange={(e) => setMpesaCode(e.target.value.toUpperCase())}
                  placeholder="e.g. SHK3A7B2C1"
                  className="h-12 text-center text-lg font-mono font-bold tracking-widest uppercase"
                  maxLength={12}
                />
                <p className="text-[11px] text-muted-foreground mt-1">
                  Find this code in the M-PESA confirmation SMS
                </p>
              </div>

              <div>
                <Label className="text-sm font-medium mb-1.5 block">Phone Number Used (optional)</Label>
                <Input
                  value={mpesaPhone}
                  onChange={(e) => setMpesaPhone(e.target.value)}
                  placeholder="e.g. 0712 345 678"
                  className="h-11"
                  type="tel"
                />
              </div>
            </div>

            <Button
              onClick={handleConfirm}
              disabled={!mpesaCode.trim() || mpesaCode.trim().length < 8 || isConfirming}
              className="w-full h-12 mt-5 bg-[#00843D] text-white hover:bg-[#006B32] text-sm font-semibold disabled:opacity-40"
            >
              {isConfirming ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Confirming...
                </>
              ) : (
                "Confirm Payment"
              )}
            </Button>

            <p className="text-[11px] text-muted-foreground text-center mt-4 leading-relaxed">
              Your order will be marked as paid via M-PESA and our team will verify the payment.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
