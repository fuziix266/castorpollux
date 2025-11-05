import { checkAdminAuth } from '../../lib/adminAuth'
import AdminLayout from '../../components/AdminLayout'
import Link from 'next/link'

export default function AdminDashboard({ stats }) {
  return (
    <AdminLayout title="Dashboard">
      {/* PageHeading */}
      <div className="flex flex-wrap justify-between gap-3 mb-8">
        <div className="flex min-w-72 flex-col gap-2">
          <p className="text-white text-4xl font-black leading-tight tracking-[-0.033em]">Welcome, Admin!</p>
          <p className="text-[#a19db9] text-base font-normal leading-normal">
            Here's a quick overview of your website's recent activity.
          </p>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {/* Recent Posts Card */}
          <div className="flex flex-col rounded-xl bg-admin-darker border border-slate-200/10 p-6 mb-8">
            <div className="flex items-center justify-between gap-3 mb-4">
              <p className="text-white text-lg font-bold leading-tight tracking-[-0.015em]">Recent Blog Posts</p>
              <Link
                href="/admin/posts"
                className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-8 px-4 bg-primary-admin text-white text-sm font-medium leading-normal hover:bg-primary-admin/90"
              >
                <span className="truncate">Manage all posts</span>
              </Link>
            </div>
            <div className="flex flex-col divide-y divide-slate-200/10">
              {stats.recentPosts.length > 0 ? (
                stats.recentPosts.map((post) => (
                  <div key={post.id} className="flex items-center gap-4 px-4 min-h-[72px] py-2 justify-between">
                    <div className="flex items-center gap-4">
                      <div className="text-white flex items-center justify-center rounded-lg bg-[#2b2839] shrink-0 size-12">
                        <span className="material-symbols-outlined">article</span>
                      </div>
                      <div className="flex flex-col justify-center">
                        <p className="text-white text-base font-medium leading-normal line-clamp-1">{post.title}</p>
                        <p className="text-[#a19db9] text-sm font-normal leading-normal line-clamp-2">
                          {new Date(post.created_at).toLocaleDateString('es-CL')}
                        </p>
                      </div>
                    </div>
                    <div className="shrink-0">
                      <p className="text-[#a19db9] text-sm font-normal leading-normal">
                        {post.published ? 'Published' : 'Draft'}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 text-[#a19db9]">
                  <span className="material-symbols-outlined text-4xl mb-2 block">article</span>
                  <p>No posts yet</p>
                </div>
              )}
            </div>
          </div>

          {/* Recent News Card */}
          <div className="flex flex-col rounded-xl bg-admin-darker border border-slate-200/10 p-6">
            <div className="flex items-center justify-between gap-3 mb-4">
              <p className="text-white text-lg font-bold leading-tight tracking-[-0.015em]">Recent News</p>
              <Link
                href="/admin/news"
                className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-8 px-4 bg-primary-admin text-white text-sm font-medium leading-normal hover:bg-primary-admin/90"
              >
                <span className="truncate">Manage all news</span>
              </Link>
            </div>
            <div className="flex flex-col divide-y divide-slate-200/10">
              {stats.recentNews.length > 0 ? (
                stats.recentNews.map((news) => (
                  <div key={news.id} className="flex items-center gap-4 px-4 min-h-[72px] py-2 justify-between">
                    <div className="flex items-center gap-4">
                      <div className="text-white flex items-center justify-center rounded-lg bg-[#2b2839] shrink-0 size-12">
                        <span className="material-symbols-outlined">newspaper</span>
                      </div>
                      <div className="flex flex-col justify-center">
                        <p className="text-white text-base font-medium leading-normal line-clamp-1">{news.title}</p>
                        <p className="text-[#a19db9] text-sm font-normal leading-normal line-clamp-2">
                          {new Date(news.created_at).toLocaleDateString('es-CL')}
                        </p>
                      </div>
                    </div>
                    <div className="shrink-0">
                      <p className="text-[#a19db9] text-sm font-normal leading-normal">
                        {news.published ? 'Published' : 'Draft'}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 text-[#a19db9]">
                  <span className="material-symbols-outlined text-4xl mb-2 block">newspaper</span>
                  <p>No news yet</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="flex flex-col gap-6">
          {/* Stats Card */}
          <div className="flex flex-col rounded-xl bg-admin-darker border border-slate-200/10 p-6">
            <p className="text-white text-lg font-bold leading-tight tracking-[-0.015em] mb-4">Quick Stats</p>
            <div className="flex flex-col gap-4">
              <StatsItem icon="article" label="Total Posts" value={stats.posts} />
              <StatsItem icon="newspaper" label="Total News" value={stats.news} />
              <StatsItem icon="event" label="Upcoming Events" value={stats.events} />
              <StatsItem icon="photo_library" label="Photos" value={stats.photos} />
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-col rounded-xl bg-admin-darker border border-slate-200/10 p-6">
            <p className="text-white text-lg font-bold leading-tight tracking-[-0.015em] mb-4">Quick Actions</p>
            <div className="flex flex-col gap-2">
              <QuickActionButton href="/admin/posts/new" icon="add" label="New Post" />
              <QuickActionButton href="/admin/news/new" icon="add" label="New News" />
              <QuickActionButton href="/admin/events/new" icon="add" label="New Event" />
              <QuickActionButton href="/admin/galleries" icon="photo_library" label="Manage Gallery" />
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}

function StatsItem({ icon, label, value }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <span className="material-symbols-outlined text-primary-admin">{icon}</span>
        <p className="text-[#a19db9] text-sm font-normal leading-normal">{label}</p>
      </div>
      <p className="text-white text-lg font-bold">{value}</p>
    </div>
  )
}

function QuickActionButton({ href, icon, label }) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 px-4 py-3 rounded-lg bg-[#2b2839] hover:bg-[#3b3849] text-white transition-colors"
    >
      <span className="material-symbols-outlined">{icon}</span>
      <p className="text-sm font-medium leading-normal">{label}</p>
    </Link>
  )
}

export async function getServerSideProps(context) {
  // Verificar autenticación
  const isAuthenticated = checkAdminAuth(context)
  
  if (!isAuthenticated) {
    return {
      redirect: {
        destination: '/admin/login',
        permanent: false,
      },
    }
  }

  // Obtener estadísticas desde Supabase
  const { getSupabaseAdmin } = require('../../lib/supabaseServer')
  const supabase = getSupabaseAdmin()

  try {
    // Contar posts
    const { count: postsCount } = await supabase
      .from('posts')
      .select('*', { count: 'exact', head: true })

    // Contar noticias
    const { count: newsCount } = await supabase
      .from('news')
      .select('*', { count: 'exact', head: true })

    // Contar eventos
    const { count: eventsCount } = await supabase
      .from('events')
      .select('*', { count: 'exact', head: true })

    // Contar fotos
    const { count: photosCount } = await supabase
      .from('photos')
      .select('*', { count: 'exact', head: true })

    // Posts recientes
    const { data: recentPosts } = await supabase
      .from('posts')
      .select('id, title, published, created_at')
      .order('created_at', { ascending: false })
      .limit(5)

    // Noticias recientes
    const { data: recentNews } = await supabase
      .from('news')
      .select('id, title, published, created_at')
      .order('created_at', { ascending: false })
      .limit(5)

    // Próximos eventos
    const { data: upcomingEvents } = await supabase
      .from('events')
      .select('id, title, event_date')
      .gte('event_date', new Date().toISOString().split('T')[0])
      .order('event_date', { ascending: true })
      .limit(5)

    return {
      props: {
        stats: {
          posts: postsCount || 0,
          news: newsCount || 0,
          events: eventsCount || 0,
          photos: photosCount || 0,
          recentPosts: recentPosts || [],
          recentNews: recentNews || [],
          upcomingEvents: upcomingEvents || [],
        },
      },
    }
  } catch (error) {
    console.error('Error loading dashboard stats:', error)
    return {
      props: {
        stats: {
          posts: 0,
          news: 0,
          events: 0,
          photos: 0,
          recentPosts: [],
          recentNews: [],
          upcomingEvents: [],
        },
      },
    }
  }
}
