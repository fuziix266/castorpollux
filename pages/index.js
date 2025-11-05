import Head from 'next/head'import Link from 'next/link'

import Link from 'next/link'import Head from 'next/head'



export default function Home({ news, events, posts, stats }) {export default function Home({ news, events, settings }) {

  return (  return (

    <>    <>

      <Head>      <Head>

        <title>Cástor & Póllux - Arica's Astronomy Community</title>        <title>Cástor & Póllux - Astronomía en Arica, Chile</title>

        <meta name="description" content="Club de astronomía en Arica, Chile - Explorando el cosmos desde el desierto de Atacama" />        <html className="dark" />

        <link rel="icon" href="/favicon.ico" />      </Head>

        <html className="dark" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />      <div className="relative flex min-h-screen w-full flex-col bg-background-dark text-[#E6F1FF] font-display antialiased">

        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />        <div className="layout-container flex h-full grow flex-col">

        <link href="https://fonts.googleapis.com/css2?family=Exo+2:wght@300;400;500;700&family=Orbitron:wght@400;500;700;900&display=swap" rel="stylesheet" />          <div className="px-4 sm:px-10 md:px-20 lg:px-40 flex flex-1 justify-center py-5">

      </Head>            <div className="layout-content-container flex flex-col w-full max-w-5xl flex-1">

              {/* TopNavBar */}

      <style jsx global>{`              <header className="sticky top-5 z-50 flex items-center justify-between whitespace-nowrap rounded-lg border border-solid border-white/10 bg-background-dark/50 px-6 py-3 backdrop-blur-sm">

        body {                <div className="flex items-center gap-4">

          font-family: 'Exo 2', sans-serif;                  <div className="size-6 text-primary">

        }                    <svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">

        .font-display {                      <path d="M12 2.615l1.39 4.28h4.51l-3.65 2.65 1.39 4.28-3.64-2.65-3.65 2.65 1.4-4.28-3.65-2.65h4.51L12 2.615z M19.5 12.5l-1.4 4.28 3.65 2.65h-4.51l-1.4 4.28-1.4-4.28h-4.5l3.64-2.65-1.39-4.28 3.64 2.65 3.65-2.65z"></path>

          font-family: 'Orbitron', sans-serif;                    </svg>

        }                  </div>

        .text-glow {                  <h2 className="text-[#E6F1FF] text-lg font-bold leading-tight tracking-[-0.015em]">Cástor & Póllux</h2>

          text-shadow: 0 0 8px rgba(212, 175, 55, 0.3), 0 0 16px rgba(212, 175, 55, 0.2);                </div>

        }                <div className="hidden md:flex flex-1 justify-end gap-8">

        .card-border-glow {                  <div className="flex items-center gap-9">

          position: relative;                    <a className="text-[#E6F1FF] text-sm font-medium leading-normal hover:text-primary transition-colors" href="#about">About</a>

          overflow: hidden;                    <a className="text-[#E6F1FF] text-sm font-medium leading-normal hover:text-primary transition-colors" href="#news">News</a>

        }                    <a className="text-[#E6F1FF] text-sm font-medium leading-normal hover:text-primary transition-colors" href="#events">Events</a>

        .card-border-glow::before {                  </div>

          content: '';                  <Link

          position: absolute;                    href="/gallery"

          top: 0;                    className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary text-[#E6F1FF] text-sm font-bold leading-normal tracking-[0.015em] hover:bg-primary/90 transition-colors"

          left: 0;                  >

          right: 0;                    <span className="truncate">View Gallery</span>

          bottom: 0;                  </Link>

          border-radius: inherit;                </div>

          padding: 1px;              </header>

          background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0));

          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);              <main className="flex flex-col gap-16 md:gap-24 mt-8">

          -webkit-mask-composite: xor;                {/* HeroSection */}

          mask-composite: exclude;                <div className="@container" id="hero">

          pointer-events: none;                  <div 

        }                    className="flex min-h-[60vh] flex-col gap-6 bg-cover bg-center bg-no-repeat @[480px]:gap-8 rounded-xl items-center justify-center p-4" 

        @keyframes fade-in-up {                    style={{

          0% { opacity: 0; transform: translateY(20px); }                      backgroundImage: `linear-gradient(rgba(10, 25, 47, 0.7) 0%, rgba(10, 25, 47, 0.9) 100%), url("https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=1600&q=80")`

          100% { opacity: 1; transform: translateY(0); }                    }}

        }                  >

        .animate-fade-in-up {                    <div className="flex flex-col gap-4 text-center max-w-2xl">

          animation: fade-in-up 1s ease-out forwards;                      <h1 className="text-[#E6F1FF] text-4xl font-black leading-tight tracking-[-0.033em] @[480px]:text-6xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em]">

        }                        Cástor & Póllux

      `}</style>                      </h1>

                      <h2 className="text-[#E6F1FF]/90 text-base font-normal leading-normal @[480px]:text-lg @[480px]:font-normal @[480px]:leading-normal">

      <div className="relative min-h-screen w-full flex flex-col bg-[#010409] text-slate-300">                        Explorando el Cosmos desde Arica, Chile. Únete a nuestra comunidad para descubrir la incomparable belleza del cielo nocturno del desierto de Atacama.

        {/* Background gradients */}                      </h2>

        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">                    </div>

          <div className="absolute top-0 left-0 w-[80vmax] h-[80vmax] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,_rgba(138,79,255,0.1)_0%,_rgba(138,79,255,0)_50%)]"></div>                    <a 

          <div className="absolute bottom-0 right-0 w-[60vmax] h-[60vmax] translate-x-1/2 translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,_rgba(212,175,55,0.08)_0%,_rgba(212,175,55,0)_60%)]"></div>                      href="#news" 

        </div>                      className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 @[480px]:h-12 @[480px]:px-5 bg-primary text-[#E6F1FF] text-sm font-bold leading-normal tracking-[0.015em] @[480px]:text-base @[480px]:font-bold @[480px]:leading-normal @[480px]:tracking-[0.015em] hover:bg-primary/90 transition-colors"

                    >

        <div className="relative z-10 flex h-full grow flex-col px-4 sm:px-10 md:px-20 lg:px-24">                      <span className="truncate">Explora Nuestro Universo</span>

          <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col">                    </a>

            {/* Header */}                  </div>

            <header className="sticky top-5 z-50 flex items-center justify-between whitespace-nowrap rounded-full border border-solid border-slate-100/10 bg-black/30 px-6 py-3 backdrop-blur-xl transition-all duration-300">                </div>

              <div className="flex items-center gap-3">

                <div className="size-6 text-[#D4AF37]">                {/* About Section */}

                  <svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">                <section className="flex flex-col gap-4 px-4 text-center items-center" id="about">

                    <path d="M12 2.615l1.39 4.28h4.51l-3.65 2.65 1.39 4.28-3.64-2.65-3.65 2.65 1.4-4.28-3.65-2.65h4.51L12 2.615z M19.5 12.5l-1.4 4.28 3.65 2.65h-4.51l-1.4 4.28-1.4-4.28h-4.5l3.64-2.65-1.39-4.28 3.64 2.65 3.65-2.65z"></path>                  <h2 className="text-[#E6F1FF] text-3xl font-bold leading-tight tracking-[-0.015em]">Nuestra Misión en el Cosmos</h2>

                  </svg>                  <p className="text-[#E6F1FF]/80 text-base font-normal leading-relaxed max-w-3xl whitespace-pre-line">

                </div>                    {settings?.about_content || 'Cástor & Póllux es una Agrupación de astronomía y cohetería de la ciudad de Arica, ubicada en el extremo septentrional de Chile.'}

                <h2 className="text-slate-100 text-lg font-bold leading-tight font-display tracking-wider">CÁSTOR & PÓLLUX</h2>                  </p>

              </div>                </section>

              <div className="hidden md:flex flex-1 items-center justify-end gap-8">

                <nav className="flex items-center gap-9">                {/* News Section */}

                  <Link href="#mission" className="text-slate-300 text-sm font-medium leading-normal hover:text-[#D4AF37] transition-colors duration-300">                <section id="news">

                    Misión                  <h2 className="text-[#E6F1FF] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5 border-b border-white/10">

                  </Link>                    Noticias Recientes & Descubrimientos

                  <Link href="#discoveries" className="text-slate-300 text-sm font-medium leading-normal hover:text-[#D4AF37] transition-colors duration-300">                  </h2>

                    Descubrimientos                  <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6 p-4">

                  </Link>                    {news.map((item) => (

                  <Link href="#events" className="text-slate-300 text-sm font-medium leading-normal hover:text-[#D4AF37] transition-colors duration-300">                      <div key={item.id} className="flex flex-col gap-3 pb-3">

                    Eventos                        <div 

                  </Link>                          className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg" 

                  <Link href="/blog" className="text-slate-300 text-sm font-medium leading-normal hover:text-[#D4AF37] transition-colors duration-300">                          style={{ backgroundImage: `url("${item.image_url}")` }}

                    Blog                        ></div>

                  </Link>                        <div>

                </nav>                          <p className="text-[#E6F1FF] text-base font-medium leading-normal">{item.title}</p>

                <Link href="/about" className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-6 bg-slate-100/5 text-slate-100 text-sm font-bold leading-normal tracking-wide border border-slate-100/10 hover:bg-slate-100/10 hover:border-slate-100/20 transition-all duration-300">                          <p className="text-[#E6F1FF]/70 text-sm font-normal leading-normal">{item.summary}</p>

                  <span className="truncate">Únete</span>                        </div>

                </Link>                      </div>

              </div>                    ))}

            </header>                  </div>

                </section>

            <main className="flex flex-col gap-24 md:gap-32 mt-8">

              {/* Hero Section */}                {/* Events Section */}

              <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center overflow-hidden" id="hero">                <section id="events">

                <div className="absolute inset-0 z-0 bg-cover bg-center" style={{backgroundImage: 'url("https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=1600&q=80")', filter: 'blur(8px) brightness(0.6)', transform: 'scale(1.1)'}}></div>                  <h2 className="text-[#E6F1FF] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5 border-b border-white/10">

                <div className="absolute inset-0 bg-gradient-to-b from-[#010409]/30 via-[#010409] to-[#010409]"></div>                    Próximos Eventos

                <div className="relative z-10 flex flex-col items-center gap-6 px-4">                  </h2>

                  <h1 className="text-slate-50 text-5xl font-black leading-tight tracking-tighter sm:text-7xl lg:text-8xl font-display text-glow animate-fade-in-up" style={{animationDelay: '100ms'}}>                  <div className="flex flex-col p-4 gap-4">

                    Una Odisea Cósmica                    {events.map((event) => {

                  </h1>                      const date = new Date(event.event_date)

                  <p className="text-slate-400 text-base font-light leading-relaxed max-w-2xl sm:text-xl animate-fade-in-up" style={{animationDelay: '300ms'}}>                      const month = date.toLocaleDateString('es-ES', { month: 'short' }).toUpperCase()

                    Revelando las maravillas del cielo de Atacama desde Arica. Somos exploradores, soñadores y astrónomos cartografiando la frontera final.                      const day = date.getDate()

                  </p>                      

                  <div className="flex items-center gap-4 mt-4 animate-fade-in-up" style={{animationDelay: '500ms'}}>                      return (

                    <Link href="#mission" className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-12 px-8 bg-[#D4AF37] text-[#010409] text-base font-bold tracking-wide shadow-lg hover:bg-amber-300 transition-all duration-300">                        <div key={event.id} className="flex flex-col sm:flex-row gap-4 items-start sm:items-center p-4 border border-white/10 rounded-lg bg-background-dark/30">

                      <span className="truncate">Comenzar Exploración</span>                          <div className="flex flex-col items-center justify-center bg-primary/20 text-primary rounded-lg p-3 w-24 h-24 text-center">

                    </Link>                            <span className="text-3xl font-bold">{month}</span>

                  </div>                            <span className="text-4xl font-black">{day}</span>

                </div>                          </div>

                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-500 animate-fade-in-up" style={{animationDelay: '700ms'}}>                          <div className="flex-1">

                  <span className="material-symbols-outlined animate-bounce">keyboard_arrow_down</span>                            <h3 className="font-bold text-[#E6F1FF] text-lg">{event.title}</h3>

                </div>                            <p className="text-sm text-[#E6F1FF]/70">{event.description}</p>

              </section>                          </div>

                          <div className="text-sm text-[#E6F1FF]/90">

              {/* Stats Section */}                            <p className="flex items-center gap-2">

              <section className="grid grid-cols-2 md:grid-cols-4 gap-8 px-4 text-center -mt-16 md:-mt-24">                              <span className="material-symbols-outlined text-base">schedule</span> 

                <div className="flex flex-col items-center gap-1 card-border-glow bg-slate-900/40 backdrop-blur-sm p-6 rounded-xl">                              {event.event_time}

                  <span className="text-4xl lg:text-5xl font-bold font-display text-[#D4AF37] text-glow">{stats.members}+</span>                            </p>

                  <p className="text-sm text-slate-400">Miembros</p>                            <p className="flex items-center gap-2">

                </div>                              <span className="material-symbols-outlined text-base">location_on</span> 

                <div className="flex flex-col items-center gap-1 card-border-glow bg-slate-900/40 backdrop-blur-sm p-6 rounded-xl">                              {event.location}

                  <span className="text-4xl lg:text-5xl font-bold font-display text-[#D4AF37] text-glow">{stats.observations}+</span>                            </p>

                  <p className="text-sm text-slate-400">Horas de Observación</p>                          </div>

                </div>                        </div>

                <div className="flex flex-col items-center gap-1 card-border-glow bg-slate-900/40 backdrop-blur-sm p-6 rounded-xl">                      )

                  <span className="text-4xl lg:text-5xl font-bold font-display text-[#D4AF37] text-glow">{stats.posts}</span>                    })}

                  <p className="text-sm text-slate-400">Artículos Publicados</p>                  </div>

                </div>                </section>

                <div className="flex flex-col items-center gap-1 card-border-glow bg-slate-900/40 backdrop-blur-sm p-6 rounded-xl">

                  <span className="text-4xl lg:text-5xl font-bold font-display text-[#D4AF37] text-glow">{stats.events}</span>                {/* Footer */}

                  <p className="text-sm text-slate-400">Eventos Anuales</p>                <footer className="flex flex-col gap-6 px-4 py-10 md:py-14 border-t border-white/10">

                </div>                  <div className="flex flex-col md:flex-row justify-between gap-8">

              </section>                    <div className="flex flex-col gap-4">

                      <div className="flex items-center gap-3">

              {/* Mission Section */}                        <div className="size-8 text-primary">

              <section className="flex flex-col gap-4 px-4 text-center items-center" id="mission">                          <svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">

                <h2 className="font-display text-4xl font-bold leading-tight tracking-tight text-slate-100">Nuestra Misión en el Cosmos</h2>                            <path d="M12 2.615l1.39 4.28h4.51l-3.65 2.65 1.39 4.28-3.64-2.65-3.65 2.65 1.4-4.28-3.65-2.65h4.51L12 2.615z M19.5 12.5l-1.4 4.28 3.65 2.65h-4.51l-1.4 4.28-1.4-4.28h-4.5l3.64-2.65-1.39-4.28 3.64 2.65 3.65-2.65z"></path>

                <p className="text-slate-400 text-lg font-light leading-relaxed max-w-3xl">                          </svg>

                  Bienvenido a Cástor & Póllux, la principal comunidad astronómica de Arica. Somos un grupo apasionado de observadores de estrellas, fotógrafos y entusiastas de la ciencia dedicados a explorar el cielo nocturno. Nuestra misión es compartir la maravilla del cosmos, fomentar el amor por la astronomía en nuestra comunidad local y aprovechar la posición única de Arica como puerta de entrada a algunos de los cielos más claros de la Tierra.                        </div>

                </p>                        <h3 className="text-[#E6F1FF] text-lg font-bold">Cástor & Póllux</h3>

              </section>                      </div>

                      <p className="text-[#E6F1FF]/70 text-sm">Astronomía y Cohetería - Arica, Chile</p>

              {/* Recent Posts/Discoveries */}                    </div>

              <section id="discoveries">                    <div className="flex gap-8">

                <h2 className="text-slate-100 text-3xl font-bold font-display tracking-tight px-4 pb-3 pt-5 border-b border-white/10 mb-8">Últimos Descubrimientos</h2>                      <div className="flex flex-col gap-3">

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-4">                        <p className="text-[#E6F1FF] text-sm font-bold">Enlaces</p>

                  {posts && posts.length > 0 ? posts.map((post) => (                        <a href="#about" className="text-[#E6F1FF]/70 text-sm hover:text-primary transition-colors">About</a>

                    <Link key={post.id} href={`/blog/${post.slug}`} className="flex flex-col gap-4 pb-3 group">                        <Link href="/gallery" className="text-[#E6F1FF]/70 text-sm hover:text-primary transition-colors">Gallery</Link>

                      <div className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl overflow-hidden transition-transform duration-500 group-hover:scale-105" style={{backgroundImage: `url("${post.featured_image_url || 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&q=80'}")`}}></div>                        <Link href="/admin" className="text-[#E6F1FF]/70 text-sm hover:text-primary transition-colors">Admin</Link>

                      <div className="p-2">                      </div>

                        <p className="text-slate-200 text-xl font-bold leading-normal font-display">{post.title}</p>                    </div>

                        <p className="text-slate-400 text-base font-light leading-relaxed">{post.summary || post.content?.substring(0, 120) + '...'}</p>                  </div>

                      </div>                  <div className="border-t border-white/10 pt-6">

                    </Link>                    <p className="text-[#E6F1FF]/50 text-sm text-center">© 2025 Cástor & Póllux. Todos los derechos reservados.</p>

                  )) : (                  </div>

                    <p className="col-span-3 text-center text-slate-400">Próximamente nuevos artículos</p>                </footer>

                  )}              </main>

                </div>            </div>

                <div className="text-center mt-8">          </div>

                  <Link href="/blog" className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-slate-100/5 text-slate-100 text-sm font-bold border border-slate-100/10 hover:bg-slate-100/10 transition-all">        </div>

                    Ver todos los artículos      </div>

                  </Link>    </>

                </div>  )

              </section>}



              {/* News Section */}export async function getServerSideProps() {

              {news && news.length > 0 && (  const { getSupabaseAdmin } = require('../lib/supabaseServer')

                <section>  const supabase = getSupabaseAdmin()

                  <h2 className="text-slate-100 text-3xl font-bold font-display tracking-tight px-4 pb-3 pt-5 border-b border-white/10 mb-8">Noticias Recientes</h2>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-4">  try {

                    {news.map((item) => (    // Obtener noticias recientes

                      <div key={item.id} className="flex flex-col gap-4 pb-3 group">    const { data: news } = await supabase

                        <div className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl overflow-hidden transition-transform duration-500 group-hover:scale-105" style={{backgroundImage: `url("${item.image_url || 'https://images.unsplash.com/photo-1532693322450-2cb5c511067d?w=800&q=80'}")`}}></div>      .from('news')

                        <div className="p-2">      .select('id, title, summary, image_url')

                          <p className="text-slate-200 text-xl font-bold leading-normal font-display">{item.title}</p>      .eq('published', true)

                          <p className="text-slate-400 text-base font-light leading-relaxed">{item.summary}</p>      .order('published_at', { ascending: false })

                        </div>      .limit(3)

                      </div>

                    ))}    // Obtener próximos eventos

                  </div>    const { data: events } = await supabase

                </section>      .from('events')

              )}      .select('id, title, description, event_date, event_time, location')

      .eq('published', true)

              {/* Events Section */}      .gte('event_date', new Date().toISOString().split('T')[0])

              <section id="events">      .order('event_date', { ascending: true })

                <h2 className="text-slate-100 text-3xl font-bold font-display tracking-tight px-4 pb-3 pt-5 border-b border-white/10 mb-8">Reuniones Celestiales</h2>      .limit(3)

                <div className="flex flex-col p-4 gap-4">

                  {events && events.length > 0 ? events.map((event) => {    // Obtener configuraciones

                    const eventDate = new Date(event.event_date)    const { data: aboutData } = await supabase

                    const monthShort = eventDate.toLocaleDateString('es-ES', { month: 'short' }).toUpperCase()      .from('site_settings')

                    const day = eventDate.getDate()      .select('value')

                    const time = eventDate.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })      .eq('key', 'about_content')

                          .single()

                    return (

                      <div key={event.id} className="card-border-glow flex flex-col sm:flex-row gap-6 items-start sm:items-center p-6 rounded-xl bg-slate-900/40 backdrop-blur-sm hover:bg-slate-900/60 transition-colors duration-300">    return {

                        <div className="flex flex-col items-center justify-center bg-[#D4AF37]/10 text-[#D4AF37] rounded-lg p-3 w-28 h-28 text-center border border-[#D4AF37]/20 shrink-0">      props: {

                          <span className="text-2xl font-bold font-display">{monthShort}</span>        news: news || [],

                          <span className="text-5xl font-black font-display">{day}</span>        events: events || [],

                        </div>        settings: {

                        <div className="flex-1">          about_content: aboutData?.value ? JSON.parse(aboutData.value) : null

                          <h3 className="font-bold text-slate-100 text-xl font-display">{event.title}</h3>        }

                          <p className="text-sm text-slate-400 leading-relaxed">{event.description}</p>      }

                        </div>    }

                        <div className="text-sm text-slate-400 space-y-2 self-start sm:self-center">  } catch (error) {

                          <p className="flex items-center gap-2"><span className="material-symbols-outlined text-base">schedule</span> {time}</p>    console.error('Error loading home data:', error)

                          {event.location && <p className="flex items-center gap-2"><span className="material-symbols-outlined text-base">location_on</span> {event.location}</p>}    return {

                        </div>      props: {

                      </div>        news: [],

                    )        events: [],

                  }) : (        settings: {}

                    <p className="text-center text-slate-400">Próximamente nuevos eventos</p>      }

                  )}    }

                </div>  }

              </section>}


              {/* Resources Section */}
              <section className="grid md:grid-cols-3 gap-8 p-4 text-center" id="join">
                <div className="flex flex-col items-center gap-3 card-border-glow bg-slate-900/40 backdrop-blur-sm p-8 rounded-xl">
                  <div className="flex items-center justify-center w-20 h-20 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] mb-3 border border-[#D4AF37]/20">
                    <span className="material-symbols-outlined !text-4xl">satellite_alt</span>
                  </div>
                  <h3 className="font-bold text-slate-100 text-xl font-display">Elige tu Telescopio</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">Encuentra el telescopio perfecto para comenzar tu viaje, desde refractores para principiantes hasta reflectores avanzados.</p>
                </div>
                <div className="flex flex-col items-center gap-3 card-border-glow bg-slate-900/40 backdrop-blur-sm p-8 rounded-xl">
                  <div className="flex items-center justify-center w-20 h-20 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] mb-3 border border-[#D4AF37]/20">
                    <span className="material-symbols-outlined !text-4xl">auto_stories</span>
                  </div>
                  <h3 className="font-bold text-slate-100 text-xl font-display">Fundamentos de Observación</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">Aprende a navegar el cielo nocturno, identificar constelaciones y usar cartas estelares como un profesional.</p>
                </div>
                <div className="flex flex-col items-center gap-3 card-border-glow bg-slate-900/40 backdrop-blur-sm p-8 rounded-xl">
                  <div className="flex items-center justify-center w-20 h-20 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] mb-3 border border-[#D4AF37]/20">
                    <span className="material-symbols-outlined !text-4xl">photo_camera</span>
                  </div>
                  <h3 className="font-bold text-slate-100 text-xl font-display">Astrofotografía</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">Captura imágenes impresionantes del cosmos con consejos y trucos de nuestra comunidad para todos los niveles.</p>
                </div>
              </section>
            </main>

            {/* Footer */}
            <footer className="mt-24 md:mt-32 border-t border-white/10 pt-12 pb-8">
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
              <p className="text-center text-xs text-slate-500 mt-12">© 2024 Cástor & Póllux. Observación de estrellas en Arica, Chile. Todos los derechos reservados.</p>
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

  // Get latest news
  const { data: news } = await supabase
    .from('news')
    .select('id, title, summary, image_url')
    .eq('published', true)
    .order('published_at', { ascending: false })
    .limit(3)

  // Get upcoming events
  const { data: events } = await supabase
    .from('events')
    .select('id, title, description, event_date, location')
    .gte('event_date', new Date().toISOString())
    .order('event_date', { ascending: true })
    .limit(2)

  // Get latest published posts
  const { data: posts } = await supabase
    .from('posts')
    .select('id, title, slug, summary, content, featured_image_url')
    .eq('published', true)
    .order('published_at', { ascending: false })
    .limit(3)

  // Get stats
  const { count: membersCount } = await supabase
    .from('members')
    .select('*', { count: 'exact', head: true })

  const { count: postsCount } = await supabase
    .from('posts')
    .select('*', { count: 'exact', head: true })
    .eq('published', true)

  const { count: eventsCount } = await supabase
    .from('events')
    .select('*', { count: 'exact', head: true })

  const stats = {
    members: membersCount || 247,
    observations: 1200,
    posts: postsCount || 5,
    events: eventsCount || 15,
  }

  return {
    props: {
      news: news || [],
      events: events || [],
      posts: posts || [],
      stats,
    },
  }
}
