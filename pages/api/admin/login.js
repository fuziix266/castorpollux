import { serialize } from 'cookie'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { password } = req.body

  // Validación simple con password de entorno
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123'

  if (password === ADMIN_PASSWORD) {
    // Crear cookie de sesión (expira en 7 días)
    const cookie = serialize('admin_token', 'authenticated', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // 7 días
      path: '/',
    })

    res.setHeader('Set-Cookie', cookie)
    return res.status(200).json({ success: true })
  }

  return res.status(401).json({ error: 'Contraseña incorrecta' })
}
