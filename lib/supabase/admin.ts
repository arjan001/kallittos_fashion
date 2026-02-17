import { createClient } from "@supabase/supabase-js"

/**
 * Service-role Supabase client for admin operations only.
 * This bypasses RLS and can create/manage auth users.
 * NEVER expose this to the client side.
 */
export function createAdminClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !serviceRoleKey) {
    console.error("[v0] Missing Supabase credentials: SUPABASE_SERVICE_ROLE_KEY or NEXT_PUBLIC_SUPABASE_URL not found")
    return null
  }

  try {
    return createClient(supabaseUrl, serviceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })
  } catch (error) {
    console.error("[v0] Failed to create admin client:", error)
    return null
  }
}
