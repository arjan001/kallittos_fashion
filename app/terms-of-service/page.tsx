import type { Metadata } from "next"
import { TopBar } from "@/components/store/top-bar"
import { Navbar } from "@/components/store/navbar"
import { Footer } from "@/components/store/footer"

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Read the terms and conditions governing your use of the Kallittos Fashions website and purchases.",
}

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <TopBar />
      <Navbar />
      <main className="mx-auto max-w-3xl px-4 py-12 lg:py-16">
        <h1 className="text-3xl font-serif font-bold tracking-tight text-balance">Terms of Service</h1>
        <p className="text-sm text-muted-foreground mt-2">Last updated: February 2026</p>

        <div className="mt-10 space-y-8 text-sm leading-relaxed text-muted-foreground [&_h2]:text-lg [&_h2]:font-serif [&_h2]:font-semibold [&_h2]:text-foreground [&_h2]:mb-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5">
          <section>
            <h2>1. Acceptance of Terms</h2>
            <p>By accessing or purchasing from Kallittos Fashions (kallittofashions.com), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website or services.</p>
          </section>

          <section>
            <h2>2. Products & Descriptions</h2>
            <p>We strive to accurately describe all products, including condition (thrift or brand-new), size, colour, and material. However, due to the nature of thrift items:</p>
            <ul>
              <li>Colours may vary slightly from photos depending on your screen settings.</li>
              <li>Thrift items are pre-owned and may have minor signs of wear consistent with their nature.</li>
              <li>Each thrift piece is unique -- once sold, the exact item cannot be replicated.</li>
            </ul>
          </section>

          <section>
            <h2>3. Pricing & Payment</h2>
            <p>All prices are listed in <strong className="text-foreground">Kenya Shillings (KSh)</strong> and include applicable taxes.</p>
            <ul>
              <li>We accept payments via <strong className="text-foreground">M-PESA</strong> (Till Number), <strong className="text-foreground">Cash on Delivery</strong>, and <strong className="text-foreground">WhatsApp orders</strong>.</li>
              <li>M-PESA payments must be confirmed with a valid transaction code before dispatch.</li>
              <li>We reserve the right to adjust prices without prior notice. Orders already confirmed will be honoured at the original price.</li>
            </ul>
          </section>

          <section>
            <h2>4. Orders & Confirmation</h2>
            <ul>
              <li>Placing an order constitutes an offer to purchase. Orders are confirmed once payment is verified or delivery arrangement is agreed upon.</li>
              <li>We reserve the right to cancel any order due to stock unavailability, payment issues, or suspected fraud.</li>
              <li>Order confirmation will be sent via WhatsApp or SMS to the phone number provided.</li>
            </ul>
          </section>

          <section>
            <h2>5. Delivery</h2>
            <ul>
              <li>We deliver across Kenya. Delivery fees vary by location and are displayed at checkout.</li>
              <li>Orders above <strong className="text-foreground">KSh 5,000</strong> qualify for free shipping to select locations.</li>
              <li>Dispatch days are <strong className="text-foreground">Tuesdays and Fridays</strong>. Delivery timelines are estimates and may vary due to courier logistics.</li>
              <li>Kallittos Fashions is not liable for delays caused by third-party delivery services or force majeure events.</li>
            </ul>
          </section>

          <section>
            <h2>6. Intellectual Property</h2>
            <p>All content on this site -- including product photos, descriptions, logos, and design -- is the property of Kallittos Fashions and <a href="https://oneplusafrica.com/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-foreground transition-colors">OnePlusAfrica Tech Solutions</a>. Unauthorised reproduction, distribution, or use is prohibited.</p>
          </section>

          <section>
            <h2>7. User Conduct</h2>
            <p>You agree not to:</p>
            <ul>
              <li>Use the website for any unlawful purpose or fraudulent activity.</li>
              <li>Attempt to gain unauthorised access to our systems or data.</li>
              <li>Submit false information during checkout or registration.</li>
              <li>Scrape, copy, or redistribute our product listings or images.</li>
            </ul>
          </section>

          <section>
            <h2>8. Limitation of Liability</h2>
            <p>Kallittos Fashions shall not be liable for any indirect, incidental, or consequential damages arising from your use of the website or purchase of products. Our total liability is limited to the amount paid for the specific order in question.</p>
          </section>

          <section>
            <h2>9. Governing Law</h2>
            <p>These terms are governed by the laws of <strong className="text-foreground">the Republic of Kenya</strong>. Any disputes shall be resolved through negotiation or, if necessary, the courts of Nairobi.</p>
          </section>

          <section>
            <h2>10. Contact</h2>
            <p>For questions about these terms, reach us at <a href="mailto:info@kallittofashions.com" className="underline underline-offset-2 hover:text-foreground transition-colors">info@kallittofashions.com</a> or WhatsApp <a href="https://wa.me/254713809695" className="underline underline-offset-2 hover:text-foreground transition-colors">0713 809 695</a>.</p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}
