# Carousel Backend Implementation

## Overview
The carousel system allows you to dynamically manage carousel items through an admin panel and display them on the frontend using the `DynamicCarousel` component or the custom `useCarouselItems` hook.

## Components

### 1. **CarouselAdmin** (`components/admin/carousel-manager.tsx`)
The admin panel component for managing carousel items. Features:
- Add/Edit/Delete carousel items
- Set display order
- Toggle active/inactive status
- Support for multiple categories

**Usage in Admin:**
```tsx
import { CarouselAdmin } from "@/components/admin/carousel-manager"

<CarouselAdmin category="babyshop" />
<CarouselAdmin category="kids" />
```

### 2. **DynamicCarousel** (`components/store/dynamic-carousel.tsx`)
A fully-featured carousel component that fetches data from the API.
Features:
- Auto-play with customizable interval
- Previous/Next navigation buttons
- Dot indicators
- Image overlay with text and CTA button
- Responsive design

**Usage:**
```tsx
import { DynamicCarousel } from "@/components/store/dynamic-carousel"

<DynamicCarousel 
  category="babyshop" 
  autoplay={true} 
  autoplayInterval={5000} 
/>
```

### 3. **Updated Hero Component** (`components/store/hero.tsx`)
The hero component now uses the carousel system:
- Fetches carousel items for "babyshop" category
- Falls back to hardcoded images if no items exist
- Displays dynamic content (title, description, links)

## Database Schema

### `carousel_items` Table
```sql
CREATE TABLE public.carousel_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category VARCHAR(100) NOT NULL DEFAULT 'babyshop',
  title VARCHAR(255) NOT NULL,
  image_url TEXT NOT NULL,
  link_url TEXT,
  description TEXT,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
```

## API Endpoints

### GET `/api/carousel?category=babyshop`
Fetches all active carousel items for a category.

**Response:**
```json
[
  {
    "id": "uuid",
    "category": "babyshop",
    "title": "Spring Collection",
    "image_url": "https://...",
    "link_url": "/shop/babyshop",
    "description": "Spring collection...",
    "display_order": 0,
    "is_active": true,
    "created_at": "2024-01-01T00:00:00Z",
    "updated_at": "2024-01-01T00:00:00Z"
  }
]
```

### POST `/api/carousel`
Creates a new carousel item.

**Request Body:**
```json
{
  "category": "babyshop",
  "title": "Item Title",
  "image_url": "https://...",
  "link_url": "/path",
  "description": "Optional description",
  "display_order": 0,
  "is_active": true
}
```

### PUT `/api/carousel`
Updates a carousel item.

**Request Body:**
```json
{
  "id": "uuid",
  "category": "babyshop",
  "title": "Updated Title",
  "image_url": "https://...",
  "link_url": "/path",
  "description": "Updated description",
  "display_order": 1,
  "is_active": true
}
```

### DELETE `/api/carousel?id=uuid`
Deletes a carousel item.

## Hook: `useCarouselItems`

**Usage:**
```tsx
import { useCarouselItems, CarouselItem } from '@/hooks/use-carousel'

function MyComponent() {
  const { items, isLoading, error, mutate } = useCarouselItems('babyshop')
  
  return (
    <div>
      {items.map(item => (
        <div key={item.id}>{item.title}</div>
      ))}
    </div>
  )
}
```

**Properties:**
- `items: CarouselItem[]` - Array of carousel items
- `isLoading: boolean` - Loading state
- `error: Error | undefined` - Error if any
- `mutate: () => Promise<void>` - Refresh the data

## Setup Instructions

### 1. Create the Database Table
Run the migration script:
```bash
npm run db:migrate -- scripts/003_carousel_items.sql
```

### 2. (Optional) Seed Sample Data
```bash
npm run db:migrate -- scripts/004_seed_carousel.sql
```

### 3. Access Admin Panel
Navigate to `/admin/banners` → Click on "Carousels" tab

### 4. Add Carousel Items
- Click "Add Item" button
- Fill in Title, Image URL, Link URL (optional), Description, Order
- Toggle "Active" to enable/disable
- Click "Save"

## Admin Panel Features

### Banners Module
The admin banners component now includes a "Carousels" tab with:
- **Babyshop Carousel**: Manage carousel items for the babyshop category
- **Kids Carousel**: Manage carousel items for the kids category
- Each section shows thumbnail previews of carousel items
- Quick edit/delete buttons for each item

## Frontend Usage Examples

### In Homepage Hero
The hero component automatically fetches and displays carousel items for the babyshop category with fallback to hardcoded images.

### Custom Carousel Section
```tsx
import { DynamicCarousel } from "@/components/store/dynamic-carousel"

export function KidsSection() {
  return (
    <section>
      <DynamicCarousel 
        category="kids" 
        autoplayInterval={4000} 
      />
    </section>
  )
}
```

### Manual Item Display
```tsx
import { useCarouselItems } from '@/hooks/use-carousel'

export function CarouselGallery() {
  const { items } = useCarouselItems('babyshop')
  
  return (
    <div className="grid grid-cols-3">
      {items.map(item => (
        <a key={item.id} href={item.link_url}>
          <img src={item.image_url} alt={item.title} />
          <h3>{item.title}</h3>
        </a>
      ))}
    </div>
  )
}
```

## Best Practices

1. **Image URLs**: Use properly sized images (recommended: 1200x600px for hero carousels)
2. **Order**: Use `display_order` to control the sequence of carousel items
3. **Active Status**: Deactivate items instead of deleting for audit trail
4. **Descriptions**: Keep descriptions concise for better mobile display
5. **Categories**: Use consistent category names across your site

## Troubleshooting

### Carousel not showing?
1. Check if carousel_items table exists: `SELECT * FROM carousel_items;`
2. Verify items are marked as `is_active = true`
3. Check browser console for API errors
4. Ensure image URLs are publicly accessible

### Images not loading?
1. Verify image URLs are correct and accessible
2. Check CORS headers if using external image sources
3. Test URLs in browser directly

### Admin panel not saving?
1. Ensure user is authenticated as admin
2. Check network tab for API errors
3. Verify database connection
