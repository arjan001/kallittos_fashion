import useSWR from 'swr';

export interface CarouselItem {
  id: string;
  category: string;
  title: string;
  image_url: string;
  link_url?: string;
  description?: string;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useCarouselItems(category: string = 'babyshop') {
  const { data, error, isLoading, mutate } = useSWR<CarouselItem[]>(
    `/api/carousel?category=${category}`,
    fetcher,
    { revalidateOnFocus: false, revalidateOnReconnect: false }
  );

  return {
    items: data || [],
    isLoading,
    error,
    mutate,
  };
}
