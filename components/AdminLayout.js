import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Head from 'next/head'

export default function AdminLayout({ children, title = 'Admin' }) {
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin/login')
  }

  const navItems = [
    { name: 'Dashboard', href: '/admin', icon: 'dashboard' },
    { name: 'Manage Posts', href: '/admin/posts', icon: 'article' },
    { name: 'Manage News', href: '/admin/news', icon: 'newspaper' },
    { name: 'Manage Events', href: '/admin/events', icon: 'event' },
    { name: 'Manage Gallery', href: '/admin/galleries', icon: 'photo_library' },
    { name: 'Settings', href: '/admin/settings', icon: 'settings' },
  ]

  const isActive = (href) => {
    if (href === '/admin') {
      return router.pathname === href
    }
    return router.pathname.startsWith(href)
  }

  return (
    <>
      <Head>
        <title>{title} - Cástor & Póllux Admin</title>
        <html className="dark" />
      </Head>

      <div className="relative flex h-auto min-h-screen w-full flex-col dark">
        <div className="flex h-full flex-1">
          {/* SideNavBar */}
          <aside className={`flex w-64 flex-col border-r border-slate-200/10 bg-admin-darker p-4 ${sidebarOpen ? '' : 'hidden lg:flex'}`}>
            <div className="flex flex-col gap-4">
              {/* Logo */}
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-br from-primary-admin to-purple-600 rounded-full size-10 flex items-center justify-center">
                  <span className="text-white text-xl">⭐</span>
                </div>
                <div className="flex flex-col">
                  <h1 className="text-white text-base font-medium leading-normal">Cástor & Póllux</h1>
                  <p className="text-[#a19db9] text-sm font-normal leading-normal">Admin Panel</p>
                </div>
              </div>

              {/* Navigation */}
              <nav className="flex flex-col gap-2">
                {navItems.map((item) => {
                  const active = isActive(item.href)
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg ${
                        active
                          ? 'bg-primary-admin/20 text-white'
                          : 'text-white/80 hover:bg-white/5'
                      }`}
                    >
                      <span className={`material-symbols-outlined ${active ? 'fill' : ''}`}>
                        {item.icon}
                      </span>
                      <p className="text-sm font-medium leading-normal">{item.name}</p>
                    </Link>
                  )
                })}
              </nav>
            </div>

            {/* Logout */}
            <div className="mt-auto flex flex-col gap-1">
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-3 py-2 text-white/80 hover:bg-white/5 rounded-lg w-full text-left"
              >
                <span className="material-symbols-outlined">logout</span>
                <p className="text-sm font-medium leading-normal">Logout</p>
              </button>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 bg-admin-dark">
            {/* TopNavBar */}
            <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200/10 px-10 py-3">
              <div className="flex items-center gap-4 text-white">
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="lg:hidden p-2 rounded-lg hover:bg-white/5"
                >
                  <span className="material-symbols-outlined">menu</span>
                </button>
                <div className="size-4">
                  <svg fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                    <path d="M44 4H30.6666V17.3334H17.3334V30.6666H4V44H44V4Z"></path>
                  </svg>
                </div>
                <h2 className="text-white text-lg font-bold leading-tight tracking-[-0.015em]">{title}</h2>
              </div>
              <a
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary-admin text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-primary-admin/90"
              >
                <span className="truncate">View Site</span>
              </a>
            </header>

            {/* Page Content */}
            <div className="p-10">
              {children}
            </div>
          </main>
        </div>
      </div>
    </>
  )
}
