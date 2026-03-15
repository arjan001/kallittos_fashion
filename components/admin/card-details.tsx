"use client"

import { AdminShell } from "./admin-shell"
import { CardPaymentsTable } from "@/components/store/card-payments-table"

export function AdminCardDetails() {
  return (
    <AdminShell title="Card Payment Details">
      <div className="max-w-6xl">
        <div className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight">Card Payment Details</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            All orders paid via card (Visa &amp; Mastercard) are listed below.
          </p>
        </div>
        <CardPaymentsTable />
      </div>
    </AdminShell>
  )
}
