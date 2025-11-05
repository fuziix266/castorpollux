import Head from 'next/head'
import Link from 'next/link'
import { getSupabaseAdmin } from '../lib/supabaseServer'

export default function About({ settings, membersCount }) {
  return (
    <>
      <Head>
        <title>Nosotros - Cástor & Póllux</title>
      </Head>
      <div className="min-h-screen bg-gray-900 text-white p-8">
        <h1 className="text-4xl font-bold mb-6">Sobre Nosotros</h1>
        <div className="max-w-4xl">
          <p className="text-lg mb-4">Cástor & Póllux es un club de astronomía con sede en Arica, Chile.</p>
          <p className="text-lg">Miembros activos: {membersCount || 247}</p>
        </div>
        <Link href="/" className="text-blue-400 hover:underline mt-4 inline-block"> Volver al inicio</Link>
      </div>
    </>
  )
}

export async function getServerSideProps() {
  const supabase = getSupabaseAdmin()
  const { count: membersCount } = await supabase
    .from('members')
    .select('*', { count: 'exact', head: true })
  return {
    props: { membersCount: membersCount || 247 }
  }
}
