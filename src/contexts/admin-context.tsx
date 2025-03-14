"use client";

import React, { createContext, useCallback, useContext  } from "react";
import { useApi } from "@/hooks/use-api";
import { Product, SliderItem } from "@/domain/models/models";
import { ProductSubmissionData, useAdminProducts } from "@/hooks/use-admin-products";
import { SliderSubmissionData, useAdminSlider } from "@/hooks/use-admin-slider";

type AdminContextType = {
  // Common
  loading: boolean;
  error: string | null;
  clearError: () => void;
  revalidateCache: () => Promise<void>;

  // Products
  products: Product[];
  getProducts: () => Promise<Product[]>;
  createProduct: (data: ProductSubmissionData) => Promise<Product>;
  updateProduct: (id: string, data: ProductSubmissionData) => Promise<Product>;
  deleteProduct: (id: string) => Promise<void>;

  // Slider
  sliderItems: SliderItem[];
  getSliderItems: () => Promise<SliderItem[]>;
  createSliderItem: (data: SliderSubmissionData) => Promise<SliderItem>;
  updateSliderItem: (id: string, data: SliderSubmissionData) => Promise<SliderItem>;
  deleteSliderItem: (id: string) => Promise<void>;  
 
};

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: React.ReactNode }) {

  const { fetchApi, loading, error, setError } = useApi();



  

  const revalidateCache = useCallback(async () => {
    await fetchApi({
      url: "/api/admin/revalidate",
      method: "GET",
      errorMessage: "Failed to revalidate cache",
    });
  }, [fetchApi]);




  

  

  const clearError = () => setError(null);


  return (
    <AdminContext.Provider
      value={{
        loading,
        error,
        clearError,
        revalidateCache,
        // Product CRUD Methods
        ...useAdminProducts(),
        // Slider CRUD Methods
        ...useAdminSlider(),
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) throw new Error("useAdmin must be used within AdminProvider");
  return context;
};
