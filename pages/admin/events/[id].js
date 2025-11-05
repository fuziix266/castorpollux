import { useState } from 'react'
import { useRouter } from 'next/router'
import AdminLayout from '../../../components/AdminLayout'
import { checkAdminAuth } from '../../../lib/adminAuth'

export default function EditEvent({ event }) {
  const router = useRouter()
  
  // Format date for datetime-local input
  const formatDateForInput = (dateString) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    return `${year}-${month}-${day}T${hours}:${minutes}`
  }

  const [formData, setFormData] = useState({
    title: event.title || '',
    description: event.description || '',
    event_date: formatDateForInput(event.event_date),
    location: event.location || '',
    image_url: event.image_url || '',
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch(`/api/admin/events?id=${event.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        router.push('/admin/events')
      } else {
        const error = await res.json()
        alert('Error al actualizar el evento: ' + (error.error || 'Error desconocido'))
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Error al actualizar el evento')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm('¿Estás seguro de que quieres eliminar este evento?')) return

    try {
      const res = await fetch(`/api/admin/events?id=${event.id}`, {
        method: 'DELETE',
      })

      if (res.ok) {
        router.push('/admin/events')
      } else {
        alert('Error al eliminar el evento')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Error al eliminar el evento')
    }
  }

  return (
    <AdminLayout>
      <div className="mx-auto max-w-4xl">
        {/* Breadcrumbs */}
        <div className="flex flex-wrap gap-2 items-center">
          <a
            href="/admin"
            className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-normal hover:text-primary-admin"
          >
            Admin
          </a>
          <span className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-normal">
            /
          </span>
          <a
            href="/admin/events"
            className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-normal hover:text-primary-admin"
          >
            Eventos
          </a>
          <span className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-normal">
            /
          </span>
          <span className="text-slate-900 dark:text-white text-sm font-medium leading-normal">
            Editar: {event.title}
          </span>
        </div>

        {/* Page Heading */}
        <div className="mt-4">
          <h1 className="text-slate-900 dark:text-white text-4xl font-black leading-tight tracking-[-0.033em]">
            Editar Evento
          </h1>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-6">
          {/* Title */}
          <div className="flex flex-col gap-2">
            <label
              className="text-slate-900 dark:text-white text-base font-medium leading-normal"
              htmlFor="title"
            >
              Título del Evento
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="form-input flex w-full resize-none overflow-hidden rounded-lg text-slate-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary-admin border border-slate-300 dark:border-slate-700 bg-background-light dark:bg-[#1d1c27] h-14 placeholder:text-slate-400 dark:placeholder:text-slate-500 p-4 text-base font-normal leading-normal"
            />
          </div>

          {/* Event Date and Location */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label
                className="text-slate-900 dark:text-white text-base font-medium leading-normal"
                htmlFor="event_date"
              >
                Fecha del Evento
              </label>
              <input
                type="datetime-local"
                id="event_date"
                name="event_date"
                value={formData.event_date}
                onChange={handleChange}
                required
                className="form-input flex w-full resize-none overflow-hidden rounded-lg text-slate-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary-admin border border-slate-300 dark:border-slate-700 bg-background-light dark:bg-[#1d1c27] h-14 placeholder:text-slate-400 dark:placeholder:text-slate-500 p-4 text-base font-normal leading-normal"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label
                className="text-slate-900 dark:text-white text-base font-medium leading-normal"
                htmlFor="location"
              >
                Ubicación
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="form-input flex w-full resize-none overflow-hidden rounded-lg text-slate-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary-admin border border-slate-300 dark:border-slate-700 bg-background-light dark:bg-[#1d1c27] h-14 placeholder:text-slate-400 dark:placeholder:text-slate-500 p-4 text-base font-normal leading-normal"
              />
            </div>
          </div>

          {/* Description */}
          <div className="flex flex-col gap-2">
            <label
              className="text-slate-900 dark:text-white text-base font-medium leading-normal"
              htmlFor="description"
            >
              Descripción
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="6"
              className="form-input flex w-full min-w-0 flex-1 resize-y overflow-hidden rounded-lg text-slate-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary-admin border border-slate-300 dark:border-slate-700 bg-background-light dark:bg-[#1d1c27] placeholder:text-slate-400 dark:placeholder:text-slate-500 p-4 text-base font-normal leading-normal"
            />
          </div>

          {/* Image URL */}
          <div className="flex flex-col gap-2">
            <label
              className="text-slate-900 dark:text-white text-base font-medium leading-normal"
              htmlFor="image_url"
            >
              URL de la Imagen
            </label>
            <input
              type="url"
              id="image_url"
              name="image_url"
              value={formData.image_url}
              onChange={handleChange}
              className="form-input flex w-full resize-none overflow-hidden rounded-lg text-slate-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary-admin border border-slate-300 dark:border-slate-700 bg-background-light dark:bg-[#1d1c27] h-14 placeholder:text-slate-400 dark:placeholder:text-slate-500 p-4 text-base font-normal leading-normal"
              placeholder="https://..."
            />
            {formData.image_url && (
              <div
                className="bg-center bg-no-repeat aspect-video bg-cover rounded-lg w-32 h-20 mt-2"
                style={{ backgroundImage: `url('${formData.image_url}')` }}
              />
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3 justify-between pt-4 border-t border-slate-300 dark:border-slate-700">
            <button
              type="button"
              onClick={handleDelete}
              className="flex items-center justify-center gap-2 h-10 px-4 text-sm font-medium rounded-lg text-red-600 hover:bg-red-500/10 transition-colors"
            >
              <span className="material-symbols-outlined">delete</span>
              Eliminar
            </button>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => router.push('/admin/events')}
                className="flex items-center justify-center h-10 px-4 text-sm font-medium rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex items-center justify-center gap-2 h-10 px-4 text-sm font-medium rounded-lg bg-primary-admin text-white hover:opacity-90 transition-colors disabled:opacity-50"
              >
                <span className="material-symbols-outlined">save</span>
                {loading ? 'Guardando...' : 'Actualizar Evento'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </AdminLayout>
  )
}

export async function getServerSideProps(context) {
  const authResult = checkAdminAuth(context)
  if (authResult) return authResult

  const { id } = context.params
  const { getSupabaseAdmin } = require('../../../lib/supabaseServer')
  const supabase = getSupabaseAdmin()

  const { data: event, error } = await supabase.from('events').select('*').eq('id', id).single()

  if (error || !event) {
    return {
      redirect: {
        destination: '/admin/events',
        permanent: false,
      },
    }
  }

  return {
    props: {
      event,
    },
  }
}
