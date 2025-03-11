'use client'

import { useState } from 'react'
import { FaqItem  } from '@/lib/data/faq-data'
import { cn } from '@/lib/utils/cn'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { motion } from 'framer-motion'

interface FaqAccordionProps {
  faqItem: FaqItem
  isOpen: boolean
  onToggle: () => void
  faqItems: FaqItem[]
}

function FaqAccordion({ faqItem, isOpen, onToggle }: FaqAccordionProps) {

  return (
    <div
      className="border-b border-gray-200"
      key={faqItem.id}
      itemScope
      itemType="https://schema.org/Question"
    >
      <button
        className="flex w-full items-center justify-between p-[16px] text-left "
        onClick={onToggle}
      >
        <span className="text-[20px] font-medium">
          {faqItem.question}
        </span>
        <span className="ml-6 flex-shrink-0">
          {isOpen ? (
            <motion.div
              animate={{ rotate: 180 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="h-6 w-6" />
            </motion.div>
          ) : (
            <motion.div
              animate={{ rotate: 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="h-6 w-6" />
            </motion.div>
          )}
        </span>
      </button>
      <div
        className={cn(
          'grid overflow-hidden  duration-300 ease-in-out',
          isOpen ? 'grid-rows-[1fr] ' : 'grid-rows-[0fr] '
        )}
      >
        <div className="overflow-hidden"
        
          itemScope
          itemProp="acceptedAnswer"
          itemType="https://schema.org/Answer"
        >
          <p
            itemProp="text"
            className="text-gray-600 text-base pb-6 px-10"
          >
            {faqItem.answer}
          </p>
        </div>
      </div>
    </div>
  )
}

export function Faq({ items }: { items: FaqItem[] }) {
  const [openId, setOpenId] = useState<number | null>(null)

  return (
    <section
      id='faqs'
      className="pb-[80px] "
       itemScope
      itemType="https://schema.org/FAQPage"
    >
      <div className="max-w-7xl mx-auto px-[20px] sm:px-0 flex flex-col gap-[32px]">
        <div className='flex flex-col gap-[24px]'>

        <h2 className="text-black text-[20px]  font-medium " itemProp="name">
          Welcome to FAQ!
        </h2>
        <p className='text-[24px]'>
        Everything You Need to Know Alton's disposable endoscopic accessories supplied by Rose Medical
        </p>
        </div>
        <div 
          className="mx-auto flex flex-col gap-[32px] text-black"
          itemProp="mainEntity"
        >
          {items.map((item) => (
            <FaqAccordion
                  key={item.id}
                  faqItem={item}
                  isOpen={openId === item.id}
                  onToggle={() => setOpenId(openId === item.id ? null : item.id)}
                  faqItems={items}
                />
          ))}
        </div>
      </div>
    </section>
  )
}


