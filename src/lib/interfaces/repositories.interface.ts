import { Product, QuoteItem } from "@/domain/models/models"
import { YoutubeItem } from "@/domain/models/models"
import { BlogPost, SliderItem } from "@/domain/models/models"

export interface IQuoteSectionRepository {
  getQuoteSection: () => Promise<QuoteItem | null>
  updateQuoteSection: (id: string, quoteSection: Partial<QuoteItem>) => Promise<QuoteItem>
}

export interface IYoutubeSectionRepository {
  getYoutubeSection: () => Promise<YoutubeItem | null>
  updateYoutubeSection: (youtubeSection: Partial<YoutubeItem>) => Promise<YoutubeItem>
}

export interface IBlogPostRepository {
  getBlogPosts: ( ) => Promise<BlogPost[]>
  getBlogPostBySlug: (slug: string) => Promise<BlogPost | null>
  createBlogPost: (blogPost: Omit<BlogPost, 'id'>) => Promise<BlogPost>
  updateBlogPost: (id: string, blogPost: Partial<BlogPost>) => Promise<BlogPost | null>
  deleteBlogPost: (id: string) => Promise<boolean>
  getBlogPostById: (id: string) => Promise<BlogPost | null>
}

export interface ISliderRepository {
  getSliderItems: () => Promise<SliderItem[]>
  createSliderItem: (sliderItem: Partial<SliderItem>) => Promise<SliderItem>
  updateSliderItem: (id: string, sliderItem: Partial<SliderItem>) => Promise<SliderItem>
  deleteSliderItem: (id: string) => Promise<void>
  getSliderItemById: (id: string) => Promise<SliderItem>
}

export interface IProductRepository {
  getProducts(): Promise<Product[]>
  createProduct(product: Partial<Product>): Promise<Product>
  updateProduct(id: string, product: Partial<Product>): Promise<Product>
  deleteProduct(id: string): Promise<void>
  getProductById(id: string): Promise<Product>
}