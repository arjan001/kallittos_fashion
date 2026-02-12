-- Seed carousel items for testing
INSERT INTO public.carousel_items (category, title, image_url, link_url, description, display_order, is_active) VALUES
  ('babyshop', 'Spring Collection 2024', 'https://images.unsplash.com/photo-1622209536148-4a47ccd0b53e?w=1200&h=600&fit=crop', '/shop/babyshop?collection=spring', 'Explore our latest spring collection with fresh colors and cozy fabrics', 0, true),
  ('babyshop', 'New Arrival - Onesies', 'https://images.unsplash.com/photo-1612223945312-c0b3ba6a8e7b?w=1200&h=600&fit=crop', '/shop/babyshop?type=onesies', 'Super soft and comfortable onesies for newborns', 1, true),
  ('babyshop', 'Accessories Sale', 'https://images.unsplash.com/photo-1621452773316-d70c8c0e0897?w=1200&h=600&fit=crop', '/shop/babyshop?category=accessories', 'Get 30% off on all baby accessories this week only', 2, true),
  ('kids', 'Summer Styles', 'https://images.unsplash.com/photo-1519452575417-564c1401ecc0?w=1200&h=600&fit=crop', '/shop/kids?collection=summer', 'Check out our colorful summer collection for kids', 0, true),
  ('kids', 'Back to School', 'https://images.unsplash.com/photo-1526280352457-49c65f3f0a7c?w=1200&h=600&fit=crop', '/shop/kids?collection=school', 'Everything you need for back to school', 1, true),
  ('kids', 'Sports & Outdoor', 'https://images.unsplash.com/photo-1556835565-edb16e1a1403?w=1200&h=600&fit=crop', '/shop/kids?category=sports', 'Active wear for outdoor adventures', 2, true);
