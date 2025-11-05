import Head from 'next/head'import { useEffect, useState } from 'react'

import Link from 'next/link'

import { useState } from 'react'export default function Gallery(){

  const [photos, setPhotos] = useState([])

export default function Gallery({ photos }) {  const [loading, setLoading] = useState(true)

  const [selectedPhoto, setSelectedPhoto] = useState(null)

  useEffect(()=>{ fetchPhotos() }, [])

  return (

    <>  async function fetchPhotos(){

      <Head>    setLoading(true)

        <title>Galería - Cástor & Póllux</title>    try{

        <html className="dark" />      const res = await fetch('/api/photos')

        <link rel="preconnect" href="https://fonts.googleapis.com" />      if(!res.ok) throw new Error('failed to load')

        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />      const json = await res.json()

        <link href="https://fonts.googleapis.com/css2?family=Exo+2:wght@300;400;500;700&family=Orbitron:wght@400;500;700;900&display=swap" rel="stylesheet" />      setPhotos(json.data || [])

      </Head>    }catch(e){

      console.error(e)

      <style jsx global>{`      setPhotos([])

        body {    }finally{ setLoading(false) }

          font-family: 'Exo 2', sans-serif;  }

        }

        .font-display {  return (

          font-family: 'Orbitron', sans-serif;    <div className="min-h-screen p-8">

        }      <header className="max-w-6xl mx-auto flex justify-between items-center mb-8">

        .text-glow {        <h1 className="text-3xl font-bold">Galería</h1>

          text-shadow: 0 0 8px rgba(212, 175, 55, 0.3), 0 0 16px rgba(212, 175, 55, 0.2);        <a href="/" className="text-sm text-gray-600">Inicio</a>

        }      </header>

      `}</style>      <main className="max-w-6xl mx-auto">

        {loading ? <p>Cargando...</p> : (

      <div className="relative min-h-screen w-full flex flex-col bg-[#010409] text-slate-300">          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

        {/* Background gradients */}            {photos.map(p=> (

        <div className="absolute inset-0 overflow-hidden pointer-events-none">              <figure key={p.id} className="bg-gray-100 rounded overflow-hidden">

          <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full bg-purple-500/10 blur-3xl"></div>                <img src={p.publicUrl || '/placeholder.png'} alt={p.caption || p.filename} className="w-full h-56 object-cover" />

          <div className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full bg-[#D4AF37]/8 blur-3xl"></div>                <figcaption className="p-2 text-sm text-gray-700">

        </div>                  <div className="font-medium">{p.caption || p.filename}</div>

                  <div className="text-xs text-gray-500">{p.photographer || p.source}</div>

        <div className="relative z-10 flex h-full grow flex-col px-4 sm:px-10 md:px-20 lg:px-24">                </figcaption>

          <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col">              </figure>

            {/* Header */}            ))}

            <header className="sticky top-5 z-50 flex items-center justify-between whitespace-nowrap rounded-full border border-solid border-slate-100/10 bg-black/30 px-6 py-3 backdrop-blur-xl">          </div>

              <Link href="/" className="flex items-center gap-3">        )}

                <div className="size-6 text-[#D4AF37]">      </main>

                  <svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">    </div>

                    <path d="M12 2.615l1.39 4.28h4.51l-3.65 2.65 1.39 4.28-3.64-2.65-3.65 2.65 1.4-4.28-3.65-2.65h4.51L12 2.615z M19.5 12.5l-1.4 4.28 3.65 2.65h-4.51l-1.4 4.28-1.4-4.28h-4.5l3.64-2.65-1.39-4.28 3.64 2.65 3.65-2.65z"></path>  )

                  </svg>}

                </div>
                <h2 className="text-slate-100 text-lg font-bold leading-tight font-display tracking-wider">CÁSTOR & PÓLLUX</h2>
              </Link>
              <div className="hidden md:flex flex-1 items-center justify-end gap-8">
                <nav className="flex items-center gap-9">
                  <Link href="/" className="text-slate-300 text-sm font-medium hover:text-[#D4AF37] transition-colors">Inicio</Link>
                  <Link href="/blog" className="text-slate-300 text-sm font-medium hover:text-[#D4AF37] transition-colors">Blog</Link>
                  <Link href="/gallery" className="text-[#D4AF37] text-sm font-bold">Galería</Link>
                  <Link href="/about" className="text-slate-300 text-sm font-medium hover:text-[#D4AF37] transition-colors">Nosotros</Link>
                </nav>
              </div>
            </header>

            <main className="flex-1 mt-16">
              {/* Hero */}
              <div className="text-center mb-16">
                <h1 className="text-white text-5xl md:text-6xl font-bold leading-tight font-display mb-6 text-glow">
                  Galería Astronómica
                </h1>
                <p className="text-slate-400 text-xl max-w-3xl mx-auto">
                  Descubre las maravillas del cosmos capturadas por nuestros miembros
                </p>
              </div>

              {/* Gallery Grid */}
              {photos && photos.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
                  {photos.map((photo) => (
                    <div 
                      key={photo.id} 
                      className="group cursor-pointer bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 overflow-hidden hover:border-[#D4AF37]/50 transition-all duration-300"
                      onClick={() => setSelectedPhoto(photo)}
                    >
                      <div className="aspect-square bg-cover bg-center relative overflow-hidden" style={{backgroundImage: `url("${photo.publicUrl || 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&q=80'}")`}}>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                          <div>
                            <h3 className="text-white font-bold font-display text-lg mb-1">{photo.caption || photo.filename}</h3>
                            {photo.photographer && <p className="text-slate-300 text-sm">{photo.photographer}</p>}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <div className="text-6xl mb-4">📸</div>
                  <p className="text-slate-400 text-lg">No hay fotos disponibles en este momento</p>
                </div>
              )}
            </main>

            {/* Footer */}
            <footer className="mt-24 border-t border-white/10 pt-12 pb-8">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-8">
                <div className="flex items-center gap-4">
                  <div className="size-6 text-[#D4AF37]">
                    <svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2.615l1.39 4.28h4.51l-3.65 2.65 1.39 4.28-3.64-2.65-3.65 2.65 1.4-4.28-3.65-2.65h4.51L12 2.615z M19.5 12.5l-1.4 4.28 3.65 2.65h-4.51l-1.4 4.28-1.4-4.28h-4.5l3.64-2.65-1.39-4.28 3.64 2.65 3.65-2.65z"></path>
                    </svg>
                  </div>
                  <h2 className="text-slate-100 text-lg font-bold font-display tracking-wider">CÁSTOR & PÓLLUX</h2>
                </div>
                <div className="flex items-center gap-6 text-slate-400 text-sm">
                  <Link href="/blog" className="hover:text-[#D4AF37] transition-colors">Blog</Link>
                  <Link href="/gallery" className="hover:text-[#D4AF37] transition-colors">Galería</Link>
                  <Link href="/about" className="hover:text-[#D4AF37] transition-colors">Nosotros</Link>
                </div>
              </div>
              <p className="text-center text-xs text-slate-500 mt-12">© 2024 Cástor & Póllux. Observación de estrellas en Arica, Chile.</p>
            </footer>
          </div>
        </div>

        {/* Lightbox Modal */}
        {selectedPhoto && (
          <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4" onClick={() => setSelectedPhoto(null)}>
            <div className="relative max-w-5xl w-full">
              <button 
                className="absolute top-4 right-4 text-white hover:text-[#D4AF37] text-4xl font-bold z-10"
                onClick={() => setSelectedPhoto(null)}
              >
                ×
              </button>
              <img 
                src={selectedPhoto.publicUrl} 
                alt={selectedPhoto.caption || selectedPhoto.filename}
                className="w-full h-auto rounded-lg"
              />
              <div className="mt-4 text-center">
                <h3 className="text-white font-bold font-display text-2xl mb-2">{selectedPhoto.caption || selectedPhoto.filename}</h3>
                {selectedPhoto.photographer && <p className="text-slate-400">Fotografía: {selectedPhoto.photographer}</p>}
                {selectedPhoto.source && <p className="text-slate-500 text-sm mt-1">{selectedPhoto.source}</p>}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export async function getServerSideProps() {
  const { getSupabaseAdmin } = require('../lib/supabaseServer')
  const supabase = getSupabaseAdmin()

  const { data: photos } = await supabase
    .from('photos')
    .select('*')
    .order('uploaded_at', { ascending: false })

  return {
    props: {
      photos: photos || [],
    },
  }
}
