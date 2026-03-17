import { NextRequest, NextResponse } from "next/server"
import { rateLimit, rateLimitResponse, sanitize, isValidPhone } from "@/lib/security"

export async function POST(request: NextRequest) {
  // Rate limit: max 3 bolt requests per minute per IP
  const rl = rateLimit(request, { limit: 3, windowSeconds: 60 })
  if (!rl.success) return rateLimitResponse()

  try {
    const body = await request.json()

    const pickupAddress = sanitize(body.pickupAddress, 500)
    const dropoffAddress = sanitize(body.dropoffAddress, 500)
    const contactPhone = sanitize(body.contactPhone, 20)
    const notes = sanitize(body.notes, 1000)
    const estimatedFee = Math.max(0, Number(body.estimatedFee) || 0)
    const orderNumber = sanitize(body.orderNumber, 30)

    if (!dropoffAddress || !contactPhone) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    if (!isValidPhone(contactPhone)) {
      return NextResponse.json({ error: "Invalid phone number" }, { status: 400 })
    }

    // In a production integration, this would call the Bolt Business API
    // to create a delivery request. For now, we record the request
    // and return a confirmation that can be fulfilled manually or
    // via a future Bolt API integration.
    const deliveryRequest = {
      id: `BOLT-${Date.now().toString(36).toUpperCase()}`,
      status: "requested",
      pickupAddress,
      dropoffAddress,
      contactPhone,
      estimatedFee,
      notes,
      orderNumber,
      createdAt: new Date().toISOString(),
    }

    // Log for admin tracking
    console.log("[Bolt Delivery Request]", JSON.stringify(deliveryRequest))

    return NextResponse.json({
      success: true,
      deliveryId: deliveryRequest.id,
      status: "requested",
      message: "Bolt delivery request has been submitted. A driver will be assigned shortly.",
      estimatedTime: "30-60 minutes",
    })
  } catch (error) {
    console.error("Bolt delivery request failed:", error)
    return NextResponse.json({ error: "Failed to process Bolt delivery request" }, { status: 500 })
  }
}
