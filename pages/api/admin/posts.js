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

  // GET all posts
  if (req.method === 'GET') {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      return res.status(200).json(data)
    } catch (error) {
      console.error('Error fetching posts:', error)
      return res.status(500).json({ error: error.message })
    }
  }

  // POST - Create new post
  if (req.method === 'POST') {
    try {
      const { title, content, summary, featured_image_url, tags, published } = req.body

      if (!title || !content) {
        return res.status(400).json({ error: 'Título y contenido son requeridos' })
      }

      // Generate slug from title
      const slug = title
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // Remove accents
        .replace(/[^a-z0-9\s-]/g, '') // Remove special chars
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .replace(/-+/g, '-') // Replace multiple hyphens with single
        .trim()

      const postData = {
        title,
        slug,
        content,
        summary: summary || null,
        featured_image_url: featured_image_url || null,
        tags: tags || [],
        published: published || false,
        published_at: published ? new Date().toISOString() : null,
      }

      const { data, error } = await supabase.from('posts').insert([postData]).select().single()

      if (error) throw error
      return res.status(201).json(data)
    } catch (error) {
      console.error('Error creating post:', error)
      return res.status(500).json({ error: error.message })
    }
  }

  // PUT - Update existing post
  if (req.method === 'PUT') {
    try {
      const { id } = req.query
      const { title, content, summary, featured_image_url, tags, published } = req.body

      if (!id) {
        return res.status(400).json({ error: 'ID del post es requerido' })
      }

      if (!title || !content) {
        return res.status(400).json({ error: 'Título y contenido son requeridos' })
      }

      // Generate slug from title
      const slug = title
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim()

      const postData = {
        title,
        slug,
        content,
        summary: summary || null,
        featured_image_url: featured_image_url || null,
        tags: tags || [],
        published: published || false,
        published_at: published ? new Date().toISOString() : null,
        updated_at: new Date().toISOString(),
      }

      const { data, error } = await supabase
        .from('posts')
        .update(postData)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error
      return res.status(200).json(data)
    } catch (error) {
      console.error('Error updating post:', error)
      return res.status(500).json({ error: error.message })
    }
  }

  // DELETE - Delete post
  if (req.method === 'DELETE') {
    try {
      const { id } = req.query

      if (!id) {
        return res.status(400).json({ error: 'ID del post es requerido' })
      }

      const { error } = await supabase.from('posts').delete().eq('id', id)

      if (error) throw error
      return res.status(200).json({ message: 'Post eliminado correctamente' })
    } catch (error) {
      console.error('Error deleting post:', error)
      return res.status(500).json({ error: error.message })
    }
  }

  return res.status(405).json({ error: 'Método no permitido' })
}
