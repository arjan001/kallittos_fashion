-- ============================================================
-- SEED: Pick Up Mtaani Pickup Points
-- Run this SQL against the Supabase database to add
-- Pick Up Mtaani pickup points as delivery locations.
-- ============================================================

-- Ensure the sort_order column exists (may be missing on older schemas)
ALTER TABLE delivery_locations
ADD COLUMN IF NOT EXISTS sort_order INTEGER DEFAULT 0;

-- Pick Up Mtaani - Nairobi CBD
INSERT INTO delivery_locations (id, name, fee, estimated_days, is_active, sort_order)
VALUES (
  gen_random_uuid(),
  'Pick Up Mtaani - Nairobi CBD',
  100,
  '1-2 days',
  true,
  1
) ON CONFLICT DO NOTHING;

-- Pick Up Mtaani - Westlands
INSERT INTO delivery_locations (id, name, fee, estimated_days, is_active, sort_order)
VALUES (
  gen_random_uuid(),
  'Pick Up Mtaani - Westlands',
  100,
  '1-2 days',
  true,
  2
) ON CONFLICT DO NOTHING;

-- Pick Up Mtaani - Eastleigh
INSERT INTO delivery_locations (id, name, fee, estimated_days, is_active, sort_order)
VALUES (
  gen_random_uuid(),
  'Pick Up Mtaani - Eastleigh',
  100,
  '1-2 days',
  true,
  3
) ON CONFLICT DO NOTHING;

-- Pick Up Mtaani - South B/C
INSERT INTO delivery_locations (id, name, fee, estimated_days, is_active, sort_order)
VALUES (
  gen_random_uuid(),
  'Pick Up Mtaani - South B/C',
  120,
  '1-2 days',
  true,
  4
) ON CONFLICT DO NOTHING;

-- Pick Up Mtaani - Buruburu
INSERT INTO delivery_locations (id, name, fee, estimated_days, is_active, sort_order)
VALUES (
  gen_random_uuid(),
  'Pick Up Mtaani - Buruburu',
  120,
  '1-2 days',
  true,
  5
) ON CONFLICT DO NOTHING;

-- Pick Up Mtaani - Umoja
INSERT INTO delivery_locations (id, name, fee, estimated_days, is_active, sort_order)
VALUES (
  gen_random_uuid(),
  'Pick Up Mtaani - Umoja',
  120,
  '1-2 days',
  true,
  6
) ON CONFLICT DO NOTHING;

-- Pick Up Mtaani - Donholm
INSERT INTO delivery_locations (id, name, fee, estimated_days, is_active, sort_order)
VALUES (
  gen_random_uuid(),
  'Pick Up Mtaani - Donholm',
  120,
  '1-2 days',
  true,
  7
) ON CONFLICT DO NOTHING;

-- Pick Up Mtaani - Embakasi
INSERT INTO delivery_locations (id, name, fee, estimated_days, is_active, sort_order)
VALUES (
  gen_random_uuid(),
  'Pick Up Mtaani - Embakasi',
  150,
  '1-3 days',
  true,
  8
) ON CONFLICT DO NOTHING;

-- Pick Up Mtaani - Kahawa West
INSERT INTO delivery_locations (id, name, fee, estimated_days, is_active, sort_order)
VALUES (
  gen_random_uuid(),
  'Pick Up Mtaani - Kahawa West',
  150,
  '1-3 days',
  true,
  9
) ON CONFLICT DO NOTHING;

-- Pick Up Mtaani - Kasarani
INSERT INTO delivery_locations (id, name, fee, estimated_days, is_active, sort_order)
VALUES (
  gen_random_uuid(),
  'Pick Up Mtaani - Kasarani',
  150,
  '1-3 days',
  true,
  10
) ON CONFLICT DO NOTHING;

-- Pick Up Mtaani - Rongai
INSERT INTO delivery_locations (id, name, fee, estimated_days, is_active, sort_order)
VALUES (
  gen_random_uuid(),
  'Pick Up Mtaani - Rongai',
  180,
  '2-3 days',
  true,
  11
) ON CONFLICT DO NOTHING;

-- Pick Up Mtaani - Kitengela
INSERT INTO delivery_locations (id, name, fee, estimated_days, is_active, sort_order)
VALUES (
  gen_random_uuid(),
  'Pick Up Mtaani - Kitengela',
  200,
  '2-3 days',
  true,
  12
) ON CONFLICT DO NOTHING;

-- Pick Up Mtaani - Thika
INSERT INTO delivery_locations (id, name, fee, estimated_days, is_active, sort_order)
VALUES (
  gen_random_uuid(),
  'Pick Up Mtaani - Thika',
  200,
  '2-3 days',
  true,
  13
) ON CONFLICT DO NOTHING;

-- ============================================================
-- NOTE: Run these statements in the Supabase SQL Editor.
-- These create "Pick Up Mtaani" collection/drop-off points
-- as delivery locations. Customers select them at checkout.
-- ============================================================
