import supabaseAdmin from '../../lib/supabaseServer'

export const config = { api: { bodyParser: { sizeLimit: '10mb' } } }

export default async function handler(req, res){
  if(req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  // Very simple admin check: cookie must exist
  const cookie = (req.headers.cookie || '').split(';').map(s=>s.trim()).find(s=>s.startsWith('castor_admin='))
  if(!cookie) return res.status(401).json({ error: 'Not authenticated' })

  const { filename, content, caption, photographer } = req.body
  if(!filename || !content) return res.status(400).json({ error: 'Missing file data' })

  try{
    const buffer = Buffer.from(content, 'base64')
    const dest = `uploads/${Date.now()}-${filename}`
    const { data, error } = await supabaseAdmin.storage.from('photos').upload(dest, buffer, { upsert: false })
    if(error) return res.status(500).json({ error })
    const insert = await supabaseAdmin.from('photos').insert([{ filename, storage_path: data.path, caption, photographer, source: 'admin' }])
    if(insert.error) return res.status(500).json({ error: insert.error })
    return res.status(200).json({ ok: true, photo: insert.data?.[0] })
  }catch(err){
    console.error(err)
    return res.status(500).json({ error: String(err) })
  }
}
