'use client';

import React, { createContext, useCallback, useContext, useState } from 'react';
import { useApi } from '@/hooks/use-api';
import {  Product } from '@/domain/models/models';

type AdminContextType = {

  // Common
  loading: boolean;
  error: string | null;
  clearError: () => void;
  revalidateCache: () => Promise<void>;


  // Product CRUD Methods
  products: Product[];
  getProducts: () => Promise<Product[]>;
  createProduct: (data: Partial<Product>) => Promise<Product>;
  updateProduct: (id: string, data: Partial<Product>) => Promise<Product>;
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
      errorMessage: 'Failed to revalidate cache'
    });
  }, [fetchApi]);

  // Product CRUD Methods

  const getProducts = useCallback(async (): Promise<Product[]> => {
    const result = await fetchApi<Product[]>({
      url: '/api/products',
      method: 'GET',
      errorMessage: 'Failed to fetch products'
    });
    // Ensure we have an array
    const productsArray = Array.isArray(result) ? result : [];
    setProducts(productsArray);
    return productsArray;
  }, [fetchApi]);

  const createProduct = useCallback(async (data: Partial<Product>): Promise<Product> => {
    const result = await fetchApi<Product>({
      url: '/api/products',
      method: 'POST',
      data,
      errorMessage: 'Failed to create product'
    });
    if (!result) {
      throw new Error('Failed to create product');
    }
    setProducts([...products, result]);
    return result;
  }, [fetchApi]);

  const updateProduct = useCallback(async (id: string, data: Partial<Product>): Promise<Product> => {
    const result = await fetchApi<Product>({
      url: `/api/products/${id}`,
      method: 'PUT',
      data,
      errorMessage: 'Failed to update product'
    });
    if (!result) {
      throw new Error('Update failed');
    }
    setProducts(products.map(p => p.id === id ? result : p));
    return result;
  }, [fetchApi]);

  const deleteProduct = useCallback(async (id: string): Promise<void> => {
    await fetchApi({
      url: `/api/products/${id}`,
      method: 'DELETE',
      errorMessage: 'Failed to delete product'
    });
    setProducts(products.filter(p => p.id !== id));
  }, [fetchApi]);

  const clearError = () => setError(null);

  return (
    <AdminContext.Provider value={{
      loading,
      error,
      clearError,
      revalidateCache,
      // Product CRUD Methods
      products,
      getProducts,
      createProduct,
      updateProduct,
      deleteProduct
    }}>
      {children}
    </AdminContext.Provider>
  );
}

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) throw new Error('useAdmin must be used within AdminProvider');
  return context;
};