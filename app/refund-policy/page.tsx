import type { Metadata } from "next"
import { TopBar } from "@/components/store/top-bar"
import { Navbar } from "@/components/store/navbar"
import { Footer } from "@/components/store/footer"

export const metadata: Metadata = {
  title: "Refund Policy",
  description: "Understand Kallittos Fashions refund, return, and exchange policy for thrift and brand-new denim purchases.",
}

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <TopBar />
      <Navbar />
      <main className="mx-auto max-w-3xl px-4 py-12 lg:py-16">
        <h1 className="text-3xl font-serif font-bold tracking-tight text-balance">Refund Policy</h1>
        <p className="text-sm text-muted-foreground mt-2">Last updated: February 2026</p>

        <div className="mt-10 space-y-8 text-sm leading-relaxed text-muted-foreground [&_h2]:text-lg [&_h2]:font-serif [&_h2]:font-semibold [&_h2]:text-foreground [&_h2]:mb-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5">
          <section>
            <h2>1. Returns & Exchanges</h2>
            <p>We want you to love your denim. If something is not quite right, here is how we handle it:</p>
            <ul>
              <li><strong className="text-foreground">Wrong item received</strong> -- If we ship the wrong product, we will arrange a free replacement or full refund within <strong className="text-foreground">48 hours</strong> of delivery.</li>
              <li><strong className="text-foreground">Defective/damaged item</strong> -- If your item arrives with a defect not described in the listing, contact us within <strong className="text-foreground">24 hours</strong> with photos. We will offer a replacement or refund.</li>
              <li><strong className="text-foreground">Size exchange</strong> -- If the size does not fit, reach out within <strong className="text-foreground">48 hours</strong> of delivery. We will offer an exchange subject to availability. The item must be unworn, unwashed, and in its original condition. Return shipping is at the customer{"'"}s expense.</li>
            </ul>
          </section>

          <section>
            <h2>2. Non-Returnable Items</h2>
            <p>The following are <strong className="text-foreground">not eligible</strong> for returns or refunds:</p>
            <ul>
              <li>Items that have been worn, washed, altered, or damaged by the customer.</li>
              <li>Items returned after <strong className="text-foreground">48 hours</strong> from the delivery date.</li>
              <li>Sale or clearance items (unless defective).</li>
              <li>Items where the customer provided incorrect sizing information at checkout.</li>
            </ul>
          </section>

          <section>
            <h2>3. Refund Process</h2>
            <p>Approved refunds are processed as follows:</p>
            <ul>
              <li><strong className="text-foreground">M-PESA payments</strong> -- Refund sent to the same M-PESA number within <strong className="text-foreground">3-5 business days</strong>.</li>
              <li><strong className="text-foreground">Cash on Delivery</strong> -- Refund via M-PESA to the phone number on your order within <strong className="text-foreground">3-5 business days</strong>.</li>
              <li>Partial refunds may be issued if the item shows signs of use beyond trying on.</li>
            </ul>
          </section>

          <section>
            <h2>4. How to Request a Return or Refund</h2>
            <p>To initiate a return or refund request:</p>
            <ul>
              <li>WhatsApp us at <a href="https://wa.me/254713809695" className="underline underline-offset-2 hover:text-foreground transition-colors">0713 809 695</a> with your order number and clear photos of the item.</li>
              <li>Email <a href="mailto:info@kallittofashions.com" className="underline underline-offset-2 hover:text-foreground transition-colors">info@kallittofashions.com</a> with the subject line {"\""}Return Request - [Order Number]{"\""}.</li>
              <li>Our team will review your request and respond within <strong className="text-foreground">24 hours</strong>.</li>
            </ul>
          </section>

          <section>
            <h2>5. Cancellations</h2>
            <ul>
              <li>Orders can be cancelled <strong className="text-foreground">before dispatch</strong> for a full refund.</li>
              <li>Once an order has been dispatched, it cannot be cancelled. You may request a return after delivery per the conditions above.</li>
              <li>To cancel, contact us immediately via WhatsApp or email with your order number.</li>
            </ul>
          </section>

          <section>
            <h2>6. Thrift Item Disclaimer</h2>
            <p>Thrift items are pre-loved and sold as-is. Minor imperfections such as slight fading, small marks, or natural wear are part of the thrift character and are <strong className="text-foreground">not grounds for a return</strong> unless they were not disclosed in the product listing.</p>
          </section>

          <section>
            <h2>7. Contact Us</h2>
            <p>Questions about our refund policy? Reach out anytime:</p>
            <ul>
              <li>WhatsApp: <a href="https://wa.me/254713809695" className="underline underline-offset-2 hover:text-foreground transition-colors">0713 809 695</a></li>
              <li>Email: <a href="mailto:info@kallittofashions.com" className="underline underline-offset-2 hover:text-foreground transition-colors">info@kallittofashions.com</a></li>
              <li>Visit us: Dynamic Mall, 2nd Floor, Room ML 96, Nairobi CBD</li>
            </ul>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}
