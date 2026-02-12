-- Carousel Items table for banner management

CREATE TABLE IF NOT EXISTS public.carousel_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category VARCHAR(100) NOT NULL DEFAULT 'babyshop',
  title VARCHAR(255) NOT NULL,
  image_url TEXT NOT NULL,
  link_url TEXT,
  description TEXT,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Index for category and active status
CREATE INDEX IF NOT EXISTS idx_carousel_items_category_active ON public.carousel_items(category, is_active);
CREATE INDEX IF NOT EXISTS idx_carousel_items_order ON public.carousel_items(display_order);
