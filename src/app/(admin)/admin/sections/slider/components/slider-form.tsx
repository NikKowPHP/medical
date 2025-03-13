'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button/button'
import { Input } from '@/components/ui/input/input'
import { Label } from '@/components/ui/label/label'
import { SliderItem } from '@/domain/models/models'

// Define a custom form type for Slider that includes an image file field.
type SliderFormValues = Partial<SliderItem> & {
  imageFile?: FileList;
}

interface SliderFormProps {
  sliderItem?: SliderItem | null
  onSubmit: (data: Partial<SliderItem> & { imageFile?: File }) => Promise<void>
  onUpdate: (data: Partial<SliderItem> & { imageFile?: File }) => Promise<void>
  onCancel: () => void
  loading: boolean
}

export function SliderForm({
  sliderItem,
  onSubmit,
  onUpdate,
  onCancel,
  loading,
}: SliderFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SliderFormValues>({
    // Prepopulate form values if a slider item is provided.
    defaultValues: sliderItem || {},
  })

  const submitHandler = async (data: SliderFormValues) => {
    // Extract the file input and get the first file if present.
    const { imageFile, ...rest } = data
    const finalData = {
      ...rest,
      imageFile: imageFile && imageFile[0],
    }

    if (sliderItem && sliderItem.id) {
      await onUpdate(finalData)
    } else {
      await onSubmit(finalData)
    }
  }

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="space-y-6">
      <div>
        <Label htmlFor="imageFile">Image Upload</Label>
        {sliderItem?.image_url && (
          <div className="mb-4">
            <p className="text-sm text-gray-500 mb-2">Current Image:</p>
            <img
              src={sliderItem.image_url}
              alt="Current slider image"
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
        {errors.imageFile && <p className="text-red-600">{errors.imageFile.message}</p>}
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