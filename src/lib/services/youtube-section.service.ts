import { YoutubeItem } from "@/domain/models/models"
import { IYoutubeSectionRepository } from "@/lib/interfaces/repositories.interface"
import { youtubeSectionRepository } from "../repositories/youtube.repository"
import {  youtubeSectionRepositoryLocal } from "../repositories/youtube.repository.local"

export class YoutubeSectionService {
  private youtubeSectionRepository: IYoutubeSectionRepository
  constructor() {
    if(process.env.NEXT_PUBLIC_MOCK_REPOSITORIES === 'true') {
      this.youtubeSectionRepository = youtubeSectionRepositoryLocal 
    } else {
      this.youtubeSectionRepository = youtubeSectionRepository 
    }
  }
 
  getYoutubeSection = async ( ): Promise<YoutubeItem | null> => {
    const youtubeSection = await this.youtubeSectionRepository.getYoutubeSection()
    console.log('youtubeSection fetched in service', youtubeSection)
     return youtubeSection
  }
 

  updateYoutubeSection = async (youtubeSection: Partial<YoutubeItem>): Promise<YoutubeItem> => {
    return this.youtubeSectionRepository.updateYoutubeSection(youtubeSection)
  }
 
}

// export singleton
export const youtubeSectionService = new YoutubeSectionService()

export const getYoutubeSectionService = async () => {
  return new YoutubeSectionService()
}