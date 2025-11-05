import Head from 'next/head'
import Link from 'next/link'

export default function Home({ news, events, posts, stats }) {
  return (
    <>
      <Head>
        <title>Cástor & Póllux - Astronomía en Arica</title>
      </Head>
      <div className="min-h-screen bg-gray-900 text-white p-8">
        <h1 className="text-4xl font-bold">Bienvenido a Cástor & Póllux</h1>
        <p>Sitio en construcción...</p>
      </div>
    </>
  )
}

export async function getServerSideProps() {
  return {
    props: {
      news: [],
      events: [],
      posts: [],
      stats: { members: 247, observations: 1200, posts: 5, events: 8 }
    }
  }
}
