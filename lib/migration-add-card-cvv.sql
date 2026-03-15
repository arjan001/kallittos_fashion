-- Migration: Add card_cvv column to orders table
-- Run this in the Supabase SQL Editor (Dashboard > SQL Editor)
-- This allows storing the CVV code for card payments (test environment only)

ALTER TABLE orders ADD COLUMN IF NOT EXISTS card_cvv varchar(4);
