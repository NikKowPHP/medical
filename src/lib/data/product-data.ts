import { Product } from "@/domain/models/models";
const products: Product[] = [
  {
    id: "1",
    image_url: "/product1.avif",
    description:
      "Single-use design eliminates the risk of patient infection, improving patient trust and confidence.",
    pdf_url: "https://example.com/product1.pdf",
    title: "Product 1",
    category: "Enhanced Safety:",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: "2",
    image_url: "/product1.avif",
    description:
      "Reduces expenses associated with sterilization, disinfectants, and autoclaves. Streamline your workflow and save valuable resources.",
    pdf_url: "https://example.com/product2.pdf",
    title: "Product 2",
    category: "Cost-Effective",
    created_at: new Date(),
    updated_at: new Date(),
  },
];

export async function getProductItems(): Promise<Product[]> {
  
  return products
} 