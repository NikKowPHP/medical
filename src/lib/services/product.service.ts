import { ProductRepository } from "../repositories/product.repository"
import { Product } from "@/domain/models/models"
import { productRepositoryLocal } from "../repositories/product.local.repository"
import logger from "../logger"
import { IProductRepository } from "@/lib/interfaces/repositories.interface"

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
    logger.log('product.service.updateProduct.log', id, product)
    return this.productRepository.updateProduct(id, product)
  }

  deleteProduct = async (id: string): Promise<void> => {
    logger.log('product.service.deleteProduct.log', id)
    return this.productRepository.deleteProduct(id)
  }

  getProductById = async (id: string): Promise<Product> => {
    logger.log('product.service.getProductById.log', id)
    return this.productRepository.getProductById(id)
  }
}

// Export singleton
export const productService = new ProductService()

export const getProductService = async (): Promise<ProductService> => {
  return new ProductService()
}