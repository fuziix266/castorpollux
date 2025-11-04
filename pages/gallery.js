import { useEffect, useState } from 'react'

export default function Gallery(){
  const [photos, setPhotos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(()=>{ fetchPhotos() }, [])

  async function fetchPhotos(){
    setLoading(true)
    try{
      const res = await fetch('/api/photos')
      if(!res.ok) throw new Error('failed to load')
      const json = await res.json()
      setPhotos(json.data || [])
    }catch(e){
      console.error(e)
      setPhotos([])
    }finally{ setLoading(false) }
  }

  return (
    <div className="min-h-screen p-8">
      <header className="max-w-6xl mx-auto flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Galería</h1>
        <a href="/" className="text-sm text-gray-600">Inicio</a>
      </header>
      <main className="max-w-6xl mx-auto">
        {loading ? <p>Cargando...</p> : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {photos.map(p=> (
              <figure key={p.id} className="bg-gray-100 rounded overflow-hidden">
                <img src={p.publicUrl || '/placeholder.png'} alt={p.caption || p.filename} className="w-full h-56 object-cover" />
                <figcaption className="p-2 text-sm text-gray-700">
                  <div className="font-medium">{p.caption || p.filename}</div>
                  <div className="text-xs text-gray-500">{p.photographer || p.source}</div>
                </figcaption>
              </figure>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
