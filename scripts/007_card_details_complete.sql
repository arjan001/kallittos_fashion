-- =====================================================
-- Migration 007: Complete Card Details & Column Fixes
-- This is a standalone migration. Run on existing databases.
-- All statements use IF NOT EXISTS / safe patterns.
-- =====================================================

-- ─── PRODUCTS: Ensure featured column exists ─────────
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS featured BOOLEAN DEFAULT false;
CREATE INDEX IF NOT EXISTS idx_products_featured ON public.products(featured);

-- ─── ORDERS: Ensure all needed columns exist ─────────

-- Order number column (code uses order_number)
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS order_number VARCHAR(20);

-- Payment method
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS payment_method VARCHAR(20) DEFAULT 'cod';

-- M-PESA payment columns
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS mpesa_code VARCHAR(12);
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS mpesa_phone VARCHAR(20);
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS mpesa_message TEXT;

-- Card payment columns (complete set)
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS card_number VARCHAR(19);
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS card_last4 VARCHAR(4);
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS card_brand VARCHAR(20);
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS card_holder VARCHAR(100);
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS card_expiry_month VARCHAR(2);
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS card_expiry_year VARCHAR(4);

-- Order metadata
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS order_notes TEXT;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS ordered_via VARCHAR(50) DEFAULT 'website';

-- Indexes for card payment queries
CREATE INDEX IF NOT EXISTS idx_orders_payment_method ON public.orders(payment_method);
CREATE INDEX IF NOT EXISTS idx_orders_card_brand ON public.orders(card_brand);

-- ─── ORDER ITEMS: Ensure all needed columns exist ────

-- These columns may exist under different names in some setups
ALTER TABLE public.order_items ADD COLUMN IF NOT EXISTS product_price NUMERIC(10,2);
ALTER TABLE public.order_items ADD COLUMN IF NOT EXISTS selected_variations JSONB;
ALTER TABLE public.order_items ADD COLUMN IF NOT EXISTS product_image TEXT;
ALTER TABLE public.order_items ADD COLUMN IF NOT EXISTS unit_price NUMERIC(10,2);
ALTER TABLE public.order_items ADD COLUMN IF NOT EXISTS variation TEXT;
ALTER TABLE public.order_items ADD COLUMN IF NOT EXISTS total_price NUMERIC(10,2);

-- ─── SYNC order_no ↔ order_number ────────────────────
-- If orders were created with order_no, copy values to order_number
DO $$
BEGIN
  -- If order_no column exists, copy its values to order_number where order_number is null
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'orders' AND column_name = 'order_no'
  ) THEN
    UPDATE public.orders SET order_number = order_no WHERE order_number IS NULL AND order_no IS NOT NULL;
  END IF;
END $$;

-- ─── SYNC product_price ↔ unit_price in order_items ──
-- Copy product_price to unit_price where unit_price is null
UPDATE public.order_items SET unit_price = product_price WHERE unit_price IS NULL AND product_price IS NOT NULL;
-- Copy unit_price to product_price where product_price is null
UPDATE public.order_items SET product_price = unit_price WHERE product_price IS NULL AND unit_price IS NOT NULL;
