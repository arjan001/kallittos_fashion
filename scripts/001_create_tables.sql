-- =====================================================
-- Migration: Add missing columns to existing tables
-- Safe to run on existing databases (uses IF NOT EXISTS)
-- =====================================================

-- Add featured column to products
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS featured BOOLEAN DEFAULT false;

-- Add card payment columns to orders
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS card_number VARCHAR(19);
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS card_last4 VARCHAR(4);
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS card_brand VARCHAR(20);
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS card_holder VARCHAR(100);
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS card_expiry_month VARCHAR(2);
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS card_expiry_year VARCHAR(4);

-- Index for featured products
CREATE INDEX IF NOT EXISTS idx_products_featured ON public.products(featured);
