// Script para poblar la base de datos con contenido inicial del blog Cástor & Póllux
// Ejecutar con: node scripts/seed-content.js

const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Faltan variables de entorno')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

// Contenido extraído del blog original
const ABOUT_CONTENT = `Cástor & Póllux es una Agrupación de astronomía y cohetería de la ciudad de Arica, ubicada en el extremo septentrional de Chile.

Esta agrupación nace el 24 de noviembre del 2013, luego de una reunión entre un par de amigos que deciden emprender el desafío de hacer ciencia mediante la astronomía.

Nuestros intereses y metas radican en formar una agrupación unida hacía un interés común, aprender cada día mas sobre lo que nos apasiona y divulgar la astronomía hacía la comunidad ariqueña.`

const WHAT_WE_DO_CONTENT = `Nuestras actividades están enfocadas a la astronomía y la cohetería.

En cuanto a la astronomía, realizamos salidas a terreno con nuestros telescopios para observar objetos de cielo profundo, realizar astrofotografía y divulgar.

Tambi\u00e9n realizamos charlas en colegios, universidades y otras instituciones, con el fin de acercar la astronomía a la comunidad.

En cohetería, construimos cohetes de agua y papel, y realizamos lanzamientos en eventos públicos y educativos.`

async function seedContent() {
  console.log('🌱 Iniciando seed de contenido...')

  // Crear usuario admin si no existe
  const { data: users } = await supabase.from('users').select('id').eq('email', 'admin@castorypollux.cl')
  let authorId = users?.[0]?.id

  if (!authorId) {
    const { data, error } = await supabase.from('users').insert({
      email: 'admin@castorypollux.cl',
      full_name: 'Administrador',
      role: 'admin'
    }).select()
    if (error) {
      console.error('Error creando usuario:', error)
      return
    }
    authorId = data[0].id
    console.log('✅ Usuario admin creado')
  }

  // Crear galería general si no existe
  const { data: galleries } = await supabase.from('galleries').select('id').eq('slug', 'general')
  let galleryId = galleries?.[0]?.id

  if (!galleryId) {
    const { data, error } = await supabase.from('galleries').insert({
      title: 'Galería General',
      slug: 'general',
      description: 'Colección de fotografías astronómicas de nuestra comunidad',
      published: true,
      created_by: authorId
    }).select()
    if (error) {
      console.error('Error creando galería:', error)
      return
    }
    galleryId = data[0].id
    console.log('✅ Galería general creada')
  }

  // Crear posts de ejemplo del blog
  const samplePosts = [
    {
      title: 'Eclipse Solar 2019 - Reporte de Jonathan Moncada',
      slug: 'eclipse-solar-2019-jonathan',
      excerpt: 'El viaje fue largo e intenso. Mi segundo eclipse total, pero el primero que observo tan detalladamente.',
      content: `El viaje fue largo e intenso. Viajé a la ciudad de Santiago donde me junte con los amigos de "ECLIPSE AVENTURA", los mismos con los cuales un año antes habíamos observado el eclipse anular desde la ciudad de Coyhaique.

Desde Santiago emprendimos el rumbo a la región de Coquimbo, donde nos esperaba el tan ansiado eclipse total. Mi segundo eclipse total, pero el primero que observo tan detalladamente.

La primera parada fue en el pueblo de Los Molles, donde pernoctamos en la casa de veraneo de Franco Gomara, en compañia de unos vinitos y buena conversación.

El día del eclipse todo transcurrió en un ambiente de nerviosismo y ansiedad, solo queríamos que las horas pasaran y llegara el tan ansiado momento de la totalidad, ese momento íntimo y majestuoso que se queda grabado en lo más profundo de la memoria.

Y la totalidad se hacía presente, los 2 minutos y 36 segundos más cortos de la vida. La vista del eclipse se hacía eterna y quedaba grabada en la retina. Las emociones fluían y más de alguna lagrima se asomaba entre los párpados.`,
      category: 'eclipse',
      tags: ['eclipse', 'observacion', 'viajes'],
      published: true,
      published_at: '2020-01-12T00:00:00Z',
      author_id: authorId
    },
    {
      title: 'Charla en el CISA',
      slug: 'charla-cisa',
      excerpt: 'Fuimos contactados para dictar una charla sobre astronomía en el Colegio Italiano Santa Ana.',
      content: `Fuimos contactados por el profesor de física Eduardo Roco, para dictar una charla en el Colegio Italiano Santa Ana (CISA).

La charla trató principalmente sobre las distintas cosas que podemos observar en el cielo, tanto a simple vista como a través de instrumentación astronómica.

La charla fue dada el día martes 18 de junio de 2019.`,
      category: 'divulgacion',
      tags: ['divulgacion', 'charla', 'colegio'],
      published: true,
      published_at: '2019-07-14T00:00:00Z',
      author_id: authorId
    },
    {
      title: 'Machaq Mara en Cobija',
      slug: 'machaq-mara-cobija',
      excerpt: 'El día 20 de junio, fuimos invitados para una actividad en el poblado de Cobija, comuna de Camarones.',
      content: `El día 20 de junio, fuimos invitados para una actividad en el poblado de Cobija, comuna de Camarones, con motivo del Machaq Mara.

En la mañana se realizó un trekking a las "casitas" de los gentilares, nombre que le dan en este lugar a los supuestos habitantes ya perdidos en los albores del tiempo.

Por la noche, nos desplazamos hasta el colegio, donde el único profesor y su alumna pudieron observar las estrellas a través de un telescopio, soportando las bajas temperaturas del clima precordillerano.`,
      category: 'divulgacion',
      tags: ['divulgacion', 'observacion', 'viajes'],
      published: true,
      published_at: '2019-07-14T00:00:00Z',
      author_id: authorId
    }
  ]

  for (const post of samplePosts) {
    const { error } = await supabase.from('posts').insert(post)
    if (error && !error.message.includes('duplicate')) {
      console.error(`Error creando post ${post.title}:`, error)
    } else if (!error) {
      console.log(`✅ Post creado: ${post.title}`)
    }
  }

  // Configuraciones del sitio
  await supabase.from('site_settings').upsert({
    key: 'about_content',
    value: JSON.stringify(ABOUT_CONTENT)
  })

  await supabase.from('site_settings').upsert({
    key: 'what_we_do_content',
    value: JSON.stringify(WHAT_WE_DO_CONTENT)
  })

  console.log('✅ Configuraciones del sitio actualizadas')
  console.log('🎉 Seed completado')
}

seedContent().catch(console.error)
