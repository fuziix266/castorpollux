import Head from 'next/head'
import Link from 'next/link'
import { getSupabaseAdmin } from '../../lib/supabaseServer'

export default function Blog({ posts }) {
  return (
    <>
      <Head>
        <title>Blog - Cástor & Póllux</title>
        <html className="dark" />
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
      `}</style>

      <div className="relative min-h-screen w-full flex flex-col bg-[#010409] text-slate-300">
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
                  <Link href="/blog" className="text-[#D4AF37] text-sm font-bold">Blog</Link>
                  <Link href="/gallery" className="text-slate-300 text-sm font-medium hover:text-[#D4AF37] transition-colors">Galería</Link>
                  <Link href="/about" className="text-slate-300 text-sm font-medium hover:text-[#D4AF37] transition-colors">Nosotros</Link>
                </nav>
              </div>
            </header>

            <main className="flex-1 mt-8">
              {/* Hero Banner */}
              <div className="bg-cover bg-center flex flex-col justify-end overflow-hidden rounded-lg min-h-[280px] mb-12" style={{backgroundImage: 'linear-gradient(0deg, rgba(1, 4, 9, 0.8) 0%, rgba(1, 4, 9, 0) 50%), url("https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=1600&q=80")'}}>
                <div className="flex p-8">
                  <h1 className="text-white tracking-light text-4xl md:text-5xl font-bold leading-tight font-display">Diario Celestial de Arica</h1>
                </div>
              </div>

              {/* Posts Grid */}
              <div className="grid grid-cols-1 gap-8 px-4">
                {posts && posts.length > 0 ? posts.map((post) => (
                  <div key={post.id} className="flex flex-col-reverse md:flex-row items-stretch justify-between gap-6 rounded-lg pb-6 border-b border-white/10">
                    <div className="flex flex-[2_2_0px] flex-col gap-4">
                      <div className="flex flex-col gap-2">
                        <p className="text-slate-500 text-sm font-normal leading-normal">
                          {new Date(post.published_at || post.created_at).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
                          {post.tags && post.tags.length > 0 && ` | ${post.tags[0]}`}
                        </p>
                        <Link href={`/blog/${post.slug}`} className="text-white hover:text-[#D4AF37] transition-colors text-2xl font-bold leading-tight font-display">
                          {post.title}
                        </Link>
                        <p className="text-slate-400 text-sm font-normal leading-normal">
                          {post.summary || post.content?.substring(0, 200) + '...'}
                        </p>
                      </div>
                      <Link href={`/blog/${post.slug}`} className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-8 px-4 bg-white/10 text-white hover:bg-[#D4AF37] hover:text-[#010409] transition-colors text-sm font-medium leading-normal w-fit">
                        <span className="truncate">Leer más</span>
                      </Link>
                    </div>
                    <div className="w-full md:w-auto bg-center bg-no-repeat aspect-video bg-cover rounded-lg flex-1" style={{backgroundImage: `url("${post.featured_image_url || 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&q=80'}")`}}></div>
                  </div>
                )) : (
                  <p className="text-center text-slate-400 py-12">No hay artículos disponibles</p>
                )}
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
  const supabase = getSupabaseAdmin()

  const { data: posts } = await supabase
    .from('posts')
    .select('*')
    .eq('published', true)
    .order('published_at', { ascending: false })

  return {
    props: {
      posts: posts || [],
    },
  }
}
