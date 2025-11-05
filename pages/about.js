import Head from 'next/head'export default function About(){

import Link from 'next/link'  return (

    <div className="min-h-screen p-8">

export default function About({ settings, membersCount }) {      <header className="max-w-4xl mx-auto mb-6">

  return (        <h1 className="text-3xl font-bold">Acerca de Castror & Pollux</h1>

    <>      </header>

      <Head>      <main className="max-w-4xl mx-auto text-gray-700">

        <title>Nosotros - Cástor & Póllux</title>        <p>Somos un grupo de aficionados a la astronomía en Arica que comparte fotografías, eventos y noticias relacionadas con la observación del cielo.</p>

        <html className="dark" />        <h3 className="mt-6 font-semibold">Contacto</h3>

        <link rel="preconnect" href="https://fonts.googleapis.com" />        <p className="text-sm text-gray-600">Encuéntranos en Facebook (contenido descargado en la carpeta <code>/material</code>)</p>

        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />      </main>

        <link href="https://fonts.googleapis.com/css2?family=Exo+2:wght@300;400;500;700&family=Orbitron:wght@400;500;700;900&display=swap" rel="stylesheet" />    </div>

      </Head>  )

}

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
        {/* Background gradients */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full bg-purple-500/10 blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full bg-[#D4AF37]/8 blur-3xl"></div>
        </div>

        <div className="relative z-10 flex h-full grow flex-col px-4 sm:px-10 md:px-20 lg:px-24">
          <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col">
            {/* Header */}
            <header className="sticky top-5 z-50 flex items-center justify-between whitespace-nowrap rounded-full border border-solid border-slate-100/10 bg-black/30 px-6 py-3 backdrop-blur-xl">
              <Link href="/" className="flex items-center gap-3">
                <div className="size-6 text-[#D4AF37]">
                  <svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2.615l1.39 4.28h4.51l-3.65 2.65 1.39 4.28-3.64-2.65-3.65 2.65 1.4-4.28-3.65-2.65h4.51L12 2.615z M19.5 12.5l-1.4 4.28 3.65 2.65h-4.51l-1.4 4.28-1.4-4.28h-4.5l3.64-2.65-1.39-4.28 3.64 2.65 3.65-2.65z"></path>
                  </svg>
                </div>
                <h2 className="text-slate-100 text-lg font-bold leading-tight font-display tracking-wider">CÁSTOR & PÓLLUX</h2>
              </Link>
              <div className="hidden md:flex flex-1 items-center justify-end gap-8">
                <nav className="flex items-center gap-9">
                  <Link href="/" className="text-slate-300 text-sm font-medium hover:text-[#D4AF37] transition-colors">Inicio</Link>
                  <Link href="/blog" className="text-slate-300 text-sm font-medium hover:text-[#D4AF37] transition-colors">Blog</Link>
                  <Link href="/gallery" className="text-slate-300 text-sm font-medium hover:text-[#D4AF37] transition-colors">Galería</Link>
                  <Link href="/about" className="text-[#D4AF37] text-sm font-bold">Nosotros</Link>
                </nav>
              </div>
            </header>

            <main className="flex-1 mt-16">
              {/* Hero */}
              <div className="text-center mb-16">
                <h1 className="text-white text-5xl md:text-6xl font-bold leading-tight font-display mb-6 text-glow">
                  Sobre Nosotros
                </h1>
                <p className="text-slate-400 text-xl max-w-3xl mx-auto">
                  Un club de astronomía dedicado a explorar el universo desde los cielos privilegiados de Arica
                </p>
              </div>

              {/* Mission Section */}
              <div className="max-w-4xl mx-auto mb-20">
                <div className="bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 p-8 md:p-12">
                  <h2 className="text-[#D4AF37] text-3xl font-bold font-display mb-6 text-glow">
                    Nuestra Misión
                  </h2>
                  <p className="text-slate-300 text-lg leading-relaxed mb-4">
                    {settings?.mission || 'Cástor & Póllux es un club de astronomía con sede en Arica, Chile, dedicado a la observación, estudio y divulgación de la astronomía. Aprovechamos los cielos despejados del desierto de Atacama para realizar observaciones astronómicas y compartir el conocimiento del cosmos con nuestra comunidad.'}
                  </p>
                  <p className="text-slate-300 text-lg leading-relaxed">
                    Nuestro objetivo es fomentar el interés por la astronomía, proporcionar oportunidades de aprendizaje y crear una comunidad de entusiastas que comparten la pasión por explorar el universo.
                  </p>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
                <div className="bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 p-8 text-center">
                  <div className="text-[#D4AF37] text-5xl font-bold font-display mb-2 text-glow">
                    {membersCount}+
                  </div>
                  <div className="text-slate-400 text-sm uppercase tracking-wider">Miembros Activos</div>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 p-8 text-center">
                  <div className="text-[#D4AF37] text-5xl font-bold font-display mb-2 text-glow">
                    1,200+
                  </div>
                  <div className="text-slate-400 text-sm uppercase tracking-wider">Observaciones</div>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 p-8 text-center">
                  <div className="text-[#D4AF37] text-5xl font-bold font-display mb-2 text-glow">
                    15+
                  </div>
                  <div className="text-slate-400 text-sm uppercase tracking-wider">Años de Historia</div>
                </div>
              </div>

              {/* Values */}
              <div className="max-w-4xl mx-auto mb-20">
                <h2 className="text-white text-3xl md:text-4xl font-bold font-display mb-12 text-center text-glow">
                  Nuestros Valores
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 p-6">
                    <div className="text-[#D4AF37] text-2xl mb-3">🔭</div>
                    <h3 className="text-white text-xl font-bold font-display mb-2">Exploración</h3>
                    <p className="text-slate-400">Fomentamos la curiosidad y el espíritu de descubrimiento en cada miembro.</p>
                  </div>
                  <div className="bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 p-6">
                    <div className="text-[#D4AF37] text-2xl mb-3">🤝</div>
                    <h3 className="text-white text-xl font-bold font-display mb-2">Comunidad</h3>
                    <p className="text-slate-400">Creamos un espacio inclusivo para compartir conocimiento y experiencias.</p>
                  </div>
                  <div className="bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 p-6">
                    <div className="text-[#D4AF37] text-2xl mb-3">📚</div>
                    <h3 className="text-white text-xl font-bold font-display mb-2">Educación</h3>
                    <p className="text-slate-400">Promovemos la divulgación científica y el aprendizaje continuo.</p>
                  </div>
                  <div className="bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 p-6">
                    <div className="text-[#D4AF37] text-2xl mb-3">🌟</div>
                    <h3 className="text-white text-xl font-bold font-display mb-2">Pasión</h3>
                    <p className="text-slate-400">Compartimos un amor genuino por la astronomía y el cosmos.</p>
                  </div>
                </div>
              </div>

              {/* Contact/Join */}
              <div className="max-w-2xl mx-auto text-center bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-sm rounded-lg border border-white/10 p-12">
                <h2 className="text-white text-3xl font-bold font-display mb-4 text-glow">
                  Únete a Nuestra Comunidad
                </h2>
                <p className="text-slate-300 text-lg mb-8">
                  Si te apasiona la astronomía y quieres formar parte de nuestro club, estamos esperando por ti.
                </p>
                <Link href="/" className="inline-flex items-center justify-center px-8 py-3 bg-[#D4AF37] text-[#010409] rounded-lg font-bold hover:bg-white transition-colors">
                  Contáctanos
                </Link>
              </div>
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
      </div>
    </>
  )
}

export async function getServerSideProps() {
  const { getSupabaseAdmin } = require('../lib/supabaseServer')
  const supabase = getSupabaseAdmin()

  const { data: settings } = await supabase
    .from('site_settings')
    .select('*')
    .single()

  const { count: membersCount } = await supabase
    .from('members')
    .select('*', { count: 'exact', head: true })

  return {
    props: {
      settings: settings || null,
      membersCount: membersCount || 247,
    },
  }
}
