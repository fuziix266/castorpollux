import Head from 'next/head'
import Link from 'next/link'
import { getSupabaseAdmin } from '../lib/supabaseServer'

export default function Gallery({ photos }) {
  return (
    <>
      <Head>
        <title>Galería - Cástor & Póllux</title>
      </Head>
      <div className="min-h-screen bg-gray-900 text-white p-8">
        <h1 className="text-4xl font-bold mb-6">Galería Astronómica</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {photos && photos.length > 0 ? photos.map((photo) => (
            <div key={photo.id} className="bg-gray-800 rounded-lg overflow-hidden">
              <img src={photo.publicUrl || 'https://via.placeholder.com/400'} alt={photo.caption} className="w-full h-64 object-cover" />
              <div className="p-4">
                <p className="text-sm">{photo.caption || photo.filename}</p>
              </div>
            </div>
          )) : (
            <p className="col-span-3 text-center">No hay fotos disponibles</p>
          )}
        </div>
        <Link href="/" className="text-blue-400 hover:underline mt-6 inline-block">← Volver al inicio</Link>
      </div>
    </>
  )
}

export async function getServerSideProps() {
  const supabase = getSupabaseAdmin()
  const { data: photos } = await supabase
    .from('photos')
    .select('*')
    .order('uploaded_at', { ascending: false })
  return {
    props: { photos: photos || [] }
  }
}
