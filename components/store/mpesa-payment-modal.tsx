"use client"

import { useState } from "react"
import { X, CheckCircle, Loader2, Copy, Check, ChevronRight } from "lucide-react"
import { formatPrice } from "@/lib/format"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type PaymentMethod = "till" | "paybill" | "pochi"
type Step = "select-method" | "payment-details" | "confirm-payment"

const PAYMENT_INFO = {
  till: {
    label: "Buy Goods (Till Number)",
    number: "3754126",
    name: "KALLITTOS FASHION",
    instructions: [
      "Go to M-PESA on your phone",
      "Select Lipa na M-PESA",
      "Select Buy Goods and Services",
      "Enter Till Number: 3754126",
      "Enter the exact amount shown below",
      "Enter your M-PESA PIN and confirm",
    ],
  },
  paybill: {
    label: "Paybill",
    number: "247247",
    accountNumber: "0713809695",
    name: "KALLITTOS FASHION",
    instructions: [
      "Go to M-PESA on your phone",
      "Select Lipa na M-PESA",
      "Select Pay Bill",
      "Enter Business Number: 247247",
      "Enter Account Number: 0713809695",
      "Enter the exact amount shown below",
      "Enter your M-PESA PIN and confirm",
    ],
  },
  pochi: {
    label: "Pochi La Biashara",
    number: "0713 809 695",
    name: "KALLITTOS FASHION",
    instructions: [
      "Go to M-PESA on your phone",
      "Select Lipa na M-PESA",
      "Select Pochi La Biashara",
      "Enter Number: 0713 809 695",
      "Enter the exact amount shown below",
      "Enter your M-PESA PIN and confirm",
    ],
  },
}

interface MpesaPaymentModalProps {
  isOpen: boolean
  onClose: () => void
  total: number
  onPaymentConfirmed: (mpesaCode: string, phone: string) => void
}

export function MpesaPaymentModal({ isOpen, onClose, total, onPaymentConfirmed }: MpesaPaymentModalProps) {
  const [step, setStep] = useState<Step>("select-method")
  const [method, setMethod] = useState<PaymentMethod | null>(null)
  const [mpesaCode, setMpesaCode] = useState("")
  const [mpesaPhone, setMpesaPhone] = useState("")
  const [copied, setCopied] = useState<string | null>(null)
  const [isConfirming, setIsConfirming] = useState(false)

  if (!isOpen) return null

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text)
    setCopied(key)
    setTimeout(() => setCopied(null), 2000)
  }

  const selectMethod = (m: PaymentMethod) => {
    setMethod(m)
    setStep("payment-details")
  }

  const goToConfirm = () => {
    setStep("confirm-payment")
  }

  const handleConfirm = async () => {
    if (!mpesaCode.trim() || mpesaCode.trim().length < 8) return
    setIsConfirming(true)
    // Simulate a brief delay
    await new Promise((r) => setTimeout(r, 1000))
    onPaymentConfirmed(mpesaCode.trim().toUpperCase(), mpesaPhone.trim())
    setIsConfirming(false)
  }

  const reset = () => {
    setStep("select-method")
    setMethod(null)
    setMpesaCode("")
    setMpesaPhone("")
  }

  const info = method ? PAYMENT_INFO[method] : null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-foreground/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-background w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-sm shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="sticky top-0 bg-background z-10 flex items-center justify-between p-5 border-b border-border">
          <div className="flex items-center gap-3">
            {/* Safaricom green icon */}
            <div className="w-10 h-10 rounded-full bg-[#4CAF50] flex items-center justify-center flex-shrink-0">
              <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17 2H7c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 18H7V4h10v16z" />
                <path d="M11 17.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5z" />
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-serif font-bold">M-PESA Payment</h2>
              <p className="text-xs text-muted-foreground">Lipa na M-PESA</p>
            </div>
          </div>
          <button type="button" onClick={onClose} className="p-1.5 hover:bg-secondary rounded-sm transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Amount bar */}
        <div className="bg-[#4CAF50] text-white px-5 py-3 flex items-center justify-between">
          <span className="text-sm font-medium">Amount to Pay</span>
          <span className="text-lg font-bold">{formatPrice(total)}</span>
        </div>

        <div className="p-5">
          {/* Step 1: Select Payment Method */}
          {step === "select-method" && (
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground mb-4">Choose your preferred M-PESA payment method:</p>

              {/* Till Number */}
              <button
                type="button"
                onClick={() => selectMethod("till")}
                className="w-full flex items-center gap-4 p-4 border border-border rounded-sm hover:bg-secondary/50 transition-colors text-left group"
              >
                <div className="w-12 h-12 rounded-full bg-[#4CAF50]/10 flex items-center justify-center flex-shrink-0">
                  <svg className="h-6 w-6 text-[#4CAF50]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="6" width="20" height="12" rx="2" />
                    <path d="M12 12h.01" />
                    <path d="M17 12h.01" />
                    <path d="M7 12h.01" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold">Buy Goods (Till Number)</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Till: 3754126 - KALLITTOS FASHION</p>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
              </button>

              {/* Paybill */}
              <button
                type="button"
                onClick={() => selectMethod("paybill")}
                className="w-full flex items-center gap-4 p-4 border border-border rounded-sm hover:bg-secondary/50 transition-colors text-left group"
              >
                <div className="w-12 h-12 rounded-full bg-[#4CAF50]/10 flex items-center justify-center flex-shrink-0">
                  <svg className="h-6 w-6 text-[#4CAF50]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
                    <rect x="9" y="3" width="6" height="4" rx="1" />
                    <path d="M9 14l2 2 4-4" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold">Paybill</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Business No: 247247 | Acc: 0713809695</p>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
              </button>

              {/* Pochi La Biashara */}
              <button
                type="button"
                onClick={() => selectMethod("pochi")}
                className="w-full flex items-center gap-4 p-4 border border-border rounded-sm hover:bg-secondary/50 transition-colors text-left group"
              >
                <div className="w-12 h-12 rounded-full bg-[#4CAF50]/10 flex items-center justify-center flex-shrink-0">
                  <svg className="h-6 w-6 text-[#4CAF50]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17 2H7c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
                    <path d="M12 18h.01" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold">Pochi La Biashara</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Send to: 0713 809 695</p>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
              </button>
            </div>
          )}

          {/* Step 2: Payment Details */}
          {step === "payment-details" && info && (
            <div className="space-y-5">
              <button type="button" onClick={reset} className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1">
                <ChevronRight className="h-3 w-3 rotate-180" /> Back to methods
              </button>

              {/* Payment info card */}
              <div className="bg-[#4CAF50] rounded-sm overflow-hidden">
                <div className="px-5 py-4">
                  <p className="text-white/80 text-xs font-semibold uppercase tracking-wider">
                    {method === "till" ? "Buy Goods Till Number" : method === "paybill" ? "Paybill Number" : "Pochi La Biashara"}
                  </p>
                  <div className="flex items-center gap-3 mt-3">
                    <div className="flex gap-1">
                      {(method === "till" ? "3754126" : method === "paybill" ? "247247" : "0713809695").split("").map((digit, i) => (
                        <div key={i} className="w-9 h-11 bg-white rounded-sm flex items-center justify-center">
                          <span className="text-[#4CAF50] text-lg font-bold">{digit}</span>
                        </div>
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(info.number.replace(/\s/g, ""), "number")}
                      className="p-2 bg-white/20 rounded-sm hover:bg-white/30 transition-colors"
                    >
                      {copied === "number" ? <Check className="h-4 w-4 text-white" /> : <Copy className="h-4 w-4 text-white" />}
                    </button>
                  </div>
                  <p className="text-white font-bold text-sm mt-3">{info.name}</p>
                  {method === "paybill" && (
                    <div className="mt-2 flex items-center gap-2">
                      <span className="text-white/80 text-xs">Account No:</span>
                      <span className="text-white font-semibold text-sm">{PAYMENT_INFO.paybill.accountNumber}</span>
                      <button
                        type="button"
                        onClick={() => copyToClipboard(PAYMENT_INFO.paybill.accountNumber!, "account")}
                        className="p-1 bg-white/20 rounded-sm hover:bg-white/30 transition-colors"
                      >
                        {copied === "account" ? <Check className="h-3 w-3 text-white" /> : <Copy className="h-3 w-3 text-white" />}
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Steps */}
              <div>
                <p className="text-sm font-semibold mb-3">How to Pay:</p>
                <ol className="space-y-2">
                  {info.instructions.map((instruction, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm">
                      <span className="w-6 h-6 flex-shrink-0 rounded-full bg-secondary flex items-center justify-center text-xs font-bold text-foreground">
                        {i + 1}
                      </span>
                      <span className="text-muted-foreground leading-relaxed pt-0.5">{instruction}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="bg-secondary/50 p-4 rounded-sm">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Amount:</span>
                  <span className="text-lg font-bold">{formatPrice(total)}</span>
                </div>
              </div>

              <Button
                onClick={goToConfirm}
                className="w-full h-12 bg-[#4CAF50] text-white hover:bg-[#43A047] text-sm font-semibold"
              >
                {"I've Sent the Payment"}
              </Button>
            </div>
          )}

          {/* Step 3: Confirm Payment */}
          {step === "confirm-payment" && (
            <div className="space-y-5">
              <button type="button" onClick={() => setStep("payment-details")} className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1">
                <ChevronRight className="h-3 w-3 rotate-180" /> Back
              </button>

              <div className="text-center py-2">
                <div className="w-16 h-16 mx-auto rounded-full bg-[#4CAF50]/10 flex items-center justify-center mb-3">
                  <CheckCircle className="h-8 w-8 text-[#4CAF50]" />
                </div>
                <h3 className="text-lg font-serif font-bold">Confirm Your Payment</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Enter the M-PESA confirmation code from the SMS you received
                </p>
              </div>

              <div className="space-y-4">
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
                  <Label className="text-sm font-medium mb-1.5 block">M-PESA Phone Number (optional)</Label>
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
                className="w-full h-12 bg-[#4CAF50] text-white hover:bg-[#43A047] text-sm font-semibold disabled:opacity-40"
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

              <p className="text-[11px] text-muted-foreground text-center leading-relaxed">
                Your order will be marked as paid and our team will verify the payment. 
                If there are any issues, we will contact you.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
