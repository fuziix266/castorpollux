-- ============================================
-- SUPABASE DATABASE SCHEMA - Cástor & Póllux
-- ============================================
-- Ejecuta este archivo completo en el SQL Editor de Supabase
-- ============================================

-- EXTENSIONES
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- TABLAS PRINCIPALES
-- ============================================

-- Tabla de usuarios/administradores
CREATE TABLE IF NOT EXISTS public.users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  full_name text,
  role text NOT NULL DEFAULT 'member',
  avatar_url text,
  bio text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Tabla de posts/artículos del blog
CREATE TABLE IF NOT EXISTS public.posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  excerpt text,
  content text,
  featured_image_url text,
  author_id uuid REFERENCES public.users(id) ON DELETE SET NULL,
  category text,
  tags text[],
  published boolean DEFAULT FALSE,
  published_at timestamptz,
  views_count int DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Tabla de noticias
CREATE TABLE IF NOT EXISTS public.news (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  summary text,
  content text,
  image_url text,
  author_id uuid REFERENCES public.users(id) ON DELETE SET NULL,
  published boolean DEFAULT FALSE,
  published_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Tabla de eventos
CREATE TABLE IF NOT EXISTS public.events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  event_date date NOT NULL,
  event_time time,
  location text,
  location_details text,
  image_url text,
  organizer_id uuid REFERENCES public.users(id) ON DELETE SET NULL,
  event_type text,
  max_attendees int,
  registration_required boolean DEFAULT false,
  published boolean DEFAULT TRUE,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Tabla de galerías
CREATE TABLE IF NOT EXISTS public.galleries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  cover_image_url text,
  created_by uuid REFERENCES public.users(id) ON DELETE SET NULL,
  published boolean DEFAULT TRUE,
  published_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Tabla de fotos
CREATE TABLE IF NOT EXISTS public.photos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  gallery_id uuid REFERENCES public.galleries(id) ON DELETE CASCADE,
  filename text NOT NULL,
  storage_path text NOT NULL,
  caption text,
  description text,
  photographer text,
  source text,
  width int,
  height int,
  taken_at timestamptz,
  order_index int DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Tabla de configuraciones del sitio
CREATE TABLE IF NOT EXISTS public.site_settings (
  key text PRIMARY KEY,
  value jsonb,
  updated_at timestamptz DEFAULT now()
);

-- Tabla de miembros destacados
CREATE TABLE IF NOT EXISTS public.members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  role_in_group text,
  bio text,
  photo_url text,
  email text,
  social_links jsonb,
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- ============================================
-- ÍNDICES
-- ============================================

CREATE INDEX IF NOT EXISTS idx_posts_published ON public.posts(published_at DESC) WHERE published = true;
CREATE INDEX IF NOT EXISTS idx_posts_category ON public.posts(category);
CREATE INDEX IF NOT EXISTS idx_posts_author ON public.posts(author_id);
CREATE INDEX IF NOT EXISTS idx_posts_slug ON public.posts(slug);

CREATE INDEX IF NOT EXISTS idx_news_published ON public.news(published_at DESC) WHERE published = true;
CREATE INDEX IF NOT EXISTS idx_news_slug ON public.news(slug);

CREATE INDEX IF NOT EXISTS idx_events_date ON public.events(event_date DESC);
CREATE INDEX IF NOT EXISTS idx_events_published ON public.events(published) WHERE published = true;

CREATE INDEX IF NOT EXISTS idx_galleries_published ON public.galleries(published_at DESC) WHERE published = true;
CREATE INDEX IF NOT EXISTS idx_galleries_slug ON public.galleries(slug);

CREATE INDEX IF NOT EXISTS idx_photos_gallery ON public.photos(gallery_id, order_index);
CREATE INDEX IF NOT EXISTS idx_photos_created ON public.photos(created_at DESC);

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.galleries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Políticas de lectura pública
CREATE POLICY "Public read published posts" ON public.posts FOR SELECT USING (published = true);
CREATE POLICY "Public read published news" ON public.news FOR SELECT USING (published = true);
CREATE POLICY "Public read published events" ON public.events FOR SELECT USING (published = true);
CREATE POLICY "Public read published galleries" ON public.galleries FOR SELECT USING (published = true);
CREATE POLICY "Public read all photos" ON public.photos FOR SELECT USING (true);
CREATE POLICY "Public read active members" ON public.members FOR SELECT USING (active = true);
CREATE POLICY "Public read site settings" ON public.site_settings FOR SELECT USING (true);

-- Políticas de escritura para usuarios autenticados
CREATE POLICY "Authenticated users can manage posts" ON public.posts FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can manage news" ON public.news FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can manage events" ON public.events FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can manage galleries" ON public.galleries FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can manage photos" ON public.photos FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can manage members" ON public.members FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can update settings" ON public.site_settings FOR ALL USING (auth.role() = 'authenticated');

-- ============================================
-- FUNCIONES Y TRIGGERS
-- ============================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_posts_updated_at BEFORE UPDATE ON public.posts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_news_updated_at BEFORE UPDATE ON public.news FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON public.events FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_galleries_updated_at BEFORE UPDATE ON public.galleries FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_photos_updated_at BEFORE UPDATE ON public.photos FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_members_updated_at BEFORE UPDATE ON public.members FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- DATOS INICIALES (SEED)
-- ============================================

INSERT INTO public.site_settings (key, value) VALUES
  ('site_name', '"Cástor & Póllux"'),
  ('site_description', '"Agrupación de Astronomía - Arica, Chile"'),
  ('contact_email', '"contacto@castorypollux.cl"'),
  ('social_facebook', '"https://www.facebook.com/castorypolluxarica"'),
  ('hero_title', '"Explorando el Cosmos desde Arica, Chile"'),
  ('hero_subtitle', '"Únete a nuestra comunidad para descubrir la incomparable belleza del cielo nocturno del desierto de Atacama."')
ON CONFLICT (key) DO NOTHING;

INSERT INTO public.users (email, full_name, role) VALUES
  ('admin@castorypollux.cl', 'Administrador', 'admin')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.galleries (title, slug, description, published) VALUES
  ('Galería General', 'general', 'Colección de fotografías astronómicas de nuestra comunidad', true)
ON CONFLICT (slug) DO NOTHING;
