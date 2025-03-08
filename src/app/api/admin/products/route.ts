import { NextRequest, NextResponse } from 'next/server';
import logger from '@/lib/logger';
import { revalidateTag } from 'next/cache';
import { CACHE_TAGS } from '@/lib/utils/cache';
import { productService } from '@/lib/services/product.service';
// 'use server'
import formidable, { IncomingForm, Fields, File } from 'formidable';
import { Readable } from 'stream';
import { IncomingMessage } from 'http';




export const config = {
  api: {
    bodyParser: false, // Disable default body parsing
  },
};

// Helper: Convert NextRequest into a Node.js-expected fake request
async function parseForm(
  req: NextRequest
): Promise<{ fields: Record<string, string[]>; files: Record<string, File[]> }> {
  // Read the full request body as a Buffer
  const buf = Buffer.from(await req.arrayBuffer());
  
  // Create a Node.js readable stream from the Buffer
  const stream = new Readable();
  stream.push(buf);
  stream.push(null);

  // Convert NextRequest headers (a Headers object) into a plain object
  const headersObj: Record<string, string> = {};
  req.headers.forEach((value, key) => {
    headersObj[key] = value;
  });
  
  // Ensure content-length is present – use the buffer length if not provided
  if (!headersObj['content-length']) {
    headersObj['content-length'] = buf.length.toString();
  }

  // Create a "fake" request by merging the stream with the headers.
  const fakeReq = Object.assign(stream, { headers: headersObj });

  return new Promise((resolve, reject) => {
    const form = new IncomingForm();
    form.parse(fakeReq as unknown as IncomingMessage, (err: unknown, fields , files) => {
      if (err) {
        return reject(err);
      }
      // Type assertion to Fields<string>
      const typedFields = fields as Fields<string>;
      // Convert formidable fields to the desired type
      const parsedFields: Record<string, string[]> = {};
      for (const key in typedFields) {
        const value = typedFields[key];
        if (value !== undefined) {
          parsedFields[key] = Array.isArray(value) ? value : [value];
        }
      }
      // Type assertion to Record<string, formidable.File[]>
      const parsedFiles = files as Record<string, formidable.File[]>;
      resolve({ fields: parsedFields, files: parsedFiles });
    });
  });
}


export async function GET(request: NextRequest) {
  try {
    const products = await productService.getProducts();
    return NextResponse.json(products);
  } catch (error) {
    logger.error(`Error fetching products: ${error}`);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    let data: any;
    // Check if the content-type is multipart/form-data
    const contentType = request.headers.get('content-type') || '';
    if (contentType.includes('multipart/form-data')) {
      const { fields, files } = await parseForm(request);
      data = {};
      // Convert each field array to a single value
      for (const key in fields) {
        data[key] = fields[key][0];
      }
      // Attach file data if available
      if (files.imageFile && files.imageFile.length > 0) {
        data.imageFile = files.imageFile[0];
      }
      if (files.pdfFile && files.pdfFile.length > 0) {
        data.pdfFile = files.pdfFile[0];
      }
    } else {
      // Fallback to JSON if not multipart
      const body = await request.json();
      data = body.data;
    }
    logger.log('Processing product creation', { data });
    const newProduct = await productService.createProduct(data);
    revalidateTag(CACHE_TAGS.PRODUCTS);
    return NextResponse.json(newProduct);
  } catch (error) {
    logger.error(`Error creating product: ${error}`);
    return NextResponse.json(
      {
        error: 'Failed to create product',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}