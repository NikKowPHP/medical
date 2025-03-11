'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button/button'
import { Input } from '@/components/ui/input/input'
import { Label } from '@/components/ui/label/label'
import { Product } from '@/domain/models/models'
import Link from 'next/link'

// Define a custom form type that extends Partial<Product> with separate file fields.
type ProductFormValues = Partial<Product> & {
  imageFile?: FileList;
  pdfFile?: FileList;
}

interface ProductFormProps {
  product?: Product | null
  onSubmit: (data: Partial<Product> & { imageFile?: File; pdfFile?: File }) => Promise<void>
  onUpdate: (data: Partial<Product> & { imageFile?: File; pdfFile?: File }) => Promise<void>
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
  } = useForm<ProductFormValues>({
    defaultValues: product || {},
  })

  const submitHandler = async (data: ProductFormValues) => {
    // Extract file inputs (which are FileLists) and get the first file if available.
    const { imageFile, pdfFile, ...rest } = data
    const finalData = {
      ...rest,
      imageFile: imageFile && imageFile[0],
      pdfFile: pdfFile && pdfFile[0],
    }

    if (product && product.id) {
      await onUpdate(finalData)
    } else {
      await onSubmit(finalData)
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
        <Label htmlFor="description">Description</Label>
        <textarea
          id="description"
          {...register('description', { required: 'Description is required' })}
          className="w-full p-2 border rounded"
        />
        {errors.description && <p className="text-red-600">{errors.description.message}</p>}
      </div>

      <div>
        <Label htmlFor="imageFile">Image Upload</Label>
        {product?.image_url && (
          <div className="mb-4">
            <p className="text-sm text-gray-500 mb-2">Current Image:</p>
            {/* <Image
              src={product.image_url}
              alt={product.title || 'Product image'}
              width={150}
              height={150}
              className="rounded border p-1"
            /> */}

            <img
              src={product.image_url}
              alt={product.title}
              className="h-[200px] w-[400px] object-cover"
                    />
          </div>
        )}
        <Input
          type="file"
          id="imageFile"
          accept="image/*"
          {...register('imageFile')}
          className="w-full mt-2"
        />
      </div>

      <div>
        <Label htmlFor="pdfFile">PDF Upload</Label>
        {product?.pdf_url && (
          <div className="mb-4">
            <p className="text-sm text-gray-500 mb-2">Current PDF:</p>
            <Link
              href={product.pdf_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              View Current PDF
            </Link>
          </div>
        )}
        <Input
          type="file"
          id="pdfFile"
          accept="application/pdf"
          {...register('pdfFile')}
          className="w-full mt-2"
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