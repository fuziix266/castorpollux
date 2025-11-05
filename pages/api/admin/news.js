import { getSupabaseAdmin } from '../../../lib/supabaseServer'
import { parse } from 'cookie'

export default async function handler(req, res) {
  // Check admin authentication
  const cookies = parse(req.headers.cookie || '')
  const adminPassword = process.env.ADMIN_PASSWORD

  if (!cookies.adminAuth || cookies.adminAuth !== adminPassword) {
    return res.status(401).json({ error: 'No autorizado' })
  }

  const supabase = getSupabaseAdmin()

  // GET all news
  if (req.method === 'GET') {
    try {
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      return res.status(200).json(data)
    } catch (error) {
      console.error('Error fetching news:', error)
      return res.status(500).json({ error: error.message })
    }
  }

  // POST - Create new news
  if (req.method === 'POST') {
    try {
      const { title, content, summary, image_url, published } = req.body

      if (!title || !content) {
        return res.status(400).json({ error: 'Título y contenido son requeridos' })
      }

      const newsData = {
        title,
        content,
        summary: summary || null,
        image_url: image_url || null,
        published: published || false,
        published_at: published ? new Date().toISOString() : null,
      }

      const { data, error } = await supabase.from('news').insert([newsData]).select().single()

      if (error) throw error
      return res.status(201).json(data)
    } catch (error) {
      console.error('Error creating news:', error)
      return res.status(500).json({ error: error.message })
    }
  }

  // PUT - Update existing news
  if (req.method === 'PUT') {
    try {
      const { id } = req.query
      const { title, content, summary, image_url, published } = req.body

      if (!id) {
        return res.status(400).json({ error: 'ID de la noticia es requerido' })
      }

      if (!title || !content) {
        return res.status(400).json({ error: 'Título y contenido son requeridos' })
      }

      const newsData = {
        title,
        content,
        summary: summary || null,
        image_url: image_url || null,
        published: published || false,
        published_at: published ? new Date().toISOString() : null,
        updated_at: new Date().toISOString(),
      }

      const { data, error } = await supabase
        .from('news')
        .update(newsData)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error
      return res.status(200).json(data)
    } catch (error) {
      console.error('Error updating news:', error)
      return res.status(500).json({ error: error.message })
    }
  }

  // DELETE - Delete news
  if (req.method === 'DELETE') {
    try {
      const { id } = req.query

      if (!id) {
        return res.status(400).json({ error: 'ID de la noticia es requerido' })
      }

      const { error } = await supabase.from('news').delete().eq('id', id)

      if (error) throw error
      return res.status(200).json({ message: 'Noticia eliminada correctamente' })
    } catch (error) {
      console.error('Error deleting news:', error)
      return res.status(500).json({ error: error.message })
    }
  }

  return res.status(405).json({ error: 'Método no permitido' })
}
