import { SliderItem } from "@/domain/models/models"
import { ISliderRepository } from "@/lib/interfaces/repositories.interface"
import { sliderRepositoryLocal } from "../repositories/slider.local.repository"
import { sliderRepository } from "../repositories/slider.repository"

export class SliderService {
  private sliderRepository: ISliderRepository

  constructor() {
    if (process.env.MOCK_REPOSITORIES === 'true') {
      this.sliderRepository = sliderRepositoryLocal
    } else {
      // Replace with actual production repository
      this.sliderRepository =  sliderRepository
    }
  }

  getSliderItems = async (): Promise<SliderItem[]> => {
    return this.sliderRepository.getSliderItems()
  }

  createSliderItem = async (
    sliderItem: Partial<SliderItem>
  ): Promise<SliderItem> => {
    console.log('slider.service.createSliderItem.log', sliderItem)
    sliderItem.id = (Math.random() * 1000000) + new Date().getTime().toString()
    return this.sliderRepository.createSliderItem(sliderItem)
  }

  updateSliderItem = async (id: string, sliderItem: Partial<SliderItem>): Promise<SliderItem> => {
    console.log('slider.service.updateSliderItem.log', id, sliderItem)
    return this.sliderRepository.updateSliderItem(id, sliderItem)
  }

  deleteSliderItem = async (id: string): Promise<void> => {
    console.log('slider.service.deleteSliderItem.log', id)
    return this.sliderRepository.deleteSliderItem(id)
  }

  getSliderItemById = async (id: string): Promise<SliderItem> => {
    console.log('slider.service.getSliderItemById.log', id)
    return this.sliderRepository.getSliderItemById(id)
  }
}

// Export singleton instance
export const sliderService = new SliderService()

export const getSliderService = async () => {
  return new SliderService()
}