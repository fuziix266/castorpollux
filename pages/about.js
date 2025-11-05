import Head from 'next/head'
import Link from 'next/link'
import { getSupabaseAdmin } from '../lib/supabaseServer'

export default function About({ memberCount }) {
  return (
    <>
      <Head>
        <title>Nosotros - Cástor & Póllux</title>
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
                <Link href="/gallery" className="text-slate-300 text-sm hover:text-[#D4AF37]">Galería</Link>
                <Link href="/about" className="text-[#D4AF37] text-sm font-bold">Nosotros</Link>
              </div>
            </header>

            <main className="flex-1 py-8">
              <section className="mb-16">
                <div className="flex min-h-[400px] flex-col items-center justify-center gap-6 rounded-xl bg-cover bg-center bg-no-repeat p-8 text-center" style={{backgroundImage: "linear-gradient(rgba(1, 4, 9, 0.7) 0%, rgba(1, 4, 9, 0.9) 100%), url('https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=1200')"}}>
                  <div className="flex flex-col gap-4">
                    <h1 className="text-white text-5xl md:text-6xl font-black font-display text-glow">Conectando Observadores del Cielo de Arica</h1>
                    <p className="text-slate-200 text-lg md:text-xl max-w-3xl mx-auto">Uniendo la pasión por el cosmos con los diversos intereses de nuestra vibrante comunidad local.</p>
                  </div>
                </div>
              </section>

              <section className="mb-16">
                <div className="flex flex-col gap-6">
                  <h2 className="text-white text-4xl font-bold font-display text-glow mb-4">Nuestra Misión & Visión</h2>
                  <p className="text-slate-300 text-lg max-w-4xl">Estamos dedicados a construir una comunidad vibrante donde las maravillas de la astronomía encuentran la alegría de pasiones compartidas.</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                  <div className="flex flex-col gap-4 rounded-xl border border-[#D4AF37]/20 bg-white/5 p-8">
                    <div className="text-[#D4AF37] text-4xl"></div>
                    <div className="flex flex-col gap-2">
                      <h3 className="text-white text-2xl font-bold font-display">Nuestra Misión</h3>
                      <p className="text-slate-300">Crear un espacio digital acogedor para que los astrónomos de Arica se conecten.</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-4 rounded-xl border border-[#D4AF37]/20 bg-white/5 p-8">
                    <div className="text-[#D4AF37] text-4xl"></div>
                    <div className="flex flex-col gap-2">
                      <h3 className="text-white text-2xl font-bold font-display">Nuestra Visión</h3>
                      <p className="text-slate-300">Convertirnos en el hub central para la comunidad astronómica de Arica.</p>
                    </div>
                  </div>
                </div>
              </section>

              <section className="mb-16">
                <div className="text-center mb-10">
                  <h2 className="text-white text-4xl font-bold font-display text-glow mb-4">Conoce a la Comunidad</h2>
                  <p className="text-slate-300 text-lg max-w-2xl mx-auto">Las estrellas detrás de Cástor & Póllux</p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  <div className="flex flex-col items-center gap-4 rounded-xl border border-[#D4AF37]/20 bg-white/5 p-8 text-center">
                    <div className="h-32 w-32 rounded-full bg-gradient-to-br from-[#D4AF37]/30 to-purple-500/30 flex items-center justify-center text-5xl">
                      
                    </div>
                    <div className="flex flex-col gap-2">
                      <h3 className="font-bold text-white text-xl font-display">Equipo Cástor</h3>
                      <p className="text-sm text-[#D4AF37]">Astrofotógrafos</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-center gap-4 rounded-xl border border-[#D4AF37]/20 bg-white/5 p-8 text-center">
                    <div className="h-32 w-32 rounded-full bg-gradient-to-br from-[#D4AF37]/30 to-blue-500/30 flex items-center justify-center text-5xl">
                      
                    </div>
                    <div className="flex flex-col gap-2">
                      <h3 className="font-bold text-white text-xl font-display">Equipo Póllux</h3>
                      <p className="text-sm text-[#D4AF37]">Investigadores</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-center gap-4 rounded-xl border border-[#D4AF37]/20 bg-white/5 p-8 text-center">
                    <div className="h-32 w-32 rounded-full bg-gradient-to-br from-[#D4AF37]/30 to-pink-500/30 flex items-center justify-center text-5xl">
                      
                    </div>
                    <div className="flex flex-col gap-2">
                      <h3 className="font-bold text-white text-xl font-display">Comunidad</h3>
                      <p className="text-sm text-[#D4AF37]">Entusiastas</p>
                    </div>
                  </div>
                </div>
              </section>

              <section className="mb-16">
                <div className="rounded-xl border border-[#D4AF37]/20 bg-gradient-to-br from-[#D4AF37]/10 to-purple-500/10 p-8">
                  <h3 className="text-white text-3xl font-bold font-display text-glow mb-6 text-center">Nuestra Comunidad en Números</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="text-center">
                      <div className="text-[#D4AF37] text-4xl font-bold font-display text-glow">{memberCount || 247}+</div>
                      <div className="text-slate-300 text-sm mt-2">Miembros</div>
                    </div>
                    <div className="text-center">
                      <div className="text-[#D4AF37] text-4xl font-bold font-display text-glow">50+</div>
                      <div className="text-slate-300 text-sm mt-2">Eventos</div>
                    </div>
                    <div className="text-center">
                      <div className="text-[#D4AF37] text-4xl font-bold font-display text-glow">200+</div>
                      <div className="text-slate-300 text-sm mt-2">Observaciones</div>
                    </div>
                    <div className="text-center">
                      <div className="text-[#D4AF37] text-4xl font-bold font-display text-glow">365</div>
                      <div className="text-slate-300 text-sm mt-2">Días Despejados</div>
                    </div>
                  </div>
                </div>
              </section>

              <section className="mb-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 rounded-xl bg-gradient-to-r from-[#D4AF37] to-purple-600 p-10 text-center md:text-left">
                  <div className="flex flex-col gap-3">
                    <h2 className="text-3xl font-bold font-display text-white">Únete a Nuestro Universo</h2>
                    <p className="text-white/90 text-lg">Forma parte de la comunidad cósmica de Arica.</p>
                  </div>
                  <Link href="/" className="flex shrink-0 items-center justify-center rounded-lg h-14 px-8 bg-white text-[#D4AF37] text-lg font-bold hover:bg-slate-100 transition-colors">
                    Explorar Eventos
                  </Link>
                </div>
              </section>
            </main>

            <footer className="border-t border-slate-100/10 py-8 text-center">
              <p className="text-slate-400 text-sm"> 2025 Cástor & Póllux - Astronomía en Arica</p>
            </footer>
          </div>
        </div>
      </div>
    </>
  )
}

export async function getServerSideProps() {
  const supabase = getSupabaseAdmin()
  
  let memberCount = 0
  try {
    const { count } = await supabase.from('members').select('*', { count: 'exact', head: true })
    memberCount = count || 247
  } catch (error) {
    console.error('Error:', error)
  }

  return {
    props: {
      memberCount
    }
  }
}
