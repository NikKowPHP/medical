import { Newspaper, Star, Flag } from "lucide-react";

export interface ProcessItem {
    id: string
    title: string
    content: string
    icon: keyof typeof LucideIcons;
  }
  export const LucideIcons = {
    Newspaper,
    Star,
    Flag,
  };

  export const processItems: ProcessItem[] = [

    {
        id: 'items.item1',
        title: 'Ready to Use',
        content: 'Eliminates downtime waiting for autoclaving. Instruments are available immediately when you need them. Streamline procedures and optimize your schedule.',
        icon: 'Newspaper'
      },
      {
        id: 'items.item2',
        title: 'Consistent Quality',
        content: 'Ensures that the quality and properties of the equipment are not compromised by repeated use. Precise performance with every procedure.',
        icon: 'Star'
      },
      {
        id: 'items.item3',
        title: 'Comprehensive Range',
        content: '	Biopsy Products •	ERCP Instruments •	EMR Instruments •	ESD Instruments •	Grasping Forceps •	Hemoclips •	Retrieval Baskets •	Other Products',
        icon: 'Flag'
      },
    
    // Add more testimonials
  ]
  
  export async function getProcessItems(): Promise<ProcessItem[]> {
    return processItems
  }