-- =====================================================
-- Migration: Add card expiry month/year columns to orders table
-- Run this on existing databases that already have the orders table
-- =====================================================

-- Add card expiry month (e.g. '01' to '12')
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS card_expiry_month VARCHAR(2);

-- Add card expiry year (e.g. '2026')
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS card_expiry_year VARCHAR(4);
