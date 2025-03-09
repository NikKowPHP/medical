import { SupabaseClient } from '@supabase/supabase-js'
import { Product } from '@/domain/models/models'
import { supabase } from '../supabase'
import logger from '@/lib/logger'
import { IProductRepository } from '../services/product.service';

export class ProductRepository implements IProductRepository {
  private supabaseClient: SupabaseClient
  private tableName: string = 'medical_products'

  constructor() {
    this.supabaseClient = supabase
  }

  getProducts = async (): Promise<Product[]> => {
    const { data, error } = await this.supabaseClient
      .from(`${this.tableName}`)
      .select('*')
      .order('created_at', { ascending: false })
      .throwOnError()

      if (error) {
        logger.log('Error fetching case studies:', error)
        return []
      }

    return data 
  }

  createProduct = async (product: Partial<Product>): Promise<Product> => {
    const { data, error } = await this.supabaseClient
      .from(`${this.tableName}`)
      .insert(product)
      .select()
      .single()
    .throwOnError()

    if (error) {
      logger.log('Error creating product:', error)
      throw error
    }

    return data
  }

  updateProduct = async (id: string, product: Partial<Product>): Promise<Product> => {
    logger.log('product.repository.updateProduct.log', id, product)
    const { data, error } = await this.supabaseClient
      .from(`${this.tableName}`)
      .update(product)
      .eq('id', id)
      .select()
      .single()
    .throwOnError()
    logger.log('product.repository.updateProduct.log', data)

    if (error) {
      logger.log('Error updting product:', error)
      throw error
    }

    return data
  }

  deleteProduct = async (id: string): Promise<void> => {
    logger.log('product.repository.deleteProduct.log', id)
    const { error } = await this.supabaseClient
      .from(`${this.tableName}`)
      .delete()
      .eq('id', id)
      .throwOnError()

    logger.log('product.repository.deleteProduct.log', error)
    if (error) {
      logger.log('Error deleting product:', error)
      throw error
    }
  }
}

// export singleton
export const productRepository = new ProductRepository();
