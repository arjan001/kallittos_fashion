"use client"

import { useState } from "react"
import { X, Loader2, CreditCard, Lock, CheckCircle } from "lucide-react"
import { formatPrice } from "@/lib/format"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface CardPaymentModalProps {
  isOpen: boolean
  onClose: () => void
  total: number
  onPaymentConfirmed: (cardDetails: {
    cardNumber: string
    expiryMonth: string
    expiryYear: string
    cvv: string
    cardHolder: string
  }) => void
}

type PaymentStep = "form" | "processing" | "approved"

function VisaLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 780 500" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="780" height="500" rx="40" fill="#1A1F71" />
      <path d="M293.2 348.7l33.4-195.7h53.4l-33.4 195.7H293.2z" fill="#fff" />
      <path d="M543.6 157.2c-10.6-4-27.1-8.3-47.8-8.3-52.7 0-89.8 26.6-90.1 64.7-.3 28.2 26.5 43.9 46.7 53.3 20.8 9.6 27.8 15.7 27.7 24.3-.1 13.1-16.6 19.1-31.9 19.1-21.4 0-32.7-3-50.2-10.2l-6.9-3.1-7.5 44c12.5 5.5 35.5 10.2 59.4 10.5 56 0 92.4-26.3 92.8-67 .2-22.3-14-39.3-44.7-53.3-18.6-9.1-30-15.1-29.9-24.3 0-8.1 9.6-16.8 30.5-16.8 17.4-.3 30 3.5 39.8 7.5l4.8 2.3 7.3-42.7z" fill="#fff" />
      <path d="M632.2 153h-41.2c-12.8 0-22.3 3.5-27.9 16.2l-79.2 179.5h56l11.2-29.4h68.4l6.5 29.4h49.4L632.2 153zm-65.9 126.4c4.4-11.3 21.5-54.8 21.5-54.8-.3.5 4.4-11.5 7.1-18.9l3.6 17.1s10.3 47.3 12.5 57.6h-44.7z" fill="#fff" />
      <path d="M247.1 153l-52.2 133.5-5.6-27c-9.7-31.2-39.9-65.1-73.7-82l47.7 171.1h56.4l83.8-195.7h-56.4z" fill="#fff" />
      <path d="M146.9 153H59.4l-.7 3.8c66.9 16.2 111.2 55.4 129.5 102.5l-18.7-90c-3.2-12.3-12.7-15.9-22.6-16.3z" fill="#F7B600" />
    </svg>
  )
}

function MastercardLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 780 500" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="780" height="500" rx="40" fill="#252525" />
      <circle cx="330" cy="250" r="140" fill="#EB001B" />
      <circle cx="450" cy="250" r="140" fill="#F79E1B" />
      <path d="M390 148.7c33.3 27.3 54.6 68.8 54.6 115.3s-21.3 88-54.6 115.3c-33.3-27.3-54.6-68.8-54.6-115.3s21.3-88 54.6-115.3z" fill="#FF5F00" />
    </svg>
  )
}

function formatCardNumber(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 16)
  return digits.replace(/(\d{4})(?=\d)/g, "$1 ")
}

function detectCardType(number: string): "visa" | "mastercard" | null {
  const digits = number.replace(/\D/g, "")
  if (digits.startsWith("4")) return "visa"
  if (/^5[1-5]/.test(digits) || /^2[2-7]/.test(digits)) return "mastercard"
  return null
}

const currentYear = new Date().getFullYear()
const years = Array.from({ length: 12 }, (_, i) => (currentYear + i).toString())
const months = Array.from({ length: 12 }, (_, i) => {
  const m = (i + 1).toString().padStart(2, "0")
  return m
})

export function CardPaymentModal({ isOpen, onClose, total, onPaymentConfirmed }: CardPaymentModalProps) {
  const [cardNumber, setCardNumber] = useState("")
  const [cardHolder, setCardHolder] = useState("")
  const [expiryMonth, setExpiryMonth] = useState("")
  const [expiryYear, setExpiryYear] = useState("")
  const [cvv, setCvv] = useState("")
  const [step, setStep] = useState<PaymentStep>("form")
  const [errors, setErrors] = useState<Record<string, string>>({})

  if (!isOpen) return null

  const cardType = detectCardType(cardNumber)
  const rawDigits = cardNumber.replace(/\D/g, "")
  const isCardValid = rawDigits.length >= 13 && rawDigits.length <= 16
  const isCvvValid = cvv.length >= 3 && cvv.length <= 4
  const canSubmit = isCardValid && isCvvValid && expiryMonth && expiryYear && cardHolder.trim().length >= 2

  const validate = () => {
    const errs: Record<string, string> = {}
    if (!isCardValid) errs.cardNumber = "Enter a valid card number"
    if (!cardHolder.trim()) errs.cardHolder = "Name is required"
    if (!expiryMonth || !expiryYear) errs.expiry = "Select expiry date"
    if (!isCvvValid) errs.cvv = "Enter valid CVV"
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = async () => {
    if (!validate()) return

    // Step 1: Processing
    setStep("processing")

    // Simulate payment processing delay
    await new Promise((r) => setTimeout(r, 2500))

    // Step 2: Approved
    setStep("approved")

    // Wait a moment then submit
    await new Promise((r) => setTimeout(r, 1500))

    onPaymentConfirmed({
      cardNumber: rawDigits,
      expiryMonth,
      expiryYear,
      cvv,
      cardHolder: cardHolder.trim(),
    })

    // Reset state
    resetForm()
  }

  const resetForm = () => {
    setCardNumber("")
    setCardHolder("")
    setExpiryMonth("")
    setExpiryYear("")
    setCvv("")
    setStep("form")
    setErrors({})
  }

  const handleClose = () => {
    if (step === "processing") return // Don't allow close during processing
    resetForm()
    onClose()
  }

  // Processing / Approved screens
  if (step === "processing" || step === "approved") {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-foreground/60 backdrop-blur-sm" />
        <div className="relative bg-background w-full max-w-sm rounded-sm shadow-2xl animate-in fade-in zoom-in-95 duration-200 overflow-hidden">
          {/* Header stripe */}
          <div className="h-2 bg-gradient-to-r from-[#1A1F71] via-[#FF5F00] to-[#F79E1B]" />

          <div className="px-8 py-12 text-center">
            {step === "processing" && (
              <>
                <div className="relative w-20 h-20 mx-auto mb-6">
                  <div className="absolute inset-0 rounded-full border-4 border-secondary" />
                  <div className="absolute inset-0 rounded-full border-4 border-t-[#1A1F71] animate-spin" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <CreditCard className="h-8 w-8 text-[#1A1F71]" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold">Processing Payment</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  Verifying your card details...
                </p>
                <div className="mt-4 flex justify-center gap-1">
                  <div className="w-2 h-2 bg-[#1A1F71] rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <div className="w-2 h-2 bg-[#1A1F71] rounded-full animate-bounce" style={{ animationDelay: "200ms" }} />
                  <div className="w-2 h-2 bg-[#1A1F71] rounded-full animate-bounce" style={{ animationDelay: "400ms" }} />
                </div>
                <p className="text-xs text-muted-foreground mt-6">
                  Please do not close this window
                </p>
              </>
            )}

            {step === "approved" && (
              <>
                <div className="relative w-20 h-20 mx-auto mb-6">
                  <div className="absolute inset-0 rounded-full bg-[#00843D]/10 animate-ping" style={{ animationDuration: "2s" }} />
                  <div className="relative w-20 h-20 rounded-full bg-[#00843D]/10 flex items-center justify-center">
                    <CheckCircle className="h-10 w-10 text-[#00843D]" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-[#00843D]">Payment Approved</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  {formatPrice(total)} charged successfully
                </p>
                <p className="text-xs text-muted-foreground mt-4">
                  Redirecting to order confirmation...
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-foreground/60 backdrop-blur-sm" onClick={handleClose} />

      <div className="relative bg-background w-full max-w-md max-h-[90vh] overflow-y-auto rounded-sm shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        {/* Close button */}
        <button type="button" onClick={handleClose} className="absolute top-3 right-3 z-20 p-1.5 hover:bg-secondary rounded-sm transition-colors">
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="bg-gradient-to-r from-[#1A1F71] to-[#2D348B] px-6 pt-8 pb-6 text-center relative overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute -right-4 -top-4 w-32 h-32 rounded-full border-2 border-white" />
            <div className="absolute -left-8 -bottom-8 w-40 h-40 rounded-full border-2 border-white" />
          </div>

          <div className="relative z-10">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Lock className="h-4 w-4 text-white/80" />
              <span className="text-white/80 text-xs font-medium tracking-wider uppercase">Secure Payment</span>
            </div>
            <h2 className="text-white font-extrabold text-2xl tracking-tight">
              Card Payment
            </h2>
            <div className="flex justify-center items-center gap-3 mt-4">
              <VisaLogo className="h-8 w-auto rounded-[3px]" />
              <MastercardLogo className="h-8 w-auto rounded-[3px]" />
            </div>
          </div>
        </div>

        <div className="px-6 pb-6">
          {/* Amount display */}
          <div className="mt-4 bg-[#1A1F71]/5 border border-[#1A1F71]/15 rounded-sm p-4 flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">Amount to Pay:</span>
            <span className="text-xl font-bold text-[#1A1F71]">{formatPrice(total)}</span>
          </div>

          {/* Card form */}
          <div className="mt-5 space-y-4">
            {/* Card Number */}
            <div>
              <Label className="text-sm font-medium mb-1.5 block">Card Number *</Label>
              <div className="relative">
                <Input
                  value={formatCardNumber(cardNumber)}
                  onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, "").slice(0, 16))}
                  placeholder="1234 5678 9012 3456"
                  className="h-11 pr-14 font-mono tracking-wider"
                  maxLength={19}
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                  {cardType === "visa" && <VisaLogo className="h-6 w-auto rounded-[2px]" />}
                  {cardType === "mastercard" && <MastercardLogo className="h-6 w-auto rounded-[2px]" />}
                  {!cardType && rawDigits.length === 0 && (
                    <CreditCard className="h-5 w-5 text-muted-foreground" />
                  )}
                </div>
              </div>
              {errors.cardNumber && <p className="text-[11px] text-red-500 mt-1">{errors.cardNumber}</p>}
            </div>

            {/* Cardholder Name */}
            <div>
              <Label className="text-sm font-medium mb-1.5 block">Cardholder Name *</Label>
              <Input
                value={cardHolder}
                onChange={(e) => setCardHolder(e.target.value.toUpperCase())}
                placeholder="JOHN DOE"
                className="h-11 uppercase tracking-wide"
              />
              {errors.cardHolder && <p className="text-[11px] text-red-500 mt-1">{errors.cardHolder}</p>}
            </div>

            {/* Expiry + CVV row */}
            <div className="grid grid-cols-3 gap-3">
              <div>
                <Label className="text-sm font-medium mb-1.5 block">Month *</Label>
                <Select value={expiryMonth} onValueChange={setExpiryMonth}>
                  <SelectTrigger className="h-11">
                    <SelectValue placeholder="MM" />
                  </SelectTrigger>
                  <SelectContent className="z-[200]">
                    {months.map((m) => (
                      <SelectItem key={m} value={m}>{m}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-sm font-medium mb-1.5 block">Year *</Label>
                <Select value={expiryYear} onValueChange={setExpiryYear}>
                  <SelectTrigger className="h-11">
                    <SelectValue placeholder="YYYY" />
                  </SelectTrigger>
                  <SelectContent className="z-[200]">
                    {years.map((y) => (
                      <SelectItem key={y} value={y}>{y}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-sm font-medium mb-1.5 block">CVV *</Label>
                <div className="relative">
                  <Input
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 4))}
                    placeholder="123"
                    className="h-11 font-mono tracking-widest"
                    maxLength={4}
                    type="password"
                  />
                </div>
              </div>
            </div>
            {errors.expiry && <p className="text-[11px] text-red-500 -mt-2">{errors.expiry}</p>}
            {errors.cvv && <p className="text-[11px] text-red-500 -mt-2">{errors.cvv}</p>}
          </div>

          {/* Submit button */}
          <Button
            onClick={handleSubmit}
            disabled={!canSubmit}
            className="w-full h-12 mt-6 bg-[#1A1F71] text-white hover:bg-[#141860] text-sm font-semibold disabled:opacity-40"
          >
            <Lock className="h-4 w-4 mr-2" />
            Pay {formatPrice(total)}
          </Button>

          {/* Security note */}
          <div className="flex items-center justify-center gap-2 mt-4">
            <Lock className="h-3 w-3 text-muted-foreground" />
            <p className="text-[11px] text-muted-foreground text-center leading-relaxed">
              Your payment details are secured. This is a test environment.
            </p>
          </div>

          {/* Accepted cards footer */}
          <div className="mt-4 pt-4 border-t border-border flex items-center justify-center gap-3">
            <span className="text-[10px] text-muted-foreground tracking-wider uppercase">Accepted:</span>
            <VisaLogo className="h-5 w-auto rounded-[2px] opacity-60" />
            <MastercardLogo className="h-5 w-auto rounded-[2px] opacity-60" />
          </div>
        </div>
      </div>
    </div>
  )
}
