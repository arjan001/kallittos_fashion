'use client';

import { useEffect, useState } from 'react';
import { useCarouselItems, CarouselItem } from '@/hooks/use-carousel';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface DynamicCarouselProps {
  category?: string;
  autoplay?: boolean;
  autoplayInterval?: number;
}

export function DynamicCarousel({
  category = 'babyshop',
  autoplay = true,
  autoplayInterval = 5000,
}: DynamicCarouselProps) {
  const { items } = useCarouselItems(category);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!autoplay || items.length === 0) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % items.length);
    }, autoplayInterval);

    return () => clearInterval(interval);
  }, [items.length, autoplay, autoplayInterval]);

  if (items.length === 0) {
    return null;
  }

  const goToPrevious = () => {
    setCurrent((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrent((prev) => (prev + 1) % items.length);
  };

  const item = items[current];

  return (
    <div className="relative w-full bg-gray-100 rounded-lg overflow-hidden">
      {/* Carousel container */}
      <div className="relative aspect-video">
        <img
          src={item.image_url}
          alt={item.title}
          className="w-full h-full object-cover transition-opacity duration-500"
        />

        {/* Overlay with text */}
        <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center text-white text-center p-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">{item.title}</h2>
          {item.description && (
            <p className="text-lg md:text-xl mb-4 max-w-2xl">{item.description}</p>
          )}
          {item.link_url && (
            <Link
              href={item.link_url}
              className="inline-block bg-white text-black px-6 py-2 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
            >
              Shop Now
            </Link>
          )}
        </div>
      </div>

      {/* Navigation buttons */}
      {items.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 transition-colors z-10"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6 text-black" />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 transition-colors z-10"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6 text-black" />
          </button>

          {/* Dots indicator */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {items.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrent(idx)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  idx === current ? 'bg-white' : 'bg-white/50'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
