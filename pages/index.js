import Head from 'next/head'
import Link from 'next/link'
import { getSupabaseAdmin } from '../lib/supabaseServer'

export default function Home({ news, events, posts, stats }) {
  return (
    <>
      <Head>
        <title>Cástor & Póllux - Astronomía en Arica</title>
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
            <header className="sticky top-5 z-50 flex items-center justify-between whitespace-nowrap rounded-full border border-solid border-slate-100/10 bg-black/30 px-6 py-3 backdrop-blur-xl">
              <Link href="/" className="flex items-center gap-3">
                <div className="size-6 text-[#D4AF37]">
                  <svg fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.615l1.39 4.28h4.51l-3.65 2.65 1.39 4.28-3.64-2.65-3.65 2.65 1.4-4.28-3.65-2.65h4.51L12 2.615z M19.5 12.5l-1.4 4.28 3.65 2.65h-4.51l-1.4 4.28-1.4-4.28h-4.5l3.64-2.65-1.39-4.28 3.64 2.65 3.65-2.65z"></path>
                  </svg>
                </div>
                <h2 className="text-slate-100 text-lg font-bold font-display tracking-wider">CÁSTOR & PÓLLUX</h2>
              </Link>
              <div className="hidden md:flex items-center gap-8">
                <Link href="/blog" className="text-slate-300 text-sm hover:text-[#D4AF37]">Blog</Link>
                <Link href="/gallery" className="text-slate-300 text-sm hover:text-[#D4AF37]">Galería</Link>
                <Link href="/about" className="text-slate-300 text-sm hover:text-[#D4AF37]">Nosotros</Link>
                <Link href="/admin/login" className="text-slate-400 hover:text-[#D4AF37] transition-colors" title="Panel de Administración">
                  <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </Link>
              </div>
            </header>

            <main className="flex-1 py-20">
              <div className="text-center mb-16">
                <div className="flex justify-center mb-6">
                  <svg className="w-64 h-24 text-[#D4AF37]" viewBox="0 0 400 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Estrella Cástor (izquierda) */}
                    <g className="animate-pulse" style={{ animationDuration: '3s' }}>
                      <circle cx="100" cy="60" r="8" fill="currentColor" opacity="0.3"/>
                      <circle cx="100" cy="60" r="5" fill="currentColor"/>
                      <path d="M100 35 L105 50 L120 52 L110 62 L112 77 L100 70 L88 77 L90 62 L80 52 L95 50 Z" fill="currentColor" stroke="currentColor" strokeWidth="1"/>
                      <line x1="100" y1="35" x2="100" y2="25" stroke="currentColor" strokeWidth="2"/>
                      <line x1="120" y1="52" x2="127" y2="47" stroke="currentColor" strokeWidth="2"/>
                      <line x1="112" y1="77" x2="115" y2="87" stroke="currentColor" strokeWidth="2"/>
                      <line x1="88" y1="77" x2="85" y2="87" stroke="currentColor" strokeWidth="2"/>
                      <line x1="80" y1="52" x2="73" y2="47" stroke="currentColor" strokeWidth="2"/>
                    </g>
                    
                    {/* Línea de conexión */}
                    <line x1="120" y1="60" x2="280" y2="60" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" opacity="0.4"/>
                    
                    {/* Estrella Póllux (derecha) */}
                    <g className="animate-pulse" style={{ animationDuration: '3s', animationDelay: '1.5s' }}>
                      <circle cx="300" cy="60" r="10" fill="currentColor" opacity="0.3"/>
                      <circle cx="300" cy="60" r="6" fill="currentColor"/>
                      <path d="M300 30 L306 48 L325 50 L312 62 L315 81 L300 72 L285 81 L288 62 L275 50 L294 48 Z" fill="currentColor" stroke="currentColor" strokeWidth="1"/>
                      <line x1="300" y1="30" x2="300" y2="18" stroke="currentColor" strokeWidth="2"/>
                      <line x1="325" y1="50" x2="335" y2="43" stroke="currentColor" strokeWidth="2"/>
                      <line x1="315" y1="81" x2="320" y2="93" stroke="currentColor" strokeWidth="2"/>
                      <line x1="285" y1="81" x2="280" y2="93" stroke="currentColor" strokeWidth="2"/>
                      <line x1="275" y1="50" x2="265" y2="43" stroke="currentColor" strokeWidth="2"/>
                    </g>
                  </svg>
                </div>
                <h1 className="text-white text-5xl md:text-7xl font-bold font-display mb-6 text-glow">
                  Una Odisea Cósmica
                </h1>
                <p className="text-slate-300 text-xl max-w-2xl mx-auto">
                  Desde Arica exploramos los secretos del universo bajo el cielo más despejado de la Tierra
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-20">
                <div className="bg-white/5 rounded-lg p-6 text-center">
                  <div className="text-[#D4AF37] text-4xl font-bold font-display text-glow">{stats.members}+</div>
                  <div className="text-slate-400 text-sm">Miembros</div>
                </div>
                <div className="bg-white/5 rounded-lg p-6 text-center">
                  <div className="text-[#D4AF37] text-4xl font-bold font-display text-glow">{stats.observations}+</div>
                  <div className="text-slate-400 text-sm">Observaciones</div>
                </div>
                <div className="bg-white/5 rounded-lg p-6 text-center">
                  <div className="text-[#D4AF37] text-4xl font-bold font-display text-glow">{stats.posts}</div>
                  <div className="text-slate-400 text-sm">Artículos</div>
                </div>
                <div className="bg-white/5 rounded-lg p-6 text-center">
                  <div className="text-[#D4AF37] text-4xl font-bold font-display text-glow">{stats.events}</div>
                  <div className="text-slate-400 text-sm">Eventos</div>
                </div>
              </div>

              {posts && posts.length > 0 && (
                <div className="mb-20">
                  <h2 className="text-white text-3xl font-bold font-display mb-8">Últimos Descubrimientos</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {posts.map((post) => (
                      <Link key={post.id} href={`/blog/${post.slug}`} className="bg-white/5 rounded-lg overflow-hidden hover:border hover:border-[#D4AF37]/50">
                        <div className="aspect-video bg-cover" style={{backgroundImage: `url("${post.featured_image_url || 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800'}")`}}></div>
                        <div className="p-4">
                          <h3 className="text-white font-bold font-display">{post.title}</h3>
                          <p className="text-slate-400 text-sm line-clamp-2">{post.summary}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </main>

            <footer className="border-t border-white/10 pt-8 pb-4 text-center">
              <p className="text-slate-400 text-sm">© 2024 Cástor & Póllux - Arica, Chile</p>
            </footer>
          </div>
        </div>
      </div>
    </>
  )
}

export async function getServerSideProps() {
  const supabase = getSupabaseAdmin()

  const { data: news } = await supabase
    .from('news')
    .select('*')
    .eq('published', true)
    .order('published_at', { ascending: false })
    .limit(3)

  const { data: events } = await supabase
    .from('events')
    .select('*')
    .gte('event_date', new Date().toISOString())
    .order('event_date', { ascending: true })
    .limit(2)

  const { data: posts } = await supabase
    .from('posts')
    .select('*')
    .eq('published', true)
    .order('published_at', { ascending: false })
    .limit(3)

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

  return {
    props: {
      news: news || [],
      events: events || [],
      posts: posts || [],
      stats: {
        members: membersCount || 247,
        observations: 1200,
        posts: postsCount || 5,
        events: eventsCount || 8,
      },
    },
  }
}
