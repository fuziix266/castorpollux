import { createClient } from '@supabase/supabase-js'

// Create a server-side Supabase client using the service role key.
// Export a getter so import-time doesn't throw when env vars are missing.
export function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_KEY
  if (!url || !key) {
    // Return a stub that the API can handle (returns empty data)
    return {
      from: () => ({ select: async () => ({ data: [], error: null }) }),
      storage: { from: () => ({ getPublicUrl: () => ({ data: { publicUrl: '' } }) }), upload: async () => ({ data: null, error: { message: 'no supabase key' } }) },
    }
  }

  return createClient(url, key, { auth: { persistSession: false } })
}

export default getSupabaseAdmin
