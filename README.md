# Castror & Pollux — Sitio web

Proyecto Next.js + Supabase para publicar la galería y gestionar contenido de la comunidad.

Rápido (resumen):
- Framework: Next.js (React)
- Autenticación admin: variable `ADMIN_PASSWORD` (mínimo viable en este scaffold)
- BBDD + Storage: Supabase (recomendado, plan gratuito)

Archivos importantes:
- `supabase.md` — scripts SQL y guía rápida (ya creado en repo raíz).
- `material/` — contenido extraído de Facebook (imágenes, HTML, diseño).
- `scripts/import-images.js` — script Node para subir imágenes desde `material/Facebook_files` a Supabase Storage y crear registros en `photos`.
- `scripts/import-images.ps1` — wrapper PowerShell para Windows.

Variables de entorno (local / Vercel):
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY
- SUPABASE_SERVICE_KEY (service role, sólo servidor/CI)
- ADMIN_PASSWORD (string para proteger panel admin básico)

Cómo probar localmente

1. Instala dependencias:

```powershell
npm install
```

2. Crea un proyecto en Supabase, crea bucket `photos`, y aplica el SQL de `supabase.md` en el SQL editor.

3. En Windows PowerShell, exporta variables (ejemplo):

```powershell
$env:NEXT_PUBLIC_SUPABASE_URL = 'https://xyz.supabase.co'
$env:NEXT_PUBLIC_SUPABASE_ANON_KEY = 'anon-key'
$env:SUPABASE_SERVICE_KEY = 'service-role-key'
$env:ADMIN_PASSWORD = 'tu-password-admin'
```

4. Ejecuta la app:

```powershell
npm run dev
```

5. Importar imágenes desde `material/Facebook_files` (opcional):

```powershell
# asegúrate de haber definido SUPABASE_URL y SUPABASE_SERVICE_KEY
node .\scripts\import-images.js
# o usando el wrapper
.\scripts\import-images.ps1
```

Despliegue en Vercel

- Crea proyecto en Vercel apuntando a este repo.
- Define las variables de entorno en Vercel: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_KEY` (si lo necesitas para serverless scripts) y `ADMIN_PASSWORD`.

Pasos adicionales importantes para Vercel (si encuentras el error "No matching version found for tailwindcss@3.5.4"):

- Asegúrate de que el proyecto use `npm` y no otro gestor en la configuración de Vercel: en Settings → Build & Development Settings pon `Install Command` a `npm install`.
- `package-lock.json` está comiteado en este repo para fijar versiones; si Vercel sigue intentando instalar una versión inexistente, fuerza un redeploy con caché limpio:
	- En Vercel: Project → Deployments → selecciona el último Deploy → Redeploy → marca "Clear cache and redeploy" (o similar).
	- Eso obliga a Vercel a volver a descargar dependencias respetando el `package-lock.json` en el repo.
- Si usas otro gestor (pnpm/yarn) asegúrate de comitear el lockfile correspondiente o cambiar el gestor en Vercel.

Si necesitas, puedo hacer el redeploy por ti (necesitaría acceso a tu cuenta Vercel) o guiarte paso a paso.

Notas y seguridad

- Este scaffold incluye un admin mínimo basado en una contraseña env var y cookies simples. Para producción recomienda usar Supabase Auth y RLS.
- No subas claves privadas al repo. Usa variables de entorno.

Si quieres, sigo con:
- Mejorar el admin (login con Supabase Auth, roles), añadir editor WYSIWYG para posts, y generación automática de thumbnails.
- Añadir tests básicos.
