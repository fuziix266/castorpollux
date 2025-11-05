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

  // GET all events
  if (req.method === 'GET') {
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('event_date', { ascending: false })

      if (error) throw error
      return res.status(200).json(data)
    } catch (error) {
      console.error('Error fetching events:', error)
      return res.status(500).json({ error: error.message })
    }
  }

  // POST - Create new event
  if (req.method === 'POST') {
    try {
      const { title, description, event_date, location, image_url } = req.body

      if (!title || !description || !event_date) {
        return res.status(400).json({ error: 'Título, descripción y fecha son requeridos' })
      }

      const eventData = {
        title,
        description,
        event_date,
        location: location || null,
        image_url: image_url || null,
      }

      const { data, error } = await supabase.from('events').insert([eventData]).select().single()

      if (error) throw error
      return res.status(201).json(data)
    } catch (error) {
      console.error('Error creating event:', error)
      return res.status(500).json({ error: error.message })
    }
  }

  // PUT - Update existing event
  if (req.method === 'PUT') {
    try {
      const { id } = req.query
      const { title, description, event_date, location, image_url } = req.body

      if (!id) {
        return res.status(400).json({ error: 'ID del evento es requerido' })
      }

      if (!title || !description || !event_date) {
        return res.status(400).json({ error: 'Título, descripción y fecha son requeridos' })
      }

      const eventData = {
        title,
        description,
        event_date,
        location: location || null,
        image_url: image_url || null,
        updated_at: new Date().toISOString(),
      }

      const { data, error } = await supabase
        .from('events')
        .update(eventData)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error
      return res.status(200).json(data)
    } catch (error) {
      console.error('Error updating event:', error)
      return res.status(500).json({ error: error.message })
    }
  }

  // DELETE - Delete event
  if (req.method === 'DELETE') {
    try {
      const { id } = req.query

      if (!id) {
        return res.status(400).json({ error: 'ID del evento es requerido' })
      }

      const { error } = await supabase.from('events').delete().eq('id', id)

      if (error) throw error
      return res.status(200).json({ message: 'Evento eliminado correctamente' })
    } catch (error) {
      console.error('Error deleting event:', error)
      return res.status(500).json({ error: error.message })
    }
  }

  return res.status(405).json({ error: 'Método no permitido' })
}
