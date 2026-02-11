import { LandingPage } from "@/components/store/landing-page"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Kallittos Fashions | Curated Thrift & New Denim - Jeans, Jackets & More in Kenya",
  description:
    "Shop the best curated thrift & brand-new denim at Kallittos Fashions. Mom jeans, skinny jeans, boyfriend jeans, wide-leg denim, denim jackets & dungarees. Sustainable fashion delivered across Kenya via M-PESA.",
  alternates: { canonical: "https://kallittofashions.com" },
  openGraph: {
    title: "Kallittos Fashions | Curated Thrift & New Denim in Kenya",
    description: "Shop curated thrift & brand-new mom jeans, wide-leg denim, and vintage jackets. Style meets sustainability. Delivered across Kenya.",
    url: "https://kallittofashions.com",
    type: "website",
    siteName: "Kallittos Fashions",
    locale: "en_KE",
    images: [{ url: "https://kallittofashions.com/logo-kf.png", width: 512, height: 512, alt: "Kallittos Fashions Logo" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kallittos Fashions | Curated Thrift & New Denim in Kenya",
    description: "Shop curated thrift & brand-new denim. Style meets sustainability. Delivered across Kenya.",
    images: ["https://kallittofashions.com/logo-kf.png"],
    creator: "@kallittos",
  },
}

export default function Page() {
  return <LandingPage />
}
