# Cástor & Póllux — Sitio Web

Proyecto Next.js + Supabase para la agrupación de astronomía y cohetería de Arica, Chile.

## 🚀 Stack Tecnológico

- **Framework:** Next.js 14.2.0 (React)
- **Estilos:** Tailwind CSS 3.4.18
- **Base de Datos:** Supabase (Postgres + Storage + Auth)
- **Deploy:** Vercel

## 📁 Estructura del Proyecto

```
castorpollux/
├── pages/                 # Páginas y rutas
│   ├── api/              # API routes (serverless)
│   ├── admin/            # Panel de administración
│   ├── index.js          # Página principal
│   ├── gallery.js        # Galería de fotos
│   └── about.js          # Acerca de
├── lib/                  # Utilidades y clientes
│   ├── supabaseClient.js # Cliente Supabase (browser)
│   └── supabaseServer.js # Cliente Supabase (server)
├── scripts/              # Scripts utilitarios
│   ├── import-images.js  # Importar imágenes a Supabase
│   └── seed-content.js   # Poblar DB con contenido inicial
├── material/             # Contenido descargado del blog original
└── supabase.md           # SQL schema y documentación DB
```

## 🗄️ Base de Datos

La estructura completa de la base de datos está en `supabase.md`. Incluye:

- **users** — Usuarios/administradores
- **posts** — Artículos del blog
- **news** — Noticias cortas
- **events** — Eventos astronómicos
- **galleries** — Colecciones de fotos
- **photos** — Fotos individuales
- **members** — Miembros destacados
- **site_settings** — Configuración del sitio

### Setup de Base de Datos

1. Crea un proyecto en [Supabase](https://supabase.com)
2. Ejecuta el SQL en `supabase.md` en el SQL Editor
3. Crea los buckets de Storage: `photos`, `uploads`, `avatars`
4. Configura las políticas de Storage (ver `supabase.md`)

## 🔧 Instalación y Desarrollo Local

### 1. Instalar dependencias

```powershell
npm install
```

### 2. Configurar variables de entorno

Crea `.env.local` en la raíz:

```env
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key
SUPABASE_SERVICE_KEY=tu-service-role-key
ADMIN_PASSWORD=tu-password-admin
```

### 3. Poblar la base de datos con contenido inicial

```powershell
node scripts/seed-content.js
```

### 4. (Opcional) Importar imágenes desde material/

Si tienes imágenes en `material/Facebook_files`:

```powershell
node scripts/import-images.js
```

### 5. Ejecutar en desarrollo

```powershell
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000)

### 6. Build de producción

```powershell
npm run build
npm start
```

## 🌐 Deploy en Vercel

### Configuración Inicial

1. Conecta tu repositorio de GitHub a Vercel
2. Vercel detectará automáticamente que es un proyecto Next.js
3. Configura las variables de entorno en Vercel:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_KEY`
   - `ADMIN_PASSWORD`

### Troubleshooting Deploy

Si encuentras errores de dependencias (ej. `tailwindcss@3.5.4`):

1. **Limpiar caché de Vercel:**
   - Project → Deployments → selecciona el último deploy
   - Click en "Redeploy"
   - **NO marques** "Use existing Build Cache"

2. **Verificar comando de instalación:**
   - Settings → Build & Development Settings
   - Install Command debe ser `npm install` (o dejarlo en blanco para el default)

3. **Lockfile comprometido:**
   - `package-lock.json` está en el repo para fijar versiones
   - Si Vercel sigue fallando, borra cache y redeploy

## 📝 Contenido del Sitio

El contenido original proviene del blog de Blogspot: https://castorypolluxarica.blogspot.com/

Todo el contenido descargado con HTTrack está en `material/castor & pollux/` y se usa como referencia para poblar la nueva base de datos.

## 🎨 Diseño

Los prototipos HTML están en `material/diseño frontend/` e incluyen:

- Página principal (Hub)
- Galería de fotos
- Blog de astronomía
- Panel de administración
- Gestión de posts, noticias y galerías

## 🔐 Panel de Administración

Accede a `/admin` con la contraseña configurada en `ADMIN_PASSWORD`.

**Funcionalidades:**
- Dashboard con estadísticas
- Gestión de posts del blog
- Gestión de noticias
- Gestión de galerías de fotos
- Gestión de eventos
- Configuración del sitio

## 🛠️ Scripts Disponibles

- `npm run dev` — Servidor de desarrollo
- `npm run build` — Build de producción
- `npm start` — Servidor de producción
- `node scripts/seed-content.js` — Poblar DB con contenido inicial
- `node scripts/import-images.js` — Importar imágenes a Supabase

## ⚠️ Notas de Seguridad

- **NO** comitees `.env.local` ni `supabase.md` con claves reales
- `supabase.md` está en `.gitignore` para evitar leaks de credenciales
- Las políticas RLS de Supabase controlan el acceso a los datos
- El admin usa autenticación simple por cookie (para producción considera Supabase Auth)