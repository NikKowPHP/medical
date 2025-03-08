import { put } from "@vercel/blob";

export class VercelBlobService {
    // Helper function to upload file to Vercel Blob using the SDK
    uploadToVercelBlob = async (file: File): Promise<string> => {
      // Generate a unique path for the file
      const filename = file.name || `upload-${Date.now()}`;
      const path = `products/${Date.now()}-${filename}`;
      
      // Read file contents and convert to Buffer
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      
      // Upload using the Vercel Blob SDK
      const { url } = await put(path, buffer, { access: "public" });
      return url;
    }
    
}