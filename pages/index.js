import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6">
      <header className="w-full max-w-5xl flex items-center justify-between py-6">
        <h1 className="text-3xl font-extrabold">Castror & Pollux</h1>
        <nav className="flex gap-4">
          <Link href="/">Home</Link>
          <Link href="/gallery">Gallery</Link>
          <Link href="/about">About</Link>
          <Link href="/admin">Admin</Link>
        </nav>
      </header>

      <main className="w-full max-w-5xl text-center">
        <h2 className="text-4xl font-bold mb-4">Astrophotography from Arica</h2>
        <p className="text-gray-600 mb-8">Fotos y eventos del grupo de aficionados Castror & Pollux.</p>
        <div className="flex justify-center gap-4">
          <Link href="/gallery"><a className="px-6 py-3 bg-indigo-600 text-white rounded-lg">Ver galería</a></Link>
          <Link href="/admin"><a className="px-6 py-3 border rounded-lg">Panel admin</a></Link>
        </div>
      </main>

      <footer className="w-full max-w-5xl mt-16 py-6 text-sm text-gray-500 text-center">Made for Castror & Pollux · Exported assets in <code>/material/</code></footer>
    </div>
  )
}
