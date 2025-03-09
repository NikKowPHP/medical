import { NextRequest, NextResponse } from 'next/server';
import logger from '@/lib/logger';
import { revalidateTag } from 'next/cache';
import { CACHE_TAGS } from '@/lib/utils/cache';
import { productService } from '@/lib/services/product.service';






export async function GET(request: NextRequest) {
  try {
    logger.log('Fetching products', request.url)
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
    const { data } = await request.json();
    const logId = createLogId();
    logger.log(`Processing product creation ${logId}`, { data });
    const newProduct = await productService.createProduct(data);
    logger.log(`Product created ${logId}`, { newProduct });
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


export async function createLogId() {
  return `product-${Date.now().toString()}`;
}