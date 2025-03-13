import { SupabaseClient } from '@supabase/supabase-js'
import { SliderItem } from '@/domain/models/models'
import { supabase } from '../supabase'
import logger from '@/lib/logger'
import { ISliderRepository } from '@/lib/interfaces/repositories.interface'

export class SliderRepository implements ISliderRepository {
  private supabaseClient: SupabaseClient
  private tableName: string = 'medical_slider'

  constructor() {
    this.supabaseClient = supabase
  }

  getSliderItems = async (): Promise<SliderItem[]> => {
    const { data, error } = await this.supabaseClient
      .from(this.tableName)
      .select('*')
      .order('id', { ascending: false })
      .throwOnError()

    if (error) {
      logger.log('Error fetching slider items:', error)
      return []
    }

    return data
  }

  createSliderItem = async (sliderItem: Partial<SliderItem>): Promise<SliderItem> => {
    const { data, error } = await this.supabaseClient
      .from(this.tableName)
      .insert(sliderItem)
      .select()
      .single()
      .throwOnError()

    if (error) {
      logger.log('Error creating slider item:', error)
      throw error
    }

    return data
  }

  updateSliderItem = async (id: string, sliderItem: Partial<SliderItem>): Promise<SliderItem> => {
    logger.log('slider.repository.updateSliderItem.log', id, sliderItem)
    const { data, error } = await this.supabaseClient
      .from(this.tableName)
      .update(sliderItem)
      .eq('id', id)
      .select()
      .single()
      .throwOnError()

    if (error) {
      logger.log('Error updating slider item:', error)
      throw error
    }

    return data
  }

  deleteSliderItem = async (id: string): Promise<void> => {
    logger.log('slider.repository.deleteSliderItem.log', id)
    const { error } = await this.supabaseClient
      .from(this.tableName)
      .delete()
      .eq('id', id)
      .throwOnError()

    if (error) {
      logger.log('Error deleting slider item:', error)
      throw error
    }
  }

  getSliderItemById = async (id: string): Promise<SliderItem> => {
    logger.log('slider.repository.getSliderItemById.log', id)
    const { data, error } = await this.supabaseClient
      .from(this.tableName)
      .select('*')
      .eq('id', id)
      .single()
      .throwOnError()

    if (error) {
      logger.log('Error fetching slider item by id:', error)
      throw error
    }

    return data
  }
}

// export singleton
export const sliderRepository = new SliderRepository();