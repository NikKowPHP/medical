

export interface SliderItem {
  id: string
  image_url: string

}

  export const sliderItems: SliderItem[] = [

    {
        id: 'items.item1',
        image_url: '/product1.avif',
        
      },
      {
        id: 'items.item2',
        image_url: '/alton.avif',
      },
      {
        id: 'items.item3',
        image_url: '/subhero.avif',
      },
    
    // Add more testimonials
  ]
  
  export async function getSlider(): Promise<SliderItem[]> {
    return sliderItems
  }