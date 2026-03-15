-- =====================================================
-- Migration: Add card payment columns to orders table
-- Run this on existing databases that already have the orders table
-- =====================================================

-- Add payment method column
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS payment_method VARCHAR(20) DEFAULT 'cod';

-- Add M-PESA payment columns
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS mpesa_code VARCHAR(12);
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS mpesa_phone VARCHAR(20);
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS mpesa_message TEXT;

-- Add card payment columns
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS card_last4 VARCHAR(4);
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS card_brand VARCHAR(20);
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS card_holder VARCHAR(100);

-- Index for filtering by payment method
CREATE INDEX IF NOT EXISTS idx_orders_payment_method ON public.orders(payment_method);
