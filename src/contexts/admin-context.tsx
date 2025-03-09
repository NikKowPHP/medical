'use client';

import React, { createContext, useCallback, useContext, useState } from 'react';
import { useApi } from '@/hooks/use-api';
import { Product } from '@/domain/models/models';
import { upload } from '@vercel/blob/client';
import logger from '@/lib/logger';

// Update the function types to accept file values as separate fields.
type ProductSubmissionData = Partial<Product> & { 
  imageFile?: File; 
  pdfFile?: File; 
};

type AdminContextType = {
  // Common
  loading: boolean;
  error: string | null;
  clearError: () => void;
  revalidateCache: () => Promise<void>;

  // Product CRUD Methods
  products: Product[];
  getProducts: () => Promise<Product[]>;
  createProduct: (data: ProductSubmissionData) => Promise<Product>;
  updateProduct: (id: string, data: ProductSubmissionData) => Promise<Product>;
  deleteProduct: (id: string) => Promise<void>;
};

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const { fetchApi, loading, error, setError } = useApi();

  const revalidateCache = useCallback(async () => {
    await fetchApi({
      url: '/api/admin/revalidate',
      method: 'GET',
      errorMessage: 'Failed to revalidate cache',
    });
  }, [fetchApi]);

  // Product CRUD Methods

  const getProducts = useCallback(async (): Promise<Product[]> => {
    const result = await fetchApi<Product[]>({
      url: '/api/products',
      method: 'GET',
      errorMessage: 'Failed to fetch products',
    });
    // Ensure we have an array
    const productsArray = Array.isArray(result) ? result : [];
    setProducts(productsArray);
    return productsArray;
  }, [fetchApi]);

  // const uploadFile = useCallback(
  //   async (file: File, path: string): Promise<string> => {
  //     const blob = await upload(path, file, {
  //       access: 'public',
  //       handleUploadUrl: '/api/admin/upload-token',
  //     });
  //     return blob.url;
  //   },
  //   [fetchApi]
  // );

  const createProduct = useCallback(
    async (data: ProductSubmissionData): Promise<Product> => {
     
      try {
        if(!data.imageFile || !data.pdfFile || !data.title || !data.description || !data.category) {
          throw new Error('Missing required fields');
        }
         // Upload image directly to Vercel Blob
         const imageBlob = await upload(`products/${Date.now()}-${data.imageFile.name}`, data.imageFile, {
          access: 'public',
          handleUploadUrl: '/api/admin/upload-token',
          // Optional: Track upload progress
          onUploadProgress: ({ percentage }) => logger.log(`Image upload progress: ${percentage}%`),
        });
        logger.log('imageBlob', imageBlob)
         // Upload PDF directly to Vercel Blob
         const pdfBlob = await upload(`products/${Date.now()}-${data.pdfFile.name}`, data.pdfFile, {
          access: 'public',
          handleUploadUrl: '/api/admin/upload-token',
          // Optional: Track upload progress
          onUploadProgress: ({ percentage }) => logger.log(`PDF upload progress: ${percentage}%`),
        });
        logger.log('pdfBlob', pdfBlob)
      
      const result = await fetchApi<Product>({
        url: '/api/admin/products',
        method: 'POST',
        data: {
          image_url: imageBlob.url,
          pdf_url: pdfBlob.url,
          title: data.title,
          description: data.description,
          category: data.category,
        },
        errorMessage: 'Failed to create product',
      });
      if (!result) {
        throw new Error('Failed to create product');
      }
      setProducts([...products, result]);
      return result;
      } catch (error) {
        console.error('Error creating product:', error);
        throw error;
      }
    },
    [fetchApi, products]
  );

  const updateProduct = useCallback(
    async (id: string, data: ProductSubmissionData): Promise<Product> => {
      const result = await fetchApi<Product>({
        url: `/api/products/${id}`,
        method: 'PUT',
        data,
        errorMessage: 'Failed to update product',
      });
      if (!result) {
        throw new Error('Update failed');
      }
      setProducts(products.map(p => (p.id === id ? result : p)));
      return result;
    },
    [fetchApi, products]
  );

  const deleteProduct = useCallback(
    async (id: string): Promise<void> => {
      await fetchApi({
        url: `/api/products/${id}`,
        method: 'DELETE',
        errorMessage: 'Failed to delete product',
      });
      setProducts(products.filter(p => p.id !== id));
    },
    [fetchApi, products]
  );

  const clearError = () => setError(null);

  return (
    <AdminContext.Provider
      value={{
        loading,
        error,
        clearError,
        revalidateCache,
        // Product CRUD Methods
        products,
        getProducts,
        createProduct,
        updateProduct,
        deleteProduct,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context)
    throw new Error('useAdmin must be used within AdminProvider');
  return context;
};