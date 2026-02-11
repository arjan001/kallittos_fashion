import { createAdminClient as createClient } from "@/lib/supabase/admin"
import { NextRequest, NextResponse } from "next/server"
import { UAParser } from "ua-parser-js"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const userAgent = request.headers.get("user-agent") || ""
    const parser = new UAParser(userAgent)
    const browser = parser.getBrowser().name || "Unknown"
    const deviceType = parser.getDevice().type || "desktop"

    // Get geo from Vercel headers
    const country = request.headers.get("x-vercel-ip-country") || ""
    const city = request.headers.get("x-vercel-ip-city") || ""

    const supabase = createClient()
    const { error } = await supabase.from("page_views").insert({
      page_path: body.path || "/",
      referrer: body.referrer || "",
      user_agent: userAgent,
      country,
      city,
      device_type: deviceType,
      browser,
      session_id: body.sessionId || "",
    })

    if (error) {
      console.error("Failed to track view:", error)
      return NextResponse.json({ error: "Failed" }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 })
  }
}
