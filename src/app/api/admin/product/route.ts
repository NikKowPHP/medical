import { NextRequest, NextResponse } from 'next/server';
import logger from '@/lib/logger';
import { revalidateTag } from 'next/cache';
import { CACHE_TAGS } from '@/lib/utils/cache';
import { productService } from '@/lib/services/product.service';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    // As the service has no direct getById, fetch all and filter.
    const products = await productService.getProducts();
    const product = products.find(p => p.id === id);
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    return NextResponse.json(product);
  } catch (error) {
    logger.error(`Error fetching product: ${error}`);
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    const { data } = await request.json();
    logger.log(`Updating product: ${id} with data: ${JSON.stringify(data)}`);
    const updatedProduct = await productService.updateProduct(id, data);
    revalidateTag(CACHE_TAGS.PRODUCTS);
    return NextResponse.json(updatedProduct);
  } catch (error) {
    logger.error(`Error updating product: ${error}`);
    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    logger.log(`Deleting product: ${id}`);
    await productService.deleteProduct(id);
    revalidateTag(CACHE_TAGS.PRODUCTS);
    return NextResponse.json({ success: true });
  } catch (error) {
    logger.error(`Error deleting product: ${error}`);
    return NextResponse.json(
      { error: 'Failed to delete product' },
      { status: 500 }
    );
  }
}