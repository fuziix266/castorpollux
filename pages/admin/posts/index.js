import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import AdminLayout from '../../../components/AdminLayout'
import { checkAdminAuth } from '../../../lib/adminAuth'

export default function ManagePosts({ posts }) {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')

  const handleDelete = async (id) => {
    if (!confirm('¿Estás seguro de que quieres eliminar este post?')) return

    try {
      const res = await fetch(`/api/admin/posts?id=${id}`, {
        method: 'DELETE',
      })

      if (res.ok) {
        router.reload()
      } else {
        alert('Error al eliminar el post')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Error al eliminar el post')
    }
  }

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <AdminLayout>
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
        {/* Page Heading */}
        <header className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-gray-900 dark:text-white text-4xl font-black leading-tight tracking-[-0.033em]">
            Gestionar Posts
          </h1>
          <Link
            href="/admin/posts/new"
            className="flex min-w-[84px] cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg h-10 px-4 bg-primary-admin text-white text-sm font-bold leading-normal tracking-wide hover:opacity-90"
          >
            <span className="material-symbols-outlined text-base">add_circle</span>
            <span className="truncate">Crear Post</span>
          </Link>
        </header>

        {/* Toolbar and Filters */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          {/* SearchBar */}
          <div className="flex-1">
            <label className="flex flex-col min-w-40 h-12 w-full">
              <div className="flex w-full flex-1 items-stretch rounded-lg h-full bg-gray-100 dark:bg-white/5">
                <div className="text-gray-400 dark:text-gray-500 flex items-center justify-center pl-4">
                  <span className="material-symbols-outlined">search</span>
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-r-lg text-gray-900 dark:text-white focus:outline-0 focus:ring-0 border-none bg-transparent placeholder:text-gray-500 dark:placeholder:text-gray-500 px-4 pl-2 text-base font-normal leading-normal"
                  placeholder="Buscar posts por título..."
                />
              </div>
            </label>
          </div>
        </div>

        {/* Post List Table */}
        <div className="w-full overflow-hidden rounded-xl border border-gray-200/10 bg-white/20 dark:bg-white/5">
          <div className="overflow-x-auto">
            <table className="w-full min-w-max text-left">
              <thead className="border-b border-gray-200/10">
                <tr>
                  <th className="p-4 text-sm font-bold uppercase text-gray-500 dark:text-gray-400">
                    Título
                  </th>
                  <th className="p-4 text-sm font-bold uppercase text-gray-500 dark:text-gray-400">
                    Fecha
                  </th>
                  <th className="p-4 text-sm font-bold uppercase text-gray-500 dark:text-gray-400">
                    Estado
                  </th>
                  <th className="p-4 text-sm font-bold uppercase text-gray-500 dark:text-gray-400 text-right">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredPosts.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="p-8 text-center text-gray-500 dark:text-gray-400">
                      No se encontraron posts
                    </td>
                  </tr>
                ) : (
                  filteredPosts.map((post) => (
                    <tr
                      key={post.id}
                      className="border-b border-gray-200/10 hover:bg-gray-100 dark:hover:bg-white/5"
                    >
                      <td className="p-4 font-medium text-gray-900 dark:text-white">
                        {post.title}
                      </td>
                      <td className="p-4 text-gray-500 dark:text-gray-400">
                        {new Date(post.created_at).toLocaleDateString('es-ES', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </td>
                      <td className="p-4">
                        {post.published ? (
                          <span className="inline-flex items-center rounded-full bg-green-500/10 px-3 py-1 text-xs font-semibold text-green-400">
                            <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-green-500"></span>
                            Publicado
                          </span>
                        ) : (
                          <span className="inline-flex items-center rounded-full bg-gray-500/10 px-3 py-1 text-xs font-semibold text-gray-400">
                            <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-gray-500"></span>
                            Borrador
                          </span>
                        )}
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex justify-end gap-2">
                          <Link
                            href={`/admin/posts/${post.id}`}
                            className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-white/10 text-gray-500 dark:text-gray-400"
                          >
                            <span className="material-symbols-outlined text-lg">edit</span>
                          </Link>
                          <button
                            onClick={() => handleDelete(post.id)}
                            className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-white/10 text-gray-500 dark:text-gray-400"
                          >
                            <span className="material-symbols-outlined text-lg">delete</span>
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
            Total de posts: {filteredPosts.length}
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

  const { data: posts, error } = await supabase
    .from('posts')
    .select('id, title, created_at, published')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching posts:', error)
    return { props: { posts: [] } }
  }

  return {
    props: {
      posts: posts || [],
    },
  }
}
