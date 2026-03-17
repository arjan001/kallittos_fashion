-- ============================================================
-- Migration: Add sort_order column to delivery_locations
--
-- The delivery_locations table was originally created without
-- the sort_order column. This migration adds it so that seed
-- scripts and application code can use it.
-- ============================================================

ALTER TABLE public.delivery_locations
ADD COLUMN IF NOT EXISTS sort_order INTEGER DEFAULT 0;
