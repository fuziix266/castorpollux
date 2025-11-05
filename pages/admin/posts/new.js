import { useState } from 'react'
import { useRouter } from 'next/router'
import AdminLayout from '../../../components/AdminLayout'
import { checkAdminAuth } from '../../../lib/adminAuth'

export default function NewPost() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    summary: '',
    featured_image_url: '',
    tags: '',
    published: false,
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

      const res = await fetch('/api/admin/posts', {
        method: 'POST',
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
        alert('Error al crear el post: ' + (error.error || 'Error desconocido'))
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Error al crear el post')
    } finally {
      setLoading(false)
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
          <span className="text-white text-sm font-medium leading-normal">Nuevo Post</span>
        </div>

        {/* Page Heading */}
        <div className="flex flex-wrap justify-between items-center gap-4 mt-4">
          <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em]">
            Crear Nuevo Post
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
                  placeholder="Título del post..."
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
                  placeholder="Breve descripción del post..."
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
                    placeholder="Escribe el contenido de tu post aquí..."
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
                  Publicar inmediatamente
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
                  <span className="truncate">{loading ? 'Guardando...' : 'Crear Post'}</span>
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

  return { props: {} }
}
