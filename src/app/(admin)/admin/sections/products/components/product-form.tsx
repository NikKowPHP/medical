'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button/button'
import { Input } from '@/components/ui/input/input'
import { Label } from '@/components/ui/label/label'
import { Product } from '@/domain/models/models'

interface ProductFormProps {
  product?: Product | null
  onSubmit: (data: Partial<Product>) => Promise<void>
  onUpdate: (data: Partial<Product>) => Promise<void>
  onCancel: () => void
  loading: boolean
}

export function ProductForm({
  product,
  onSubmit,
  onUpdate,
  onCancel,
  loading,
}: ProductFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Partial<Product>>({
    defaultValues: product || {},
  })

  const submitHandler = async (data: Partial<Product>) => {
    if (product && product.id) {
      await onUpdate({ ...data })
    } else {
      await onSubmit({ ...data })
    }
  }

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="space-y-6">
      <div>
        <Label htmlFor="title">Title</Label>
        <Input
          type="text"
          id="title"
          {...register('title', { required: 'Title is required' })}
          className="w-full"
        />
        {errors.title && <p className="text-red-600">{errors.title.message}</p>}
      </div>

      <div>
        <Label htmlFor="category">Category</Label>
        <Input
          type="text"
          id="category"
          {...register('category', { required: 'Category is required' })}
          className="w-full"
        />
        {errors.category && <p className="text-red-600">{errors.category.message}</p>}
      </div>

      <div>
        <Label htmlFor="image_url">Image URL</Label>
        <Input
          type="text"
          id="image_url"
          {...register('image_url', { required: 'Image URL is required' })}
          className="w-full"
        />
        {errors.image_url && <p className="text-red-600">{errors.image_url.message}</p>}
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <textarea
          id="description"
          {...register('description', { required: 'Description is required' })}
          className="w-full p-2 border rounded"
        />
        {errors.description && <p className="text-red-600">{errors.description.message}</p>}
      </div>

      <div>
        <Label htmlFor="pdf_url">PDF URL</Label>
        <Input
          type="text"
          id="pdf_url"
          {...register('pdf_url')}
          className="w-full"
        />
      </div>

      <div className="flex justify-end gap-5">
        <Button variant="secondary" onClick={onCancel} disabled={loading}>
          Cancel
        </Button>
        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? 'Saving...' : 'Save'}
        </Button>
      </div>
    </form>
  )
}