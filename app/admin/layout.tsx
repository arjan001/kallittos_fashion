import React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Admin - PreciousGems",
  description: "Admin dashboard for managing products, orders and offers.",
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
