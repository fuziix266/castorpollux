import { createClient } from '@supabase/supabase-js'

// Return a client if env vars exist, otherwise return a safe stub so importing
// this module at build-time doesn't throw when envs are absent.
export function getSupabaseClient() {
	const url = process.env.NEXT_PUBLIC_SUPABASE_URL
	const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
	if (!url || !key) {
		// lightweight stub used during build-time when envs are not set
		return {
			from: () => ({ select: async () => ({ data: [], error: null }) }),
			storage: { from: () => ({ getPublicUrl: () => ({ data: { publicUrl: '' } }) }) },
		}
	}
	return createClient(url, key)
}

export default getSupabaseClient
