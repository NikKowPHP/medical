export interface FaqItem {
  id: number
  question: string
  answer: string
}

export const faqItems: FaqItem[] = [
  {
    id: 1,
    question: 'What is a one-page website?',
    answer: "Why should I choose disposable endoscopic instruments over reusable ones?"
  },
  {
    id: 2,
    question: 'What are the benefits of a multi-page website?',
    answer: "Multi-page websites offer more detailed content organization, better SEO opportunities, and are ideal for complex businesses. They allow for deeper content hierarchies, dedicated sections for different services or products, and can grow with your business. They're particularly effective for content-rich sites and e-commerce platforms."
  },
  {
        id: 3,
    question: 'How long does it take to design and develop a website?',
    answer: 'The timeline varies depending on the project scope. A one-page website typically takes 2-3 days, while multi-page websites can take 1-4 weeks. Factors affecting the timeline include design complexity, number of pages, custom features, and content preparation.'
  },
  {
    id: 4,
    question: 'Will my website be mobile-friendly?',
    answer: 'Yes, absolutely! All our websites are built with a mobile-first approach and are fully responsive. They automatically adjust to look and function perfectly on all devices - smartphones, tablets, laptops, and desktop computers.'
  },
  {
    id: 5,
    question: 'Do you offer ongoing support after the website is launched?',
    answer: 'Yes, we provide ongoing maintenance and support to ensure your website continues to perform optimally. This includes regular updates, security monitoring, and technical support when needed.'
  },
  {
    id: 6,
    question: 'What if I need additional features later?',
    answer: 'Our websites are built to be scalable. You can easily add new features or functionality as your business grows. We can help you plan and implement these additions while maintaining the consistency and performance of your site.'
  },
  {
    id: 7,
    question: 'How do I choose between a one-page and a multi-page website?',
    answer: 'The choice depends on your specific needs. One-page sites are great for simple presentations and focused messages, while multi-page sites are better for complex content and larger businesses. We can help you evaluate your needs and recommend the best solution.'
  },
  {
    id: 8,
    question: 'How do I get started?',
    answer: "Getting started is easy! Simply book a call with us, and we'll discuss your project requirements, timeline, and budget. We'll guide you through the entire process and help you choose the best solution for your needs."
  }
]

export async function getFaqItems(): Promise<FaqItem[]> {
  
  return faqItems
} 