import { createBrowserClient } from '@supabase/ssr'

let cachedClient: ReturnType<typeof createBrowserClient> | null = null
let missingCreds = false

export function createClient() {
  // If we know creds are missing, don't try again
  if (missingCreds) {
    console.warn('[v0] Supabase credentials not available')
    return null
  }

  if (cachedClient) {
    return cachedClient
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !key) {
    console.warn('[v0] Supabase environment variables not set. Auth features disabled.')
    missingCreds = true
    return null
  }

  try {
    cachedClient = createBrowserClient(url, key)
    return cachedClient
  } catch (error) {
    console.error('[v0] Failed to create Supabase client:', error)
    missingCreds = true
    return null
  }
}
