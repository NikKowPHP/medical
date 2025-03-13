'use client'

import { useState } from 'react'
import logger from '@/lib/logger'
import { useAdminSlider } from '@/hooks/use-admin-slider'
import { Button } from '@/components/ui/button/button'
import { LoadingSpinner } from '@/components/ui/loadingSpinner'
import { SliderForm } from './components/slider-form'
import { SliderItem } from '@/domain/models/models'
import { useAdmin } from '@/contexts/admin-context'

export function SliderList() {
  const {
    sliderItems,
    error,
    loading,
    deleteSliderItem,
    getSliderItems,
    createSliderItem,
    updateSliderItem,
  } = useAdmin()
  const [localLoading, setLocalLoading] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedSlider, setSelectedSlider] = useState<SliderItem | null>(null)

  const handleDelete = async (id: string) => {
    setLocalLoading(true)
    if (confirm('Are you sure you want to delete this slider image?')) {
      try {
        await deleteSliderItem(id)
        await getSliderItems()
      } catch (error) {
        logger.log('Failed to delete slider image:', error)
      }
    }
    setLocalLoading(false)
  }

  const handleEdit = (slider: SliderItem) => {
    setSelectedSlider(slider)
    setModalOpen(true)
  }

  const handleCreate = () => {
    setSelectedSlider(null)
    setModalOpen(true)
  }

  return (
    <div className="space-y-8">
      {error && <div className="p-4 bg-red-50 text-red-600">{error}</div>}
      {(localLoading || loading) && <LoadingSpinner />}

      <div className="flex justify-between items-center">
        <Button onClick={handleCreate} variant="primary" disabled={loading}>
          Add Slider Image
        </Button>
      </div>

      <div className="overflow-hidden bg-white shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Image
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {sliderItems && sliderItems.length > 0 ? (
              sliderItems.map((slider) => (
                <tr key={slider.id} className={loading ? 'opacity-50' : ''}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <img
                      src={slider.image_url}
                      alt="Slider Image"
                      className="h-[80px] w-[80px] object-cover"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3">
                    <Button
                      onClick={() => handleEdit(slider)}
                      variant="success"
                      size="sm"
                      disabled={loading}
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleDelete(slider.id)}
                      variant="danger"
                      size="sm"
                      disabled={loading}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={2} className="px-6 py-4 whitespace-nowrap text-center">
                  {loading ? 'Loading slider images...' : 'No slider images found.'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {modalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-xl">
            <SliderForm
              sliderItem={selectedSlider}
              onCancel={() => setModalOpen(false)}
              onSubmit={async (data) => {
                setLocalLoading(true)
                try {
                  await createSliderItem(data)
                  await getSliderItems()
                  setModalOpen(false)
                } catch (error) {
                  logger.log('Failed to create slider image:', error)
                }
                setLocalLoading(false)
              }}
              onUpdate={async (data) => {
                if (selectedSlider) {
                  setLocalLoading(true)
                  try {
                    await updateSliderItem(selectedSlider.id, data)
                    await getSliderItems()
                    setModalOpen(false)
                  } catch (error) {
                    logger.log('Failed to update slider image:', error)
                  }
                  setLocalLoading(false)
                }
              }}
              loading={localLoading}
            />
          </div>
        </div>
      )}
    </div>
  )
}