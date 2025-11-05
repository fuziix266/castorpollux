// Script para poblar la base de datos con contenido inicial del blog Cástor & Póllux
// Ejecutar con: node scripts/seed-content.js
// Asegúrate de tener las variables de entorno configuradas en .env.local

require('dotenv').config({ path: '.env.local' })
const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Faltan variables de entorno: NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_KEY')
  console.error('💡 Copia .env.local.example a .env.local y configura tus credenciales')
  process.exit(1)
}

console.log('🔌 Conectando a Supabase:', supabaseUrl)
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
      featured_image_url: 'https://images.unsplash.com/photo-1532693322450-2cb5c511067d?w=1200&q=80',
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

Se habló sobre planetas, estrellas, nebulosas, galaxias y cúmulos estelares. También se mostró el uso de diferentes instrumentos como telescopios, binoculares y software de astronomía.

Los estudiantes mostraron gran interés y realizaron numerosas preguntas sobre el universo y la astronomía.

La charla fue dada el día martes 18 de junio de 2019.`,
      featured_image_url: 'https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=1200&q=80',
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
      content: `El día 20 de junio, fuimos invitados para una actividad en el poblado de Cobija, comuna de Camarones, con motivo del Machaq Mara (Año Nuevo Aymara).

En la mañana se realizó un trekking a las "casitas" de los gentilares, nombre que le dan en este lugar a los supuestos habitantes ya perdidos en los albores del tiempo.

Por la tarde, se realizaron diversas actividades culturales con la comunidad, incluyendo ceremonias tradicionales y presentaciones de danzas ancestrales.

Por la noche, nos desplazamos hasta el colegio, donde el único profesor y su alumna pudieron observar las estrellas a través de un telescopio, soportando las bajas temperaturas del clima precordillerano.

Fue una experiencia enriquecedora que nos permitió compartir la astronomía con comunidades alejadas de la ciudad.`,
      featured_image_url: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=1200&q=80',
      category: 'divulgacion',
      tags: ['divulgacion', 'observacion', 'viajes', 'cultura'],
      published: true,
      published_at: '2019-07-14T00:00:00Z',
      author_id: authorId
    },
    {
      title: 'Observación de la Nebulosa de Orión',
      slug: 'observacion-nebulosa-orion',
      excerpt: 'Una de las joyas del cielo nocturno del hemisferio sur es sin duda la Nebulosa de Orión (M42).',
      content: `La Nebulosa de Orión (M42) es uno de los objetos más espectaculares que podemos observar en el cielo nocturno. Ubicada en la constelación de Orión, es visible a simple vista como una mancha difusa en la "espada" del cazador celeste.

Con un telescopio modesto, la nebulosa revela una increíble cantidad de detalles. Su característica coloración verdosa (aunque nuestros ojos no captan todos los colores que registra la fotografía) y las estrellas del trapecio en su centro son un espectáculo impresionante.

Esta nebulosa es una región de formación estelar, donde nuevas estrellas están naciendo constantemente. Se encuentra a aproximadamente 1,350 años luz de distancia y tiene un diámetro de 24 años luz.

Desde el desierto de Atacama, con sus cielos privilegiados, la Nebulosa de Orión se observa con una claridad excepcional.`,
      featured_image_url: 'https://images.unsplash.com/photo-1614313913007-2b4ae8ce32d6?w=1200&q=80',
      category: 'observacion',
      tags: ['observacion', 'nebulosas', 'astrofotografia'],
      published: true,
      published_at: '2019-08-20T00:00:00Z',
      author_id: authorId
    },
    {
      title: 'Cohetería Experimental en Arica',
      slug: 'coheteria-experimental',
      excerpt: 'Además de la astronomía, nos apasiona la cohetería experimental. Construimos y lanzamos cohetes de agua.',
      content: `La cohetería experimental es otra de nuestras pasiones. Regularmente construimos cohetes de agua y papel, que lanzamos en eventos públicos y educativos.

Los cohetes de agua funcionan mediante presión de aire y agua, alcanzando alturas impresionantes. Es una excelente manera de enseñar principios de física como la tercera ley de Newton (acción y reacción), aerodinámica y trayectorias parabólicas.

Hemos realizado talleres en colegios donde los estudiantes construyen sus propios cohetes y los lanzan. La emoción en sus rostros cuando ven volar su creación es invaluable.

También experimentamos con cohetes de combustible sólido (principalmente azúcar y nitrato de potasio), siempre con las medidas de seguridad apropiadas y en zonas autorizadas.`,
      featured_image_url: 'https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?w=1200&q=80',
      category: 'coheteria',
      tags: ['coheteria', 'divulgacion', 'educacion'],
      published: true,
      published_at: '2019-09-15T00:00:00Z',
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

  // Crear noticias
  const sampleNews = [
    {
      title: 'Nueva Observación Pública en Morro de Arica',
      slug: 'observacion-publica-morro',
      summary: 'Invitamos a toda la comunidad a nuestra próxima observación pública este sábado.',
      content: `Este sábado 15 de noviembre realizaremos una nueva observación pública en el Morro de Arica. 

Traeremos nuestros telescopios para que todos puedan observar la Luna, Júpiter con sus lunas galileanas, Saturno y sus anillos, y diversos objetos de cielo profundo.

La actividad es completamente gratuita y está abierta a todo público. Comenzamos a las 21:00 horas.

¡Los esperamos!`,
      image_url: 'https://images.unsplash.com/photo-1464802686167-b939a6910659?w=800&q=80',
      published: true,
      published_at: new Date().toISOString(),
      author_id: authorId
    },
    {
      title: 'Cástor & Póllux celebra 8 años',
      slug: 'aniversario-8-anos',
      summary: 'Este 24 de noviembre celebramos 8 años de pasión por la astronomía en Arica.',
      content: `El 24 de noviembre de 2021 cumplimos 8 años como agrupación. Han sido años de aprendizaje, observaciones inolvidables, amistades y mucha divulgación.

Agradecemos a todos los que han sido parte de este viaje astronómico. A nuestros miembros activos, a las personas que asisten a nuestras observaciones públicas, y a todas las instituciones que nos han apoyado.

Seguiremos trabajando para acercar la astronomía a la comunidad ariqueña.`,
      image_url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80',
      published: true,
      published_at: '2021-11-24T00:00:00Z',
      author_id: authorId
    }
  ]

  for (const news of sampleNews) {
    const { error } = await supabase.from('news').insert(news)
    if (error && !error.message.includes('duplicate')) {
      console.error(`Error creando noticia ${news.title}:`, error)
    } else if (!error) {
      console.log(`✅ Noticia creada: ${news.title}`)
    }
  }

  // Crear eventos
  const sampleEvents = [
    {
      title: 'Star Party Mensual - Diciembre',
      description: 'Nuestra reunión mensual de observación en el Morro de Arica. Trae tu telescopio o usa los nuestros.',
      event_date: '2025-12-15',
      event_time: '21:00:00',
      location: 'Morro de Arica',
      location_details: 'Cumbre del Morro, sector mirador principal',
      image_url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80',
      organizer_id: authorId,
      event_type: 'star-party',
      published: true
    },
    {
      title: 'Taller: Introducción a la Astrofotografía',
      description: 'Aprende los fundamentos de la astrofotografía: equipos, técnicas de captura y procesamiento básico.',
      event_date: '2025-12-20',
      event_time: '19:00:00',
      location: 'Centro Cultural Arica',
      location_details: 'Sala de conferencias, segundo piso',
      image_url: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=800&q=80',
      organizer_id: authorId,
      event_type: 'workshop',
      max_attendees: 30,
      registration_required: true,
      published: true
    }
  ]

  for (const event of sampleEvents) {
    const { error } = await supabase.from('events').insert(event)
    if (error && !error.message.includes('duplicate')) {
      console.error(`Error creando evento ${event.title}:`, error)
    } else if (!error) {
      console.log(`✅ Evento creado: ${event.title}`)
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
