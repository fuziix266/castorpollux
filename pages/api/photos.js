import getSupabaseAdmin from '../../lib/supabaseServer'

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' })

  try {
    const supabase = getSupabaseAdmin()
    const { data, error } = await supabase.from('photos').select('*').order('created_at', { ascending: false }).limit(500)
    if (error) {
      console.error('supabase photos error', error)
      return res.status(500).json({ error: String(error) })
    }

    // For each photo, try to build a publicUrl using storage (if possible)
    const photos = await Promise.all((data || []).map(async (p) => {
      let publicUrl = ''
      try {
        const bucket = 'photos'
        if (p.storage_path) {
          const { data: d } = supabase.storage.from(bucket).getPublicUrl(p.storage_path)
          publicUrl = d?.publicUrl || ''
        }
      } catch (e) {
        // ignore
      }
      return { ...p, publicUrl }
    }))

    return res.status(200).json({ data: photos })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: String(err) })
  }
}
