import Link from 'next/link'
import Head from 'next/head'

export default function Home({ news, events, settings }) {
  return (
    <>
      <Head>
        <title>Cástor & Póllux - Astronomía en Arica, Chile</title>
        <html className="dark" />
      </Head>

      <div className="relative flex min-h-screen w-full flex-col bg-background-dark text-[#E6F1FF] font-display antialiased">
        <div className="layout-container flex h-full grow flex-col">
          <div className="px-4 sm:px-10 md:px-20 lg:px-40 flex flex-1 justify-center py-5">
            <div className="layout-content-container flex flex-col w-full max-w-5xl flex-1">
              {/* TopNavBar */}
              <header className="sticky top-5 z-50 flex items-center justify-between whitespace-nowrap rounded-lg border border-solid border-white/10 bg-background-dark/50 px-6 py-3 backdrop-blur-sm">
                <div className="flex items-center gap-4">
                  <div className="size-6 text-primary">
                    <svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2.615l1.39 4.28h4.51l-3.65 2.65 1.39 4.28-3.64-2.65-3.65 2.65 1.4-4.28-3.65-2.65h4.51L12 2.615z M19.5 12.5l-1.4 4.28 3.65 2.65h-4.51l-1.4 4.28-1.4-4.28h-4.5l3.64-2.65-1.39-4.28 3.64 2.65 3.65-2.65z"></path>
                    </svg>
                  </div>
                  <h2 className="text-[#E6F1FF] text-lg font-bold leading-tight tracking-[-0.015em]">Cástor & Póllux</h2>
                </div>
                <div className="hidden md:flex flex-1 justify-end gap-8">
                  <div className="flex items-center gap-9">
                    <a className="text-[#E6F1FF] text-sm font-medium leading-normal hover:text-primary transition-colors" href="#about">About</a>
                    <a className="text-[#E6F1FF] text-sm font-medium leading-normal hover:text-primary transition-colors" href="#news">News</a>
                    <a className="text-[#E6F1FF] text-sm font-medium leading-normal hover:text-primary transition-colors" href="#events">Events</a>
                  </div>
                  <Link
                    href="/gallery"
                    className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary text-[#E6F1FF] text-sm font-bold leading-normal tracking-[0.015em] hover:bg-primary/90 transition-colors"
                  >
                    <span className="truncate">View Gallery</span>
                  </Link>
                </div>
              </header>

              <main className="flex flex-col gap-16 md:gap-24 mt-8">
                {/* HeroSection */}
                <div className="@container" id="hero">
                  <div 
                    className="flex min-h-[60vh] flex-col gap-6 bg-cover bg-center bg-no-repeat @[480px]:gap-8 rounded-xl items-center justify-center p-4" 
                    style={{
                      backgroundImage: `linear-gradient(rgba(10, 25, 47, 0.7) 0%, rgba(10, 25, 47, 0.9) 100%), url("https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=1600&q=80")`
                    }}
                  >
                    <div className="flex flex-col gap-4 text-center max-w-2xl">
                      <h1 className="text-[#E6F1FF] text-4xl font-black leading-tight tracking-[-0.033em] @[480px]:text-6xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em]">
                        Cástor & Póllux
                      </h1>
                      <h2 className="text-[#E6F1FF]/90 text-base font-normal leading-normal @[480px]:text-lg @[480px]:font-normal @[480px]:leading-normal">
                        Explorando el Cosmos desde Arica, Chile. Únete a nuestra comunidad para descubrir la incomparable belleza del cielo nocturno del desierto de Atacama.
                      </h2>
                    </div>
                    <a 
                      href="#news" 
                      className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 @[480px]:h-12 @[480px]:px-5 bg-primary text-[#E6F1FF] text-sm font-bold leading-normal tracking-[0.015em] @[480px]:text-base @[480px]:font-bold @[480px]:leading-normal @[480px]:tracking-[0.015em] hover:bg-primary/90 transition-colors"
                    >
                      <span className="truncate">Explora Nuestro Universo</span>
                    </a>
                  </div>
                </div>

                {/* About Section */}
                <section className="flex flex-col gap-4 px-4 text-center items-center" id="about">
                  <h2 className="text-[#E6F1FF] text-3xl font-bold leading-tight tracking-[-0.015em]">Nuestra Misión en el Cosmos</h2>
                  <p className="text-[#E6F1FF]/80 text-base font-normal leading-relaxed max-w-3xl whitespace-pre-line">
                    {settings?.about_content || 'Cástor & Póllux es una Agrupación de astronomía y cohetería de la ciudad de Arica, ubicada en el extremo septentrional de Chile.'}
                  </p>
                </section>

                {/* News Section */}
                <section id="news">
                  <h2 className="text-[#E6F1FF] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5 border-b border-white/10">
                    Noticias Recientes & Descubrimientos
                  </h2>
                  <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6 p-4">
                    {news.map((item) => (
                      <div key={item.id} className="flex flex-col gap-3 pb-3">
                        <div 
                          className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg" 
                          style={{ backgroundImage: `url("${item.image_url}")` }}
                        ></div>
                        <div>
                          <p className="text-[#E6F1FF] text-base font-medium leading-normal">{item.title}</p>
                          <p className="text-[#E6F1FF]/70 text-sm font-normal leading-normal">{item.summary}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Events Section */}
                <section id="events">
                  <h2 className="text-[#E6F1FF] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5 border-b border-white/10">
                    Próximos Eventos
                  </h2>
                  <div className="flex flex-col p-4 gap-4">
                    {events.map((event) => {
                      const date = new Date(event.event_date)
                      const month = date.toLocaleDateString('es-ES', { month: 'short' }).toUpperCase()
                      const day = date.getDate()
                      
                      return (
                        <div key={event.id} className="flex flex-col sm:flex-row gap-4 items-start sm:items-center p-4 border border-white/10 rounded-lg bg-background-dark/30">
                          <div className="flex flex-col items-center justify-center bg-primary/20 text-primary rounded-lg p-3 w-24 h-24 text-center">
                            <span className="text-3xl font-bold">{month}</span>
                            <span className="text-4xl font-black">{day}</span>
                          </div>
                          <div className="flex-1">
                            <h3 className="font-bold text-[#E6F1FF] text-lg">{event.title}</h3>
                            <p className="text-sm text-[#E6F1FF]/70">{event.description}</p>
                          </div>
                          <div className="text-sm text-[#E6F1FF]/90">
                            <p className="flex items-center gap-2">
                              <span className="material-symbols-outlined text-base">schedule</span> 
                              {event.event_time}
                            </p>
                            <p className="flex items-center gap-2">
                              <span className="material-symbols-outlined text-base">location_on</span> 
                              {event.location}
                            </p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </section>

                {/* Footer */}
                <footer className="flex flex-col gap-6 px-4 py-10 md:py-14 border-t border-white/10">
                  <div className="flex flex-col md:flex-row justify-between gap-8">
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center gap-3">
                        <div className="size-8 text-primary">
                          <svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2.615l1.39 4.28h4.51l-3.65 2.65 1.39 4.28-3.64-2.65-3.65 2.65 1.4-4.28-3.65-2.65h4.51L12 2.615z M19.5 12.5l-1.4 4.28 3.65 2.65h-4.51l-1.4 4.28-1.4-4.28h-4.5l3.64-2.65-1.39-4.28 3.64 2.65 3.65-2.65z"></path>
                          </svg>
                        </div>
                        <h3 className="text-[#E6F1FF] text-lg font-bold">Cástor & Póllux</h3>
                      </div>
                      <p className="text-[#E6F1FF]/70 text-sm">Astronomía y Cohetería - Arica, Chile</p>
                    </div>
                    <div className="flex gap-8">
                      <div className="flex flex-col gap-3">
                        <p className="text-[#E6F1FF] text-sm font-bold">Enlaces</p>
                        <a href="#about" className="text-[#E6F1FF]/70 text-sm hover:text-primary transition-colors">About</a>
                        <Link href="/gallery" className="text-[#E6F1FF]/70 text-sm hover:text-primary transition-colors">Gallery</Link>
                        <Link href="/admin" className="text-[#E6F1FF]/70 text-sm hover:text-primary transition-colors">Admin</Link>
                      </div>
                    </div>
                  </div>
                  <div className="border-t border-white/10 pt-6">
                    <p className="text-[#E6F1FF]/50 text-sm text-center">© 2025 Cástor & Póllux. Todos los derechos reservados.</p>
                  </div>
                </footer>
              </main>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export async function getServerSideProps() {
  const { getSupabaseAdmin } = require('../lib/supabaseServer')
  const supabase = getSupabaseAdmin()

  try {
    // Obtener noticias recientes
    const { data: news } = await supabase
      .from('news')
      .select('id, title, summary, image_url')
      .eq('published', true)
      .order('published_at', { ascending: false })
      .limit(3)

    // Obtener próximos eventos
    const { data: events } = await supabase
      .from('events')
      .select('id, title, description, event_date, event_time, location')
      .eq('published', true)
      .gte('event_date', new Date().toISOString().split('T')[0])
      .order('event_date', { ascending: true })
      .limit(3)

    // Obtener configuraciones
    const { data: aboutData } = await supabase
      .from('site_settings')
      .select('value')
      .eq('key', 'about_content')
      .single()

    return {
      props: {
        news: news || [],
        events: events || [],
        settings: {
          about_content: aboutData?.value ? JSON.parse(aboutData.value) : null
        }
      }
    }
  } catch (error) {
    console.error('Error loading home data:', error)
    return {
      props: {
        news: [],
        events: [],
        settings: {}
      }
    }
  }
}
