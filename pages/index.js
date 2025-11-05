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
              </div>
            </header>

            <main className="flex-1 py-20">
              <div className="text-center mb-16">
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
