"use client"

import { Suspense, useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { blogPostService } from '@/lib/services/blog-post.service';
import { BlogPost } from '@/domain/models/models';
import Image from 'next/image';
import { Tag } from '@/components/ui/tag/tag';
import { ArrowUpRight } from 'lucide-react';
import logger from '@/lib/logger';

export interface Product {
  id: string;
  image_url: string;
  description: string;
  pdf_url: string;
  title: string;
  category: string;
  created_at: Date;
  updated_at: Date;
}

const products: Product[] = [
  {
    id: '1',
    image_url: '/product1.avif',
    description:
      'Single-use design eliminates the risk of patient infection, improving patient trust and confidence.',
    pdf_url: 'https://example.com/product1.pdf',
    title: 'Product 1',
    category: 'Enhanced Safety:',
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: '2',
    image_url: '/product1.avif',
    description:
      'Reduces expenses associated with sterilization, disinfectants, and autoclaves. Streamline your workflow and save valuable resources.',
    pdf_url: 'https://example.com/product2.pdf',
    title: 'Product 2',
    category: 'Cost-Effective',
    created_at: new Date(),
    updated_at: new Date(),
  },
];

/**
 * A client-only component that adds a simple parallax effect to an image.
 */
function ParallaxImage({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    function handleScroll() {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        // Adjust the factor (0.1) to control the parallax effect strength.
        setOffset(rect.top * 0.1);
      }
    }
    window.addEventListener('scroll', handleScroll);
    // Initialize the position
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ transform: `translateY(${offset}px)` }}
      className="absolute inset-0 w-full h-full"
    >
      <Image
        src={src}
        alt={alt}
        fill
        className={`object-cover ${className ? className : ''}`}
        loading="lazy"
        quality={100}
      />
    </div>
  );
}

export async function ProductList() {
  // const blogPosts = await blogPostService.getBlogPosts();
  // logger.log('blogposts in blog posts component', blogPosts)

  return (
    <section id="work" className="relative overflow-hidden">
      <div className="max-w-7xl px-[20px] md:px-0 mx-auto py-[80px] flex flex-col gap-[80px]">
        <Suspense
          fallback={
            <div className="min-h-[500px]">
              <span className="sr-only">Loading healthcare articles...</span>
              Loading posts...
            </div>
          }
        >
          <ul
            className="relative mx-auto flex flex-col gap-[32px] md:gap-[40px] w-full justify-start"
            itemScope
            itemType="https://schema.org/ItemList"
          >
            {products.map((product, index) => (
              <ProductItem
                key={product.id}
                product={product}
                position={index + 1}
              />
            ))}
          </ul>
        </Suspense>
      </div>
    </section>
  );
}

const ProductItem = ({
  product,
  position,
}: {
  product: Product;
  position: number;
}) => {
  return (
    <li
      className="max-w-5xl"
      itemScope
      itemType="https://schema.org/Product"
      itemProp="itemListElement"
    >
      {/* Image Section */}
      {product.image_url && (
        <div
          className="w-full relative aspect-[6/3] rounded-xl sm:h-full sm:w-full overflow-hidden"
          role="img"
          aria-label={`${product.title} preview image`}
        >
          <ParallaxImage src={product.image_url} alt={product.title} />
        </div>
      )}

      {/* Content Section */}
      <div className="flex flex-col justify-between h-full p-[20px] gap-[20px] bg-[#FFE8D8]">
        <header className="flex justify-between gap-2">
        

          <div className="flex items-center">
            <span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" focusable="false" color="var(--token-8e9f7d65-9fbe-4bbc-aa91-54812dc50f56, rgb(38, 38, 40))" style="user-select: none; width: 100%; height: 100%; display: inline-block; fill: var(--token-8e9f7d65-9fbe-4bbc-aa91-54812dc50f56, rgb(38, 38, 40)); color: var(--token-8e9f7d65-9fbe-4bbc-aa91-54812dc50f56, rgb(38, 38, 40)); flex-shrink: 0;"><g color="var(--token-8e9f7d65-9fbe-4bbc-aa91-54812dc50f56, rgb(38, 38, 40))" weight="regular"><path d="M56,96v64a8,8,0,0,1-16,0V96a8,8,0,0,1,16,0ZM88,24a8,8,0,0,0-8,8V224a8,8,0,0,0,16,0V32A8,8,0,0,0,88,24Zm40,32a8,8,0,0,0-8,8V192a8,8,0,0,0,16,0V64A8,8,0,0,0,128,56Zm40,32a8,8,0,0,0-8,8v64a8,8,0,0,0,16,0V96A8,8,0,0,0,168,88Zm40-16a8,8,0,0,0-8,8v96a8,8,0,0,0,16,0V80A8,8,0,0,0,208,72Z"></path></g></svg></span>
            <span>
              <Tag variant="simple" className="px-8 text-sm sm:text-base">
                {product.category}
              </Tag>
            </span>
          </div>
        </header>

        <div
          className="text-[16px] sm:text-[18px] lg:text-[20px] font-medium tracking-[-0.02em] flex items-center gap-2"
          itemProp="headline"
        >
          {product.description}
        </div>
        <meta itemProp="position" content={String(position)} />
      </div>
    </li>
  );
};
