import { ProductRepository } from "../repositories/product.repository"
import { Product } from "@/domain/models/models"
import { productRepositoryLocal } from "../repositories/product.local.repository"
import { VercelBlobService } from "./vercel-blob.service"
import logger from "../logger"

export interface IProductRepository {
  getProducts(): Promise<Product[]>
  createProduct(product: Partial<Product>): Promise<Product>
  updateProduct(id: string, product: Partial<Product>): Promise<Product>
  deleteProduct(id: string): Promise<void>
}

// Create an instance of the production repository
const productionRepository = new ProductRepository()

export class ProductService {
  private productRepository: IProductRepository
  private blobService: VercelBlobService

  constructor() {
    this.blobService = new VercelBlobService()
    if (process.env.MOCK_REPOSITORIES === 'true') {
      this.productRepository = productRepositoryLocal
    } else {
      this.productRepository = productionRepository
    }
  }

  getProducts = async (): Promise<Product[]> => {
    return this.productRepository.getProducts()
  }

  // Allow optional imageFile and pdfFile for uploads
  createProduct = async (
    product: Partial<Product> & { imageFile?: File; pdfFile?: File }
  ): Promise<Product> => {
    const finalProduct = { ...product }
    logger.log('product.service.createProduct.log', finalProduct)
    if (product.imageFile) {
      finalProduct.image_url = await this.blobService.uploadToVercelBlob(product.imageFile);
    }
    if (product.pdfFile) {
      finalProduct.pdf_url = await this.blobService.uploadToVercelBlob(product.pdfFile);
    }
    return this.productRepository.createProduct(finalProduct)
  }

  updateProduct = async (id: string, product: Partial<Product>): Promise<Product> => {
    return this.productRepository.updateProduct(id, product)
  }

  deleteProduct = async (id: string): Promise<void> => {
    return this.productRepository.deleteProduct(id)
  }
}

// Export singleton
export const productService = new ProductService()

export const getProductService = async (): Promise<ProductService> => {
  return new ProductService()
}