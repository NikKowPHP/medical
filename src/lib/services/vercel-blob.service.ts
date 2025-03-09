import { put } from "@vercel/blob";
import logger from "../logger"
export class VercelBlobService {
    // Helper function to upload file to Vercel Blob using the SDK
    uploadToVercelBlob = async (file: File): Promise<string> => {
      // Generate a unique path for the file
      const filename = file.name || `upload-${Date.now()}`;
      const path = `products/${Date.now()}-${filename}`;
      logger.log('vercel-blob.service.uploadToVercelBlob.log', path)
      // Read file contents and convert to Buffer
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      logger.log('vercel-blob.service.uploadToVercelBlob.log', buffer)
      // Upload using the Vercel Blob SDK
      const { url } = await put(path, buffer, { access: "public", token: process.env.BLOB_READ_WRITE_TOKEN });
      logger.log('vercel-blob.service.uploadToVercelBlob.log', url)
      return url;
    }
    
}