import { ProductRepository } from "../repositories/product.repository"
import { Product } from "@/domain/models/models"
import { productRepositoryLocal } from "../repositories/product.local.repository"
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

  constructor() {
    if (process.env.MOCK_REPOSITORIES === 'true') {
      this.productRepository = productRepositoryLocal
    } else {
      this.productRepository = productionRepository
    }
  }

  getProducts = async (): Promise<Product[]> => {
    return this.productRepository.getProducts()
  }

  createProduct = async (
    product: Partial<Product> 
  ): Promise<Product> => {
    logger.log('product.service.createProduct.log', product)
    return this.productRepository.createProduct(product)
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