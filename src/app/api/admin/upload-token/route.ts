import logger from '@/lib/logger';
import { handleUpload } from '@vercel/blob/client';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  // You could add auth checking here to ensure only authorized users can upload
  try {
    const body = await request.json();
    
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname, clientPayload) => {
        logger.log('onBeforeGenerateToken', pathname, clientPayload)
        return {
          allowedContentTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/avif', 'application/pdf'],
          maximumSizeInBytes: 10 * 1024 * 1024, // 10MB file size limit
        };
      },
      onUploadCompleted: async ({ blob, tokenPayload }) => {
        // This won't work on localhost - needs a public URL
        logger.log('Upload completed:', blob);
        logger.log('tokenPayload', tokenPayload)
        // You could update your database here or perform other actions
        // when the upload is complete
      },
    });

    return NextResponse.json(jsonResponse);
  } catch (error) {
    console.error('Error handling upload:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 400 }
    );
  }
}