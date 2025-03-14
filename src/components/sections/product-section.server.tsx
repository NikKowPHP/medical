"use server"

import { productService } from "@/lib/services/product.service";
import { ProductSectionClient } from "./products-section.client";

export default async function ProductSectionServer() {
  const products = await productService.getProducts();
  return <ProductSectionClient products={products || []} />;
}