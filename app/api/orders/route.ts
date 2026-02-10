import { createOrder } from "@/lib/supabase-data"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.customerName || !body.customerPhone || !body.deliveryAddress || !body.items?.length) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const result = await createOrder({
      customerName: body.customerName,
      customerEmail: body.customerEmail,
      customerPhone: body.customerPhone,
      deliveryLocationId: body.deliveryLocationId,
      deliveryAddress: body.deliveryAddress,
      deliveryFee: body.deliveryFee || 0,
      subtotal: body.subtotal,
      total: body.total,
      notes: body.notes,
      orderedVia: body.orderedVia || "website",
      paymentMethod: body.paymentMethod || "cod",
      mpesaCode: body.mpesaCode,
      mpesaPhone: body.mpesaPhone,
      items: body.items,
    })

    return NextResponse.json(result)
  } catch (error) {
    console.error("Failed to create order:", error)
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 })
  }
}
