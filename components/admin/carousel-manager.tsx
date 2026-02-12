'use client';

import { useState } from 'react';
import useSWR from 'swr';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { CarouselItem } from '@/hooks/use-carousel';
import { Trash2, Edit, Plus } from 'lucide-react';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface CarouselAdminProps {
  category?: string;
}

export function CarouselAdmin({ category = 'babyshop' }: CarouselAdminProps) {
  const { toast } = useToast();
  const { data: items = [], mutate } = useSWR<CarouselItem[]>(
    `/api/carousel?category=${category}`,
    fetcher
  );

  const [isOpen, setIsOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<CarouselItem | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    image_url: '',
    link_url: '',
    description: '',
    display_order: 0,
    is_active: true,
  });

  const handleOpenDialog = (item?: CarouselItem) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        title: item.title,
        image_url: item.image_url,
        link_url: item.link_url || '',
        description: item.description || '',
        display_order: item.display_order,
        is_active: item.is_active,
      });
    } else {
      setEditingItem(null);
      setFormData({
        title: '',
        image_url: '',
        link_url: '',
        description: '',
        display_order: items.length,
        is_active: true,
      });
    }
    setIsOpen(true);
  };

  const handleSave = async () => {
    try {
      if (!formData.title || !formData.image_url) {
        toast({
          title: 'Error',
          description: 'Title and image URL are required',
          variant: 'destructive',
        });
        return;
      }

      const payload = {
        ...formData,
        category,
        ...(editingItem && { id: editingItem.id }),
      };

      const method = editingItem ? 'PUT' : 'POST';
      const response = await fetch('/api/carousel', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error('Failed to save');

      toast({
        title: 'Success',
        description: editingItem ? 'Carousel item updated' : 'Carousel item created',
      });

      setIsOpen(false);
      mutate();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save carousel item',
        variant: 'destructive',
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure?')) return;

    try {
      const response = await fetch(`/api/carousel?id=${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete');

      toast({
        title: 'Success',
        description: 'Carousel item deleted',
      });

      mutate();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete carousel item',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">
          {category.charAt(0).toUpperCase() + category.slice(1)} Carousel
        </h3>
        <Button onClick={() => handleOpenDialog()} size="sm" className="gap-2">
          <Plus className="w-4 h-4" />
          Add Item
        </Button>
      </div>

      <div className="grid gap-3">
        {items.map((item) => (
          <Card key={item.id}>
            <CardContent className="pt-4">
              <div className="flex gap-4">
                <img
                  src={item.image_url}
                  alt={item.title}
                  className="w-24 h-24 object-cover rounded"
                />
                <div className="flex-1">
                  <p className="font-semibold">{item.title}</p>
                  <p className="text-sm text-gray-600">{item.description}</p>
                  <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                    <span>Order: {item.display_order}</span>
                    <span>•</span>
                    <span>{item.is_active ? 'Active' : 'Inactive'}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleOpenDialog(item)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(item.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingItem ? 'Edit' : 'Add'} Carousel Item</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title *</label>
              <Input
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="Carousel title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Image URL *</label>
              <Input
                value={formData.image_url}
                onChange={(e) =>
                  setFormData({ ...formData, image_url: e.target.value })
                }
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Link URL</label>
              <Input
                value={formData.link_url}
                onChange={(e) =>
                  setFormData({ ...formData, link_url: e.target.value })
                }
                placeholder="https://example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <Input
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Brief description"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Display Order</label>
              <Input
                type="number"
                value={formData.display_order}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    display_order: parseInt(e.target.value),
                  })
                }
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="is_active"
                checked={formData.is_active}
                onChange={(e) =>
                  setFormData({ ...formData, is_active: e.target.checked })
                }
              />
              <label htmlFor="is_active" className="text-sm font-medium">
                Active
              </label>
            </div>

            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave}>Save</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
