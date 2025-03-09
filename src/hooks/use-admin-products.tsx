import { useState, useCallback, useEffect } from "react";
import { useApi } from "@/hooks/use-api";
import { upload } from "@vercel/blob/client";
import { Product } from "@/domain/models/models";
import logger from "@/lib/logger";

export type ProductSubmissionData = Partial<Product> & {
  imageFile?: File;
  pdfFile?: File;
};

export const useAdminProducts = () => {
  const { fetchApi } = useApi();

  const [products, setProducts] = useState<Product[]>([]);

  





  // helper functions
  const uploadFile = useCallback(
    async (file: File, pathPrefix: string): Promise<string> => {
      const filename = `${pathPrefix}/${Date.now()}-${file.name}`;
      const blob = await upload(filename, file, {
        access: "public",
        handleUploadUrl: "/api/admin/upload-token",
        clientPayload: JSON.stringify({
          __development__: "bypass-auth-for-localhost",
        }),
        onUploadProgress: ({ percentage }) =>
          logger.log(`Upload progress: ${percentage}%`),
      });
      return blob.url;
    },
    []
  );

  const uploadFiles = useCallback(
    async (
      data: ProductSubmissionData
    ): Promise<{ imageUrl: string; pdfUrl: string }> => {
      let imageUrl = data.image_url || '';
      let pdfUrl = data.pdf_url || '';

      if (!data.imageFile && !data.pdfFile) {
        if (imageUrl && pdfUrl) {
          return { imageUrl, pdfUrl };
        }
        throw new Error("No files provided and no existing URLs found");
      }

      if (process.env.NEXT_PUBLIC_MOCK_UPLOADS === "true") {
        if(data.imageFile) {
          imageUrl = `https://6jnegrfq8rkxfevo.public.blob.vercel-storage.com/products/images/1741514066709-2025-03-09_07-55-trAfuCDSuaW2aZYiXHgENMuGfGNdCo.png`;
        }
        if(data.pdfFile) {
          pdfUrl = `https://6jnegrfq8rkxfevo.public.blob.vercel-storage.com/products/documents/1741514066710-MikitaKavaliou_CV-o9tq6KQeC8Awjc34ZpYCfci1PLfycY.pdf?download=1`;
        }
      } else {
        const uploadPromises = [];
        if(data.imageFile) {
          uploadPromises.push(
            uploadFile(data.imageFile!, "products/images")
            .then((url) => { imageUrl = url; })
          );
        }
        if(data.pdfFile) {
          uploadPromises.push(
            uploadFile(data.pdfFile!, "products/documents")
            .then((url) => { pdfUrl = url; })
          );
        }
        await Promise.all(uploadPromises);
      }
          // Validate we have URLs for required fields
    
      if (!imageUrl) throw new Error("Missing image URL");
      if (!pdfUrl) throw new Error("Missing PDF URL");
      
      return { imageUrl, pdfUrl };
    },
    [uploadFile]
  );

  const validateProductData = useCallback(
    (data: ProductSubmissionData): boolean => {
      if (
        !data.imageFile ||
        !data.pdfFile ||
        !data.title ||
        !data.description ||
        !data.category
      ) {
        throw new Error("Missing required fields");
      }
      return true;
    },
    []
  );




  // Product CRUD Methods
  const getProducts = useCallback(async (): Promise<Product[]> => {
    const result = await fetchApi<Product[]>({
      url: "/api/admin/products",
      method: "GET",
      errorMessage: "Failed to fetch products",
    });
    // debugger;
    // Ensure we have an array
    const productsArray = Array.isArray(result) ? result : [];
    setProducts(productsArray);
    return productsArray;
  }, [fetchApi]);


  const createProduct = useCallback(
    async (data: ProductSubmissionData): Promise<Product> => {
      try {
        // Validate required fields
        validateProductData(data);

        // debugger

        const { imageUrl, pdfUrl } = await uploadFiles(data);
        // debugger

        logger.log("Image uploaded successfully:", imageUrl);
        logger.log("PDF uploaded successfully:", pdfUrl);

        const productData = {
          title: data.title,
          description: data.description,
          category: data.category,
          image_url: imageUrl,
          pdf_url: pdfUrl,
        };

        logger.log(`Product data: ${JSON.stringify(productData)}`);

        const result = await fetchApi<Product>({
          url: "/api/admin/products",
          method: "POST",
          data: productData,
          errorMessage: "Failed to create product",
        });
        debugger;

        logger.log(`Product created: ${JSON.stringify(result)}`);

        if (!result) {
          throw new Error("Failed to create product");
        }

        setProducts((prev) => [...prev, result]);
        return result;
      } catch (error) {
        console.error("Error creating product:", error);
        throw error;
      }
    },
    [fetchApi, validateProductData, uploadFiles]
  );

  const updateProduct = useCallback(
    async (id: string, data: ProductSubmissionData): Promise<Product> => {
      // debugger

      const { imageUrl, pdfUrl } = await uploadFiles(data);

      logger.log("Image uploaded successfully:", imageUrl);
      logger.log("PDF uploaded successfully:", pdfUrl);

      const productData = {
        id: id,
        title: data.title,
        description: data.description,
        category: data.category,
        image_url: imageUrl,
        pdf_url: pdfUrl,
      };

      const result = await fetchApi<Product>({
        url: `/api/admin/product`,
        method: "PUT",
        data: productData,
        errorMessage: "Failed to update product",
      });
      debugger
      if (!result) {
        throw new Error("Update failed");
      }
      setProducts(products.map((p) => (p.id === id ? result : p)));
      return result;
    },
    [fetchApi, products, uploadFiles]
  );

  const deleteProduct = useCallback(
    async (id: string): Promise<void> => {
      await fetchApi({
        url: `/api/admin/product`,
        method: "DELETE",
        data: { id },
        errorMessage: "Failed to delete product",
      });
      setProducts(products.filter((p) => p.id !== id));
    },
    [fetchApi, products]
  );




  useEffect(() => {
    getProducts()
  }, [getProducts])
 
  useEffect(() => {
    logger.log('products', products)
    if (products && products.length > 0) {
      // debugger
      
    }
  }, [products])

  
  return {
    products,
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct,
  };
};
