import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import { getSupabaseAdmin } from '../lib/supabaseServer'

export default function Gallery({ photos }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedPhoto, setSelectedPhoto] = useState(null)

  const filteredPhotos = photos.filter(photo =>
    photo.caption?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    photo.photographer?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <>
      <Head>
        <title>Galería - Cástor & Póllux</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Exo+2:wght@300;400;500;700&family=Orbitron:wght@400;500;700;900&display=swap" rel="stylesheet" />
      </Head>

      <style jsx global>{`
        body {
          font-family: 'Exo 2', sans-serif;
        }
        .font-display {
          font-family: 'Orbitron', sans-serif;
        }
        .text-glow {
          text-shadow: 0 0 8px rgba(212, 175, 55, 0.3), 0 0 16px rgba(212, 175, 55, 0.2);
        }
      `}</style>

      <div className="relative min-h-screen w-full flex flex-col bg-[#010409] text-slate-300">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full bg-purple-500/10 blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full bg-[#D4AF37]/8 blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex h-full grow flex-col px-4 sm:px-10 md:px-20 lg:px-24">
          <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col">
            <header className="sticky top-5 z-50 flex items-center justify-between whitespace-nowrap rounded-full border border-solid border-slate-100/10 bg-black/30 px-6 py-3 backdrop-blur-xl mb-8">
              <Link href="/" className="flex items-center gap-3">
                <div className="size-6 text-[#D4AF37]">
                  <svg fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.615l1.39 4.28h4.51l-3.65 2.65 1.39 4.28-3.64-2.65-3.65 2.65 1.4-4.28-3.65-2.65h4.51L12 2.615z M19.5 12.5l-1.4 4.28 3.65 2.65h-4.51l-1.4 4.28-1.4-4.28h-4.5l3.64-2.65-1.39-4.28 3.64 2.65 3.65-2.65z"></path>
                  </svg>
                </div>
                <h2 className="text-slate-100 text-lg font-bold font-display tracking-wider">CÁSTOR & PÓLLUX</h2>
              </Link>
              <div className="hidden md:flex items-center gap-8">
                <Link href="/" className="text-slate-300 text-sm hover:text-[#D4AF37]">Inicio</Link>
                <Link href="/blog" className="text-slate-300 text-sm hover:text-[#D4AF37]">Blog</Link>
                <Link href="/gallery" className="text-[#D4AF37] text-sm font-bold">Galería</Link>
                <Link href="/about" className="text-slate-300 text-sm hover:text-[#D4AF37]">Nosotros</Link>
              </div>
            </header>

            <main className="flex-1 py-8">
              <div className="text-center mb-10">
                <h1 className="text-5xl md:text-6xl font-black font-display text-white text-glow mb-4">Galería Astrofotográfica</h1>
                <p className="text-slate-300 text-lg max-w-3xl mx-auto">Exhibiendo la belleza del cosmos capturada por astrónomos de Arica y más allá.</p>
              </div>

              <div className="mb-10">
                <div className="flex items-center gap-3 rounded-lg bg-white/5 border border-[#D4AF37]/20 px-4 py-3">
                  <svg className="size-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Buscar por palabra clave, nebulosa, galaxia..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-1 bg-transparent text-white placeholder-slate-400 outline-none"
                  />
                </div>
              </div>

              <div className="mb-6">
                <p className="text-slate-400 text-sm">Mostrando {filteredPhotos.length} de {photos.length} imágenes</p>
              </div>

              {filteredPhotos.length === 0 ? (
                <div className="text-center py-20">
                  <div className="text-6xl mb-4"></div>
                  <p className="text-slate-400 text-lg">No se encontraron imágenes</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                  {filteredPhotos.map((photo, idx) => (
                    <div
                      key={idx}
                      onClick={() => setSelectedPhoto(photo)}
                      className="group relative aspect-square rounded-xl overflow-hidden bg-white/5 border border-[#D4AF37]/20 cursor-pointer hover:border-[#D4AF37]/60 transition-all duration-300"
                    >
                      {photo.publicUrl ? (
                        <img
                          src={photo.publicUrl}
                          alt={photo.caption || 'Astrofoto'}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-6xl">
                          
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <p className="text-white font-bold font-display text-sm mb-1">{photo.caption || 'Sin título'}</p>
                          {photo.photographer && (
                            <p className="text-slate-300 text-xs">Por {photo.photographer}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </main>

            <footer className="border-t border-slate-100/10 py-8 text-center">
              <p className="text-slate-400 text-sm"> 2025 Cástor & Póllux - Astronomía en Arica</p>
            </footer>
          </div>
        </div>

        {selectedPhoto && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
            onClick={() => setSelectedPhoto(null)}
          >
            <div className="relative max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute -top-12 right-0 text-white hover:text-[#D4AF37] transition-colors"
              >
                <svg className="size-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              <div className="bg-[#010409] rounded-xl border border-[#D4AF37]/40 overflow-hidden">
                {selectedPhoto.publicUrl ? (
                  <img
                    src={selectedPhoto.publicUrl}
                    alt={selectedPhoto.caption || 'Astrofoto'}
                    className="w-full max-h-[70vh] object-contain"
                  />
                ) : (
                  <div className="w-full h-96 flex items-center justify-center text-8xl">
                    
                  </div>
                )}
                <div className="p-6 bg-gradient-to-b from-transparent to-black/50">
                  <h3 className="text-white text-2xl font-bold font-display mb-2">{selectedPhoto.caption || 'Sin título'}</h3>
                  {selectedPhoto.photographer && (
                    <p className="text-[#D4AF37] text-sm mb-3">Fotografía por {selectedPhoto.photographer}</p>
                  )}
                  {selectedPhoto.filename && (
                    <p className="text-slate-400 text-xs">Archivo: {selectedPhoto.filename}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export async function getServerSideProps() {
  const supabase = getSupabaseAdmin()
  
  let photos = []
  try {
    const { data, error } = await supabase
      .from('photos')
      .select('*')
      .order('uploaded_at', { ascending: false })
      .limit(50)
    
    if (!error && data) {
      photos = data.map(photo => {
        let publicUrl = null
        if (photo.storage_path) {
          const { data: urlData } = supabase.storage.from('photos').getPublicUrl(photo.storage_path)
          publicUrl = urlData?.publicUrl || null
        }
        return {
          ...photo,
          publicUrl
        }
      })
    }
  } catch (error) {
    console.error('Error:', error)
  }

  return {
    props: {
      photos
    }
  }
}
