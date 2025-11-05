import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import AdminLayout from '../../../components/AdminLayout'
import { checkAdminAuth } from '../../../lib/adminAuth'

export default function ManageEvents({ events }) {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')

  const handleDelete = async (id) => {
    if (!confirm('¿Estás seguro de que quieres eliminar este evento?')) return

    try {
      const res = await fetch(`/api/admin/events?id=${id}`, {
        method: 'DELETE',
      })

      if (res.ok) {
        router.reload()
      } else {
        alert('Error al eliminar el evento')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Error al eliminar el evento')
    }
  }

  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <AdminLayout>
      <div className="mx-auto max-w-7xl">
        {/* Page Heading */}
        <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
          <div className="flex flex-col gap-2">
            <h1 className="text-gray-900 dark:text-white text-3xl lg:text-4xl font-black leading-tight tracking-[-0.033em]">
              Gestionar Eventos
            </h1>
            <p className="text-gray-500 dark:text-[#a19db9] text-base font-normal leading-normal">
              Edita, elimina y crea nuevos eventos astronómicos.
            </p>
          </div>
          <Link
            href="/admin/events/new"
            className="flex items-center justify-center gap-2 overflow-hidden rounded-lg h-10 px-4 bg-primary-admin text-white text-sm font-bold leading-normal tracking-[0.015em] hover:opacity-90 transition-colors"
          >
            <span className="material-symbols-outlined">add</span>
            <span className="truncate">Agregar Evento</span>
          </Link>
        </div>

        {/* Search Bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-grow">
            <label className="flex flex-col h-12 w-full">
              <div className="flex w-full flex-1 items-stretch rounded-lg h-full bg-white dark:bg-[#2b2839]">
                <div className="text-gray-400 dark:text-[#a19db9] flex items-center justify-center pl-4">
                  <span className="material-symbols-outlined">search</span>
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden text-gray-900 dark:text-white focus:outline-0 focus:ring-0 border-none bg-transparent h-full placeholder:text-gray-400 dark:placeholder:text-[#a19db9] px-4 pl-2 text-base font-normal leading-normal"
                  placeholder="Buscar eventos..."
                />
              </div>
            </label>
          </div>
        </div>

        {/* Events Table */}
        <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-[#3f3b54] bg-white dark:bg-[#1d1c27]">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50 dark:bg-transparent">
                <tr className="border-b border-gray-200 dark:border-[#3f3b54]">
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-[#a19db9] uppercase tracking-wider w-4/12">
                    Título
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-[#a19db9] uppercase tracking-wider w-2/12">
                    Fecha del Evento
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-[#a19db9] uppercase tracking-wider w-2/12">
                    Ubicación
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-[#a19db9] uppercase tracking-wider w-2/12">
                    Estado
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-[#a19db9] uppercase tracking-wider w-2/12">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-[#3f3b54]">
                {filteredEvents.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                      No se encontraron eventos
                    </td>
                  </tr>
                ) : (
                  filteredEvents.map((event) => {
                    const eventDate = new Date(event.event_date)
                    const isUpcoming = eventDate >= new Date()

                    return (
                      <tr
                        key={event.id}
                        className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {event.title}
                          </div>
                          {event.description && (
                            <div className="text-sm text-gray-500 dark:text-[#a19db9] mt-1">
                              {event.description.substring(0, 60)}
                              {event.description.length > 60 ? '...' : ''}
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-[#a19db9]">
                          {eventDate.toLocaleDateString('es-ES', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-[#a19db9]">
                          {event.location || 'N/A'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {isUpcoming ? (
                            <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-500/20 text-blue-800 dark:text-blue-300">
                              <span className="size-2 rounded-full bg-blue-500"></span>
                              Próximo
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-500/20 text-gray-800 dark:text-gray-300">
                              <span className="size-2 rounded-full bg-gray-500"></span>
                              Pasado
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center gap-4">
                            <Link
                              href={`/admin/events/${event.id}`}
                              className="text-primary-admin hover:opacity-80 flex items-center gap-1"
                            >
                              <span className="material-symbols-outlined text-base">edit</span>
                              Editar
                            </Link>
                            <button
                              onClick={() => handleDelete(event.id)}
                              className="text-red-500 hover:text-red-400 flex items-center gap-1"
                            >
                              <span className="material-symbols-outlined text-base">delete</span>
                              Eliminar
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between pt-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Total de eventos: {filteredEvents.length}
          </p>
        </div>
      </div>
    </AdminLayout>
  )
}

export async function getServerSideProps(context) {
  const authResult = checkAdminAuth(context)
  if (authResult) return authResult

  const { getSupabaseAdmin } = require('../../../lib/supabaseServer')
  const supabase = getSupabaseAdmin()

  const { data: events, error } = await supabase
    .from('events')
    .select('id, title, description, event_date, location')
    .order('event_date', { ascending: false })

  if (error) {
    console.error('Error fetching events:', error)
    return { props: { events: [] } }
  }

  return {
    props: {
      events: events || [],
    },
  }
}
