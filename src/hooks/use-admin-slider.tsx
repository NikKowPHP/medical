import { useState, useCallback, useEffect } from "react";
import { useApi } from "@/hooks/use-api";
import { SliderItem } from "@/domain/models/models";
import logger from "@/lib/logger";
import { useUpload } from "./use-upload";

export type SliderSubmissionData = Partial<SliderItem> & {
  imageFile?: File;
};

export const useAdminSlider = () => {
  const { fetchApi } = useApi();
  const { uploadFile } = useUpload();

  const [sliderItems, setSliderItems] = useState<SliderItem[]>([]);


  // Upload file for slider items – only processes the image file.
  const uploadFiles = useCallback(
    async (
      data: SliderSubmissionData
    ): Promise<{ imageUrl: string }> => {
      let imageUrl = data.image_url || "";

      if (!data.imageFile) {
        if (imageUrl) {
          // Use the provided image_url if no file was provided
          return { imageUrl };
        }
        throw new Error("No file provided and no existing image URL found");
      }

      if (process.env.NEXT_PUBLIC_MOCK_UPLOADS === "true") {
        imageUrl = `https://6jnegrfq8rkxfevo.public.blob.vercel-storage.com/products/images/1741514066709-2025-03-09_07-55-trAfuCDSuaW2aZYiXHgENMuGfGNdCo.png`;
      } else {
        imageUrl = await uploadFile(data.imageFile, "slider/images");
      }

      if (!imageUrl) throw new Error("Missing image URL");

      return { imageUrl };
    },
    [uploadFile]
  );

  // Validation for slider data – ensures we have an image file or an existing URL.
  const validateSliderData = useCallback((data: SliderSubmissionData): boolean => {
    if (!data.imageFile && !data.image_url) {
      throw new Error("Missing required image file or URL");
    }
    return true;
  }, []);

  // CRUD Methods

  // GET slider items
  const getSliderItems = useCallback(async (): Promise<SliderItem[]> => {
    const result = await fetchApi<SliderItem[]>({
      url: "/api/admin/slider-items",
      method: "GET",
      errorMessage: "Failed to fetch slider items",
    });
    const itemsArray = Array.isArray(result) ? result : [];
    setSliderItems(itemsArray);
    return itemsArray;
  }, [fetchApi]);

  // CREATE a new slider item
  const createSliderItem = useCallback(
    async (data: SliderSubmissionData): Promise<SliderItem> => {
      try {
        // Validate that we have an image file or an image_url.
        validateSliderData(data);

        // Upload file if provided.
        const { imageUrl } = await uploadFiles(data);

        const sliderData = {
          image_url: imageUrl,
          // If you add additional fields to SliderItem, include them here.
        };
      debugger

        const result = await fetchApi<SliderItem>({
          url: "/api/admin/slider-item",
          method: "POST",
          data: sliderData,
          errorMessage: "Failed to create slider item",
        });

        if (!result) {
          throw new Error("Failed to create slider item");
        }

        setSliderItems((prev) => [...prev, result]);
        return result;
      } catch (error) {
        console.error("Error creating slider item:", error);
        throw error;
      }
    },
    [fetchApi, validateSliderData, uploadFiles]
  );

  // UPDATE an existing slider item
  const updateSliderItem = useCallback(
    async (id: string, data: SliderSubmissionData): Promise<SliderItem> => {
      // Optionally update the image only if a new file is provided.
      const { imageUrl } = await uploadFiles(data);

      const sliderData = {
        id,
        image_url: imageUrl,
        // Include other editable fields if available.
      };

      const result = await fetchApi<SliderItem>({
        url: `/api/admin/slider-item`,
        method: "PUT",
        data: sliderData,
        errorMessage: "Failed to update slider item",
      });

      if (!result) {
        throw new Error("Update failed");
      }
      setSliderItems((prevItems) =>
        prevItems.map((item) => (item.id === id ? result : item))
      );
      return result;
    },
    [fetchApi, sliderItems, uploadFiles]
  );

  // DELETE a slider item
  const deleteSliderItem = useCallback(
    async (id: string): Promise<void> => {
      debugger
      await fetchApi({
        url: `/api/admin/slider-item`,
        method: "DELETE",
        data: { id },
        errorMessage: "Failed to delete slider item",
      });
      setSliderItems((prevItems) => prevItems.filter((item) => item.id !== id));
    },
    [fetchApi]
  );

  // Fetch slider items on component mount.
  useEffect(() => {
    getSliderItems();
  }, [getSliderItems]);

  useEffect(() => {
    logger.log("sliderItems", sliderItems);
  }, [sliderItems]);

  return {
    sliderItems,
    getSliderItems,
    createSliderItem,
    updateSliderItem,
    deleteSliderItem,
  };
};