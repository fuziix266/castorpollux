export default function handler(req, res){
  if(req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })
  const { password } = req.body
  if(!process.env.ADMIN_PASSWORD) return res.status(500).json({ error: 'ADMIN_PASSWORD not set on server' })
  if(password === process.env.ADMIN_PASSWORD){
    // set simple httpOnly cookie
    res.setHeader('Set-Cookie', 'castor_admin=1; HttpOnly; Path=/; Max-Age=86400; SameSite=Lax')
    return res.status(200).json({ ok: true })
  }
  return res.status(401).json({ error: 'Invalid password' })
}
