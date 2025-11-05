import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import AdminLayout from '../../../components/AdminLayout'
import { checkAdminAuth } from '../../../lib/adminAuth'

export default function ManageNews({ news }) {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')

  const handleDelete = async (id) => {
    if (!confirm('¿Estás seguro de que quieres eliminar esta noticia?')) return

    try {
      const res = await fetch(`/api/admin/news?id=${id}`, {
        method: 'DELETE',
      })

      if (res.ok) {
        router.reload()
      } else {
        alert('Error al eliminar la noticia')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Error al eliminar la noticia')
    }
  }

  const filteredNews = news.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <AdminLayout>
      <div className="mx-auto max-w-7xl">
        {/* Page Heading */}
        <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
          <div className="flex flex-col gap-2">
            <h1 className="text-gray-900 dark:text-white text-3xl lg:text-4xl font-black leading-tight tracking-[-0.033em]">
              Gestionar Noticias
            </h1>
            <p className="text-gray-500 dark:text-[#a19db9] text-base font-normal leading-normal">
              Edita, elimina y crea nuevas noticias para el sitio web.
            </p>
          </div>
          <Link
            href="/admin/news/new"
            className="flex items-center justify-center gap-2 overflow-hidden rounded-lg h-10 px-4 bg-primary-admin text-white text-sm font-bold leading-normal tracking-[0.015em] hover:opacity-90 transition-colors"
          >
            <span className="material-symbols-outlined">add</span>
            <span className="truncate">Agregar Noticia</span>
          </Link>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          {/* SearchBar */}
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
                  placeholder="Buscar por título o contenido..."
                />
              </div>
            </label>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-[#3f3b54] bg-white dark:bg-[#1d1c27]">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50 dark:bg-transparent">
                <tr className="border-b border-gray-200 dark:border-[#3f3b54]">
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-[#a19db9] uppercase tracking-wider w-5/12">
                    Título
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-[#a19db9] uppercase tracking-wider w-2/12">
                    Estado
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-[#a19db9] uppercase tracking-wider w-2/12">
                    Fecha de Publicación
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-[#a19db9] uppercase tracking-wider w-2/12">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-[#3f3b54]">
                {filteredNews.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                      No se encontraron noticias
                    </td>
                  </tr>
                ) : (
                  filteredNews.map((item) => (
                    <tr
                      key={item.id}
                      className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {item.title}
                        </div>
                        {item.summary && (
                          <div className="text-sm text-gray-500 dark:text-[#a19db9] mt-1">
                            {item.summary.substring(0, 100)}
                            {item.summary.length > 100 ? '...' : ''}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {item.published ? (
                          <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium bg-green-100 dark:bg-green-500/20 text-green-800 dark:text-green-300">
                            <span className="size-2 rounded-full bg-green-500"></span>
                            Publicado
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-500/20 text-gray-800 dark:text-gray-300">
                            <span className="size-2 rounded-full bg-gray-500"></span>
                            Borrador
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-[#a19db9]">
                        {new Date(item.published_at || item.created_at).toLocaleDateString(
                          'es-ES',
                          {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          }
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center gap-4">
                          <Link
                            href={`/admin/news/${item.id}`}
                            className="text-primary-admin hover:opacity-80 flex items-center gap-1"
                          >
                            <span className="material-symbols-outlined text-base">edit</span>
                            Editar
                          </Link>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="text-red-500 hover:text-red-400 flex items-center gap-1"
                          >
                            <span className="material-symbols-outlined text-base">delete</span>
                            Eliminar
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between pt-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Total de noticias: {filteredNews.length}
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

  const { data: news, error } = await supabase
    .from('news')
    .select('id, title, summary, published, published_at, created_at')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching news:', error)
    return { props: { news: [] } }
  }

  return {
    props: {
      news: news || [],
    },
  }
}
