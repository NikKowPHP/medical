"use server"

import { productService } from "@/lib/services/product.service";
import { ProductSectionClient } from "./products-section.client";
import logger from "@/lib/logger";

export default async function ProductSectionServer() {
  const products = await productService.getProducts();
  logger.log('products', products)
  return <ProductSectionClient products={products || []} />;
}