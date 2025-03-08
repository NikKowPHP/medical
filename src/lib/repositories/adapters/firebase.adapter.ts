import * as admin from 'firebase-admin';
import logger from '@/lib/logger';

export class FirebaseAdapter {
  private bucket: admin.storage.Bucket;

  constructor(bucketName?: string) {
    this.bucket = admin.storage().bucket(bucketName);
  }

  /**
   * Uploads a file to Firebase Storage.
   *
   * @param localFilePath - Local file path to upload.
   * @param destinationPath - Destination path in the storage bucket.
   * @returns Public URL of the uploaded file.
   * @throws Error if the upload fails.
   */
  async uploadFile(localFilePath: string, destinationPath: string): Promise<string> {
    try {
      await this.bucket.upload(localFilePath, { destination: destinationPath });
      const file = this.bucket.file(destinationPath);
      await file.makePublic();
      const publicUrl = `https://storage.googleapis.com/${this.bucket.name}/${destinationPath}`;
      return publicUrl;
    } catch (error: any) {
      logger.log(`Error uploading file to ${destinationPath}:`, error);
      throw new Error(`Firebase upload error: ${error.message || 'Unknown error'}`);
    }
  }

  /**
   * Downloads a file from Firebase Storage.
   *
   * @param sourcePath - Source file path in the storage bucket.
   * @param destinationPath - Local destination path.
   * @returns void
   * @throws Error if the download fails.
   */
  async downloadFile(sourcePath: string, destinationPath: string): Promise<void> {
    try {
      const file = this.bucket.file(sourcePath);
      await file.download({ destination: destinationPath });
    } catch (error: any) {
      logger.log(`Error downloading file from ${sourcePath}:`, error);
      throw new Error(`Firebase download error: ${error.message || 'Unknown error'}`);
    }
  }
}