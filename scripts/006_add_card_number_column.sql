-- Add full card number column to orders table
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS card_number VARCHAR(19);
