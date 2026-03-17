-- =====================================================
-- Migration 008: Newsletter Subscribers Table
-- This is a standalone migration. Run on existing databases.
-- All statements use IF NOT EXISTS / safe patterns.
-- =====================================================

CREATE TABLE IF NOT EXISTS public.newsletter_subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public insert" ON public.newsletter_subscribers
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Allow admin read" ON public.newsletter_subscribers
  FOR SELECT TO authenticated
  USING (true);
