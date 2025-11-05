import { checkAdminAuth } from '../../lib/adminAuth'
import AdminLayout from '../../components/AdminLayout'

export default function AdminDashboard({ stats }) {
  return (
    <AdminLayout title="Dashboard">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Posts"
          value={stats.posts}
          icon="📝"
          color="from-blue-500 to-blue-600"
          href="/admin/posts"
        />
        <StatCard
          title="Noticias"
          value={stats.news}
          icon="📰"
          color="from-green-500 to-green-600"
          href="/admin/news"
        />
        <StatCard
          title="Eventos"
          value={stats.events}
          icon="📅"
          color="from-purple-500 to-purple-600"
          href="/admin/events"
        />
        <StatCard
          title="Fotos"
          value={stats.photos}
          icon="🖼️"
          color="from-pink-500 to-pink-600"
          href="/admin/galleries"
        />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Posts */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <span className="text-2xl mr-2">📝</span>
            Posts Recientes
          </h2>
          <div className="space-y-3">
            {stats.recentPosts.length > 0 ? (
              stats.recentPosts.map((post) => (
                <div key={post.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-800">{post.title}</h3>
                    <p className="text-sm text-gray-500">
                      {post.published ? '✅ Publicado' : '📝 Borrador'}
                    </p>
                  </div>
                  <a
                    href={`/admin/posts/${post.id}`}
                    className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                  >
                    Editar →
                  </a>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-8">No hay posts aún</p>
            )}
          </div>
          <a
            href="/admin/posts"
            className="mt-4 block text-center text-indigo-600 hover:text-indigo-800 font-medium"
          >
            Ver todos los posts →
          </a>
        </div>

        {/* Recent Events */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <span className="text-2xl mr-2">📅</span>
            Próximos Eventos
          </h2>
          <div className="space-y-3">
            {stats.upcomingEvents.length > 0 ? (
              stats.upcomingEvents.map((event) => (
                <div key={event.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-800">{event.title}</h3>
                    <p className="text-sm text-gray-500">
                      {new Date(event.event_date).toLocaleDateString('es-CL')}
                    </p>
                  </div>
                  <a
                    href={`/admin/events/${event.id}`}
                    className="text-purple-600 hover:text-purple-800 text-sm font-medium"
                  >
                    Editar →
                  </a>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-8">No hay eventos próximos</p>
            )}
          </div>
          <a
            href="/admin/events"
            className="mt-4 block text-center text-purple-600 hover:text-purple-800 font-medium"
          >
            Ver todos los eventos →
          </a>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Acciones Rápidas</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <QuickActionCard
            title="Nuevo Post"
            description="Crear un nuevo artículo para el blog"
            icon="📝"
            href="/admin/posts/new"
            color="bg-blue-500"
          />
          <QuickActionCard
            title="Nueva Noticia"
            description="Publicar una noticia destacada"
            icon="📰"
            href="/admin/news/new"
            color="bg-green-500"
          />
          <QuickActionCard
            title="Nuevo Evento"
            description="Crear un evento astronómico"
            icon="📅"
            href="/admin/events/new"
            color="bg-purple-500"
          />
        </div>
      </div>
    </AdminLayout>
  )
}

function StatCard({ title, value, icon, color, href }) {
  return (
    <a
      href={href}
      className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-800">{value}</p>
        </div>
        <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${color} flex items-center justify-center`}>
          <span className="text-3xl">{icon}</span>
        </div>
      </div>
    </a>
  )
}

function QuickActionCard({ title, description, icon, href, color }) {
  return (
    <a
      href={href}
      className="block bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-all hover:-translate-y-1"
    >
      <div className={`w-12 h-12 rounded-lg ${color} flex items-center justify-center mb-4`}>
        <span className="text-2xl">{icon}</span>
      </div>
      <h3 className="font-bold text-gray-800 mb-2">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </a>
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
      .select('id, title, published')
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
          upcomingEvents: [],
        },
      },
    }
  }
}
