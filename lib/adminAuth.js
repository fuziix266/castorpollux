import { parse } from 'cookie'

/**
 * Middleware para verificar si el usuario está autenticado como admin
 * Usar en API routes del admin
 */
export function requireAdmin(handler) {
  return async (req, res) => {
    const cookies = parse(req.headers.cookie || '')
    const token = cookies.admin_token

    if (token !== 'authenticated') {
      return res.status(401).json({ error: 'No autorizado' })
    }

    return handler(req, res)
  }
}

/**
 * Verificar autenticación en el servidor (para getServerSideProps)
 */
export function checkAdminAuth(context) {
  const cookies = parse(context.req.headers.cookie || '')
  return cookies.admin_token === 'authenticated'
}
