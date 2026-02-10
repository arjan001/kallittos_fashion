import type { Metadata } from "next"
import { TopBar } from "@/components/store/top-bar"
import { Navbar } from "@/components/store/navbar"
import { Footer } from "@/components/store/footer"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Learn how Kallittos Fashions collects, uses, and protects your personal information when you shop with us.",
}

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <TopBar />
      <Navbar />
      <main className="mx-auto max-w-3xl px-4 py-12 lg:py-16">
        <h1 className="text-3xl font-serif font-bold tracking-tight text-balance">Privacy Policy</h1>
        <p className="text-sm text-muted-foreground mt-2">Last updated: February 2026</p>

        <div className="mt-10 space-y-8 text-sm leading-relaxed text-muted-foreground [&_h2]:text-lg [&_h2]:font-serif [&_h2]:font-semibold [&_h2]:text-foreground [&_h2]:mb-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5">
          <section>
            <h2>1. Information We Collect</h2>
            <p>When you place an order or interact with Kallittos Fashions, we may collect the following information:</p>
            <ul>
              <li><strong className="text-foreground">Personal details</strong> -- your name, phone number, and email address provided during checkout.</li>
              <li><strong className="text-foreground">Delivery information</strong> -- your delivery address and preferred pickup location.</li>
              <li><strong className="text-foreground">Payment reference</strong> -- M-PESA transaction codes for order verification (we do not store your M-PESA PIN or account details).</li>
              <li><strong className="text-foreground">Browsing data</strong> -- pages visited, products viewed, and items added to your wishlist or cart, collected through cookies and analytics tools.</li>
            </ul>
          </section>

          <section>
            <h2>2. How We Use Your Information</h2>
            <p>We use your data to:</p>
            <ul>
              <li>Process and fulfil your orders, including delivery coordination.</li>
              <li>Communicate order updates via SMS, WhatsApp, or email.</li>
              <li>Verify M-PESA payments and resolve payment disputes.</li>
              <li>Improve our product range and shopping experience based on browsing trends.</li>
              <li>Send promotional offers and new arrival notifications (only with your consent).</li>
            </ul>
          </section>

          <section>
            <h2>3. Information Sharing</h2>
            <p>We do <strong className="text-foreground">not</strong> sell, rent, or trade your personal information. We may share limited data with:</p>
            <ul>
              <li><strong className="text-foreground">Delivery partners</strong> -- your name, phone number, and delivery address to fulfil shipments.</li>
              <li><strong className="text-foreground">Payment processors</strong> -- transaction references for verification with Safaricom M-PESA.</li>
              <li><strong className="text-foreground">Analytics providers</strong> -- anonymised browsing data to help us understand site performance.</li>
            </ul>
          </section>

          <section>
            <h2>4. Data Security</h2>
            <p>We take reasonable measures to protect your personal information, including encrypted connections (HTTPS), secure server infrastructure, and restricted staff access. However, no method of electronic storage is 100% secure, and we cannot guarantee absolute security.</p>
          </section>

          <section>
            <h2>5. Cookies</h2>
            <p>Our website uses cookies to remember your cart, wishlist, and browsing preferences. You can disable cookies in your browser settings, though this may affect site functionality.</p>
          </section>

          <section>
            <h2>6. Your Rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Request access to the personal data we hold about you.</li>
              <li>Request correction or deletion of your data.</li>
              <li>Opt out of promotional communications at any time.</li>
            </ul>
            <p className="mt-2">To exercise any of these rights, contact us at <a href="mailto:info@kallittofashions.com" className="underline underline-offset-2 hover:text-foreground transition-colors">info@kallittofashions.com</a> or WhatsApp <a href="https://wa.me/254713809695" className="underline underline-offset-2 hover:text-foreground transition-colors">0713 809 695</a>.</p>
          </section>

          <section>
            <h2>7. Changes to This Policy</h2>
            <p>We may update this privacy policy from time to time. Changes will be posted on this page with a revised date. Your continued use of the site constitutes acceptance of the updated policy.</p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}
