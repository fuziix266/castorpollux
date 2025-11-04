# Supabase — scripts y guía rápida para Castror & Pollux

Este archivo contiene el SQL de esquema inicial, reglas recomendadas, y ejemplos de scripts Node.js para importar imágenes desde la carpeta `material/Facebook_files` a Supabase Storage y crear registros en la tabla `photos`.

IMPORTANTE: No incluyas claves privadas en el repositorio. Usa variables de entorno (p.ej. `NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_SERVICE_KEY`).

---

## Esquema SQL (Postgres)

-- Crear extensión para UUIDs
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Tabla de usuarios (admin)
CREATE TABLE IF NOT EXISTS public.users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  role text NOT NULL DEFAULT 'member',
  created_at timestamptz DEFAULT now()
);

-- Tabla de fotos
CREATE TABLE IF NOT EXISTS public.photos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  filename text NOT NULL,
  storage_path text NOT NULL,
  caption text,
  photographer text,
  source text,
  width int,
  height int,
  taken_at timestamptz,
  created_at timestamptz DEFAULT now()
);

-- Tabla de posts/blog
CREATE TABLE IF NOT EXISTS public.posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  body text,
  author_id uuid REFERENCES public.users(id) ON DELETE SET NULL,
  published boolean DEFAULT FALSE,
  published_at timestamptz,
  created_at timestamptz DEFAULT now()
);

-- Indices útiles
CREATE INDEX IF NOT EXISTS idx_photos_created_at ON public.photos(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_posts_published_at ON public.posts(published_at DESC);

---

## Reglas RLS (opcional, ejemplo para Supabase)
-- Habilitar RLS en `photos` y permitir select público, inserts para autenticados
ALTER TABLE public.photos ENABLE ROW LEVEL SECURITY;

-- Policy: permitir lectura a cualquier usuario (público)
CREATE POLICY "public_select_photos" ON public.photos FOR SELECT USING (true);

-- Policy: permitir insert a usuarios autenticados (ejemplo)
CREATE POLICY "auth_insert_photos" ON public.photos FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

---

## Script Node.js para importar imágenes (ejemplo)

// Requiere: npm install @supabase/supabase-js fs-extra mime

const fs = require('fs-extra');
const path = require('path');
const mime = require('mime');
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY; // key de servicio (no en cliente)
const BUCKET = 'photos';

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error('Define SUPABASE_URL y SUPABASE_SERVICE_KEY en variables de entorno');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

async function uploadFolder(localFolder) {
  const files = await fs.readdir(localFolder);
  for (const f of files) {
    const full = path.join(localFolder, f);
    const stat = await fs.stat(full);
    if (stat.isFile()) {
      const contentType = mime.getType(full) || 'application/octet-stream';
      const destPath = `uploads/${Date.now()}-${f}`;
      console.log('Subiendo', f, '->', destPath);
      const fileBuffer = await fs.readFile(full);
      const { data, error } = await supabase.storage.from(BUCKET).upload(destPath, fileBuffer, { contentType });
      if (error) {
        console.error('Upload error', error);
        continue;
      }
      // Crear registro en tabla photos usando RPC o API
      const insertRes = await supabase.from('photos').insert([{
        filename: f,
        storage_path: data.path,
        source: 'facebook-scraped'
      }]);
      if (insertRes.error) console.error('DB insert error', insertRes.error);
    }
  }
}

uploadFolder('./material/Facebook_files').catch(console.error);

---

## Ejemplo de uso en Next.js (client)

// Inicializar cliente (solo para queries públicas)
import { createClient } from '@supabase/supabase-js';
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

// Listar fotos
export async function listPhotos() {
  const { data, error } = await supabase.from('photos').select('*').order('created_at', { ascending: false });
  if (error) throw error;
  return data;
}

---

## Pasos recomendados para preparar el proyecto Supabase
1. Crea un proyecto en supabase.com (plan gratuito).
2. En Storage crea un bucket `photos` (público o privado según prefieras).
3. Aplica el SQL anterior en SQL Editor (o usa migraciones).
4. Configura RLS y políticas si necesitas controlar acceso.
5. Genera una Service Key desde Project Settings -> API (usar localmente para el script de import).
6. En Vercel, define las variables de entorno:
   - NEXT_PUBLIC_SUPABASE_URL
   - NEXT_PUBLIC_SUPABASE_ANON_KEY
   - SUPABASE_SERVICE_KEY (solo para scripts en CI o en tu máquina)

---

Si quieres, puedo:
- Generar también los archivos de ejemplo para Next.js (páginas, API routes, componentes de upload y admin) y añadirlos al repo.
- Crear un script PowerShell adaptado para Windows que ejecute el import usando la `SUPABASE_SERVICE_KEY` desde variables de entorno locales.

DIME si quieres que añada ese script PowerShell y/o los archivos Next.js ahora y si prefieres JavaScript o TypeScript para el proyecto.


## Información añadida por la API / notas de integración

Gracias — veo que agregaste snippets para la integración en el App Router (Page / Server / Client / Middleware). Son útiles y compatibles con el flujo SSR/Server Components de Next.js siempre que uses las librerías oficiales de helpers de Supabase.

Observaciones y ajustes que recomiendo:

- No incluyas claves reales en el archivo `supabase.md` ni en el repositorio. He eliminado las claves directas de este fichero y en su lugar usa variables de entorno. Si necesitabas mantener las claves en un lugar temporal, usa un archivo local `.env.local` que esté en `.gitignore`.
- Los snippets que mostraste (createServerClient / createBrowserClient) son correctos conceptualmente, pero requieren la librería de helpers adecuada. En proyectos Next.js con App Router recomendamos usar `@supabase/auth-helpers-nextjs` (o la versión modular `@supabase/auth-helpers`) — instala la que corresponde y adapta las importaciones:

  - Para Server Components / SSR: usa `createServerClient` de `@supabase/auth-helpers-nextjs`.
  - Para el cliente/browser: usa `createBrowserSupabaseClient` o `createBrowserClient` según la versión.

- Si prefieres mantener dependencias mínimas, también puedes usar únicamente `@supabase/supabase-js` y pasar la `SUPABASE_SERVICE_KEY` en el servidor (pero no en el cliente).

Ejemplo de variables de entorno (no incluir claves en Git):

```
NEXT_PUBLIC_SUPABASE_URL=https://<tu-proyecto>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon-key>
SUPABASE_SERVICE_KEY=<service-role-key> # sólo en servidor / CI
```

Si quieres, puedo:
- Actualizar los snippets para que usen la API exacta de la versión que vayas a instalar (dime la versión o dejo que detecte `@supabase/auth-helpers-nextjs`).
- Proveer un small PR con los adaptadores `app/` (Page server example), `lib/supabaseServer.ts` y `lib/supabaseClient.ts` tipo-compatibles con la última versión de los helpers.

---

Si quieres que actualice los snippets automáticamente a la librería que vas a usar, dime cuál instalas (p. ej. `@supabase/auth-helpers-nextjs@^0.5.0` o similar) y lo adapto.
