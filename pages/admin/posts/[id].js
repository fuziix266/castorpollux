import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import AdminLayout from '../../../components/AdminLayout'
import { checkAdminAuth } from '../../../lib/adminAuth'

export default function EditPost({ post }) {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: post.title || '',
    content: post.content || '',
    summary: post.summary || '',
    featured_image_url: post.featured_image_url || '',
    tags: post.tags ? post.tags.join(', ') : '',
    published: post.published || false,
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const tagsArray = formData.tags
        .split(',')
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0)

      const res = await fetch(`/api/admin/posts?id=${post.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          tags: tagsArray,
        }),
      })

      if (res.ok) {
        router.push('/admin/posts')
      } else {
        const error = await res.json()
        alert('Error al actualizar el post: ' + (error.error || 'Error desconocido'))
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Error al actualizar el post')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm('¿Estás seguro de que quieres eliminar este post?')) return

    try {
      const res = await fetch(`/api/admin/posts?id=${post.id}`, {
        method: 'DELETE',
      })

      if (res.ok) {
        router.push('/admin/posts')
      } else {
        alert('Error al eliminar el post')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Error al eliminar el post')
    }
  }

  return (
    <AdminLayout>
      <div className="mx-auto max-w-7xl">
        {/* Breadcrumbs */}
        <div className="flex flex-wrap gap-2 items-center mb-4">
          <a
            href="/admin"
            className="text-[#a19db9] text-sm font-medium leading-normal hover:text-white"
          >
            Panel Admin
          </a>
          <span className="text-[#a19db9] text-sm font-medium leading-normal">/</span>
          <a
            href="/admin/posts"
            className="text-[#a19db9] text-sm font-medium leading-normal hover:text-white"
          >
            Posts
          </a>
          <span className="text-[#a19db9] text-sm font-medium leading-normal">/</span>
          <span className="text-white text-sm font-medium leading-normal">Editar Post</span>
        </div>

        {/* Page Heading */}
        <div className="flex flex-wrap justify-between items-center gap-4 mt-4">
          <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em]">
            Editar Post
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left/Center Column */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* Title Field */}
            <div className="flex flex-col">
              <label className="flex flex-col w-full">
                <p className="text-white text-base font-medium leading-normal pb-2">
                  Título del Post
                </p>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-0 border border-[#3f3b54] bg-[#1d1c27] focus:border-primary-admin h-14 placeholder:text-[#a19db9] p-[15px] text-base font-normal leading-normal"
                />
              </label>
            </div>

            {/* Summary Field */}
            <div className="flex flex-col">
              <label className="flex flex-col w-full">
                <p className="text-white text-base font-medium leading-normal pb-2">Resumen</p>
                <textarea
                  name="summary"
                  value={formData.summary}
                  onChange={handleChange}
                  rows="3"
                  className="form-input flex w-full min-w-0 flex-1 resize-y overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-0 border border-[#3f3b54] bg-[#1d1c27] focus:border-primary-admin placeholder:text-[#a19db9] p-[15px] text-base font-normal leading-normal"
                />
              </label>
            </div>

            {/* Content Editor */}
            <div className="flex flex-col">
              <p className="text-white text-base font-medium leading-normal pb-2">
                Contenido del Post
              </p>
              <div className="flex w-full flex-1 items-stretch rounded-lg flex-col border border-[#3f3b54]">
                <div className="flex flex-1 flex-col">
                  <textarea
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                    required
                    className="form-input flex w-full min-w-0 flex-1 resize-y overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-0 border-0 bg-[#1d1c27] focus:border-primary-admin min-h-96 placeholder:text-[#5a5577] p-[15px] text-base font-normal leading-normal"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1 flex flex-col gap-6">
            {/* Publishing Actions Panel */}
            <div className="bg-[#1d1c27] border border-[#3f3b54] rounded-lg p-4 flex flex-col gap-4">
              <h3 className="text-white text-lg font-bold">Publicar</h3>

              <div className="flex justify-between items-center text-sm">
                <span className="text-[#a19db9]">
                  Estado:{' '}
                  <strong className="text-white">
                    {formData.published ? 'Publicado' : 'Borrador'}
                  </strong>
                </span>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="published"
                  name="published"
                  checked={formData.published}
                  onChange={handleChange}
                  className="form-checkbox bg-[#3f3b54] border-[#5a5577] text-primary-admin rounded focus:ring-primary-admin"
                />
                <label htmlFor="published" className="text-white text-sm">
                  Publicado
                </label>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => router.push('/admin/posts')}
                  className="flex-1 min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-white/10 text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-white/20"
                >
                  <span className="truncate">Cancelar</span>
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary-admin text-white text-sm font-bold leading-normal tracking-[0.015em] hover:opacity-90 disabled:opacity-50"
                >
                  <span className="truncate">
                    {loading ? 'Guardando...' : 'Actualizar Post'}
                  </span>
                </button>
              </div>

              <div className="border-t border-[#3f3b54] pt-4 mt-2">
                <button
                  type="button"
                  onClick={handleDelete}
                  className="text-sm text-red-500 hover:text-red-400 font-medium"
                >
                  Eliminar Post
                </button>
              </div>
            </div>

            {/* Tags Panel */}
            <div className="bg-[#1d1c27] border border-[#3f3b54] rounded-lg p-4 flex flex-col gap-3">
              <h3 className="text-white text-lg font-bold">Tags</h3>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                className="form-input w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-0 border border-[#3f3b54] bg-[#1d1c27] focus:border-primary-admin h-10 placeholder:text-[#a19db9] px-3 py-2 text-sm font-normal leading-normal"
                placeholder="Tags separados por comas"
              />
              <p className="text-xs text-gray-400">Ejemplo: astronomía, eventos, observación</p>
            </div>

            {/* Featured Image Panel */}
            <div className="bg-[#1d1c27] border border-[#3f3b54] rounded-lg p-4 flex flex-col gap-3">
              <h3 className="text-white text-lg font-bold">Imagen Destacada</h3>
              <input
                type="url"
                name="featured_image_url"
                value={formData.featured_image_url}
                onChange={handleChange}
                className="form-input w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-0 border border-[#3f3b54] bg-[#1d1c27] focus:border-primary-admin h-10 placeholder:text-[#a19db9] px-3 py-2 text-sm font-normal leading-normal"
                placeholder="URL de la imagen"
              />
              {formData.featured_image_url && (
                <div
                  className="aspect-video w-full bg-cover bg-center rounded"
                  style={{ backgroundImage: `url('${formData.featured_image_url}')` }}
                />
              )}
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

  const { data: post, error } = await supabase
    .from('posts')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !post) {
    return {
      redirect: {
        destination: '/admin/posts',
        permanent: false,
      },
    }
  }

  return {
    props: {
      post,
    },
  }
}
