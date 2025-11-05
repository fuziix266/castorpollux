import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { getSupabaseAdmin } from '../../lib/supabaseServer'

export default function BlogPost({ post }) {
  const router = useRouter()

  if (router.isFallback) {
    return <div className="flex items-center justify-center min-h-screen bg-[#010409] text-white">Cargando...</div>
  }

  if (!post) {
    return <div className="flex items-center justify-center min-h-screen bg-[#010409] text-white">Post no encontrado</div>
  }

  return (
    <>
      <Head>
        <title>{post.title} - Cástor & Póllux</title>
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
        .prose {
          max-width: none;
        }
        .prose h1, .prose h2, .prose h3 {
          font-family: 'Orbitron', sans-serif;
          color: #D4AF37;
          margin-top: 2rem;
          margin-bottom: 1rem;
        }
        .prose p {
          margin-bottom: 1.5rem;
          line-height: 1.8;
        }
        .prose ul, .prose ol {
          margin-left: 1.5rem;
          margin-bottom: 1.5rem;
        }
        .prose a {
          color: #D4AF37;
          text-decoration: underline;
        }
        .prose a:hover {
          color: white;
        }
        .prose img {
          border-radius: 0.5rem;
          margin: 2rem 0;
        }
      `}</style>

      <div className="relative min-h-screen w-full flex flex-col bg-[#010409] text-slate-300">
        <div className="relative z-10 flex h-full grow flex-col px-4 sm:px-10 md:px-20 lg:px-24">
          <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col">
            {/* Header */}
            <header className="sticky top-5 z-50 flex items-center justify-between whitespace-nowrap rounded-full border border-solid border-slate-100/10 bg-black/30 px-6 py-3 backdrop-blur-xl mb-12">
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

            {/* Article */}
            <article className="flex-1">
              {/* Back Link */}
              <Link href="/blog" className="inline-flex items-center gap-2 text-[#D4AF37] hover:text-white transition-colors mb-8">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Volver al blog
              </Link>

              {/* Featured Image */}
              {post.featured_image_url && (
                <div className="w-full aspect-video bg-cover bg-center rounded-lg mb-8" style={{backgroundImage: `url("${post.featured_image_url}")`}}></div>
              )}

              {/* Meta */}
              <div className="flex items-center gap-4 text-slate-500 text-sm mb-6">
                <time dateTime={post.published_at}>
                  {new Date(post.published_at || post.created_at).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
                </time>
                {post.tags && post.tags.length > 0 && (
                  <span className="flex gap-2">
                    {post.tags.map((tag, i) => (
                      <span key={i} className="px-3 py-1 bg-white/10 rounded-full text-xs">{tag}</span>
                    ))}
                  </span>
                )}
              </div>

              {/* Title */}
              <h1 className="text-white text-4xl md:text-5xl font-bold leading-tight font-display mb-6" style={{textShadow: '0 0 8px rgba(212, 175, 55, 0.3), 0 0 16px rgba(212, 175, 55, 0.2)'}}>
                {post.title}
              </h1>

              {/* Summary */}
              {post.summary && (
                <p className="text-slate-400 text-lg mb-8 italic border-l-4 border-[#D4AF37] pl-4">
                  {post.summary}
                </p>
              )}

              {/* Content */}
              <div className="prose prose-invert prose-lg max-w-none text-slate-300">
                {post.content ? (
                  <div dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br />') }} />
                ) : (
                  <p>Contenido no disponible</p>
                )}
              </div>
            </article>

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

export async function getServerSideProps({ params }) {
  const supabase = getSupabaseAdmin()

  const { data: post } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', params.slug)
    .eq('published', true)
    .single()

  if (!post) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      post,
    },
  }
}
