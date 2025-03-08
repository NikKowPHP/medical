'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import logger from '@/lib/logger'
import { useAdmin } from '@/contexts/admin-context'
import { Button } from '@/components/ui/button/button'
import { LoadingSpinner } from '@/components/ui/loadingSpinner'
import { ProductForm } from './components/product-form'
import { Product } from '@/domain/models/models'

export function ProductList() {
  const {
    products,
    error,
    loading,
    deleteProduct,
    getProducts,
    createProduct,
    updateProduct,
  } = useAdmin()
  const router = useRouter()
  const [localLoading, setLocalLoading] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  useEffect(() => {
    getProducts()
  }, [])

  const handleDelete = async (id: string) => {
    setLocalLoading(true)
    if (confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(id)
        await getProducts()
      } catch (error) {
        logger.log('Failed to delete product:', error)
      }
    }
    setLocalLoading(false)
  }

  const handleEdit = (product: Product) => {
    setSelectedProduct(product)
    setModalOpen(true)
  }

  const handleCreate = () => {
    setSelectedProduct(null)
    setModalOpen(true)
  }

  return (
    <div className="space-y-8">
      {error && <div className="p-4 bg-red-50 text-red-600">{error}</div>}
      {(localLoading || loading) && <LoadingSpinner />}

      <div className="flex justify-between items-center">
        <Button onClick={handleCreate} variant="primary" disabled={loading}>
          Add Product
        </Button>
      </div>

      <div className="overflow-hidden bg-white shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Image
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                PDF
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {products && products.length > 0 ? (
              products.map((product) => (
                <tr key={product.id} className={loading ? 'opacity-50' : ''}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {product.title.length > 30 ? product.title.slice(0, 30) + '…' : product.title}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{product.category}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-500 line-clamp-2">
                      {product.description.length > 50
                        ? product.description.slice(0, 50) + '…'
                        : product.description}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <img
                      src={product.image_url}
                      alt={product.title}
                      className="h-16 w-16 object-cover"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {product.pdf_url ? (
                      <a
                        href={product.pdf_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline"
                      >
                        View PDF
                      </a>
                    ) : (
                      'N/A'
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3">
                    <Button
                      onClick={() => handleEdit(product)}
                      variant="success"
                      size="sm"
                      disabled={loading}
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleDelete(product.id)}
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
                <td colSpan={6} className="px-6 py-4 whitespace-nowrap text-center">
                  {loading ? 'Loading products...' : 'No products found.'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-xl">
            <ProductForm
              product={selectedProduct}
              onCancel={() => setModalOpen(false)}
              onSubmit={async (data) => {
                setLocalLoading(true)
                try {
                  await createProduct(data)
                  await getProducts()
                  setModalOpen(false)
                } catch (error) {
                  logger.log('Failed to create product:', error)
                }
                setLocalLoading(false)
              }}
              onUpdate={async (data) => {
                if (selectedProduct) {
                  setLocalLoading(true)
                  try {
                    await updateProduct(selectedProduct.id, data)
                    await getProducts()
                    setModalOpen(false)
                  } catch (error) {
                    logger.log('Failed to update product:', error)
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