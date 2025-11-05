import { serialize } from 'cookie'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  // Eliminar cookie de sesión
  const cookie = serialize('admin_token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 0,
    path: '/',
  })

  res.setHeader('Set-Cookie', cookie)
  return res.status(200).json({ success: true })
}
