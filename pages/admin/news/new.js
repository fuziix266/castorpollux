import { useState } from 'react'
import { useRouter } from 'next/router'
import AdminLayout from '../../../components/AdminLayout'
import { checkAdminAuth } from '../../../lib/adminAuth'

export default function NewNews() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    summary: '',
    image_url: '',
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
      const res = await fetch('/api/admin/news', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        router.push('/admin/news')
      } else {
        const error = await res.json()
        alert('Error al crear la noticia: ' + (error.error || 'Error desconocido'))
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Error al crear la noticia')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AdminLayout>
      <div className="mx-auto max-w-4xl">
        {/* Breadcrumbs */}
        <div className="flex flex-wrap gap-2 items-center">
          <a
            href="/admin"
            className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-normal hover:text-primary-admin dark:hover:text-primary-admin"
          >
            Admin
          </a>
          <span className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-normal">
            /
          </span>
          <a
            href="/admin/news"
            className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-normal hover:text-primary-admin dark:hover:text-primary-admin"
          >
            Noticias
          </a>
          <span className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-normal">
            /
          </span>
          <span className="text-slate-900 dark:text-white text-sm font-medium leading-normal">
            Nueva Noticia
          </span>
        </div>

        {/* Page Heading */}
        <div className="mt-4">
          <h1 className="text-slate-900 dark:text-white text-4xl font-black leading-tight tracking-[-0.033em]">
            Crear Nueva Noticia
          </h1>
        </div>

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-8">
          {/* Article Metadata Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* News Title */}
            <div className="flex flex-col gap-2 md:col-span-2">
              <label
                className="text-slate-900 dark:text-white text-base font-medium leading-normal"
                htmlFor="news-title"
              >
                Título de la Noticia
              </label>
              <input
                type="text"
                id="news-title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="form-input flex w-full resize-none overflow-hidden rounded-lg text-slate-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary-admin border border-slate-300 dark:border-slate-700 bg-background-light dark:bg-[#1d1c27] focus:border-primary-admin dark:focus:border-primary-admin h-14 placeholder:text-slate-400 dark:placeholder:text-slate-500 p-4 text-base font-normal leading-normal"
                placeholder="Título de la noticia..."
              />
            </div>

            {/* Summary */}
            <div className="flex flex-col gap-2 md:col-span-2">
              <label
                className="text-slate-900 dark:text-white text-base font-medium leading-normal"
                htmlFor="summary"
              >
                Resumen
              </label>
              <textarea
                id="summary"
                name="summary"
                value={formData.summary}
                onChange={handleChange}
                rows="3"
                className="form-input flex w-full min-w-0 flex-1 resize-y overflow-hidden rounded-lg text-slate-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary-admin border border-slate-300 dark:border-slate-700 bg-background-light dark:bg-[#1d1c27] focus:border-primary-admin dark:focus:border-primary-admin placeholder:text-slate-400 dark:placeholder:text-slate-500 p-4 text-base font-normal leading-normal"
                placeholder="Breve descripción de la noticia..."
              />
            </div>
          </div>

          {/* Featured Image */}
          <div className="flex flex-col gap-2">
            <p className="text-slate-900 dark:text-white text-base font-medium leading-normal">
              Imagen Destacada
            </p>
            <input
              type="url"
              name="image_url"
              value={formData.image_url}
              onChange={handleChange}
              className="form-input flex w-full resize-none overflow-hidden rounded-lg text-slate-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary-admin border border-slate-300 dark:border-slate-700 bg-background-light dark:bg-[#1d1c27] focus:border-primary-admin dark:focus:border-primary-admin h-14 placeholder:text-slate-400 dark:placeholder:text-slate-500 p-4 text-base font-normal leading-normal"
              placeholder="URL de la imagen"
            />
            {formData.image_url && (
              <div
                className="bg-center bg-no-repeat aspect-video bg-cover rounded-lg w-32 h-20 mt-2"
                style={{ backgroundImage: `url('${formData.image_url}')` }}
              />
            )}
          </div>

          {/* Rich Text Editor */}
          <div className="flex flex-col gap-2">
            <p className="text-slate-900 dark:text-white text-base font-medium leading-normal">
              Contenido del Artículo
            </p>
            <div className="border border-slate-300 dark:border-slate-700 rounded-lg overflow-hidden">
              <textarea
                name="content"
                value={formData.content}
                onChange={handleChange}
                required
                className="form-input flex w-full min-w-0 flex-1 resize-y overflow-hidden text-slate-900 dark:text-white focus:outline-0 focus:ring-0 border-0 bg-background-light dark:bg-[#1d1c27] placeholder:text-slate-400 dark:placeholder:text-slate-500 p-4 text-base font-normal leading-normal min-h-96"
                placeholder="Escribe el contenido de la noticia aquí..."
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 border-t border-slate-300 dark:border-slate-700">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="published"
                name="published"
                checked={formData.published}
                onChange={handleChange}
                className="form-checkbox h-5 w-5 rounded border-slate-300 dark:border-slate-700 bg-transparent text-primary-admin focus:ring-primary-admin/50"
              />
              <label htmlFor="published" className="text-slate-900 dark:text-white text-sm">
                Publicar inmediatamente
              </label>
            </div>
            <div className="flex gap-3 ml-auto">
              <button
                type="button"
                onClick={() => router.push('/admin/news')}
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
                {loading ? 'Guardando...' : 'Guardar Noticia'}
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

  return { props: {} }
}
