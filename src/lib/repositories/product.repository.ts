import { SupabaseClient } from '@supabase/supabase-js'
import { Product } from '@/domain/models/models'
import { supabase } from '../supabase'
import logger from '@/lib/logger'
export class ProductRepository {
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

    if (error) {
      logger.log('Error creating case study:', error)
      throw error
    }

    return data
  }

  updateProduct = async (id: string, product: Partial<Product>): Promise<Product> => {
    const { data, error } = await this.supabaseClient
      .from(`${this.tableName}`)
      .update(product)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      logger.log('Error updating case study:', error)
      throw error
    }

    return data
  }

  deleteProduct = async (id: string): Promise<void> => {
    const { error } = await this.supabaseClient
      .from(`${this.tableName}`)
      .delete()
      .eq('id', id)

    if (error) {
      logger.log('Error deleting case study:', error)
      throw error
    }
  }
}

// export singleton
export const productRepository = new ProductRepository();
