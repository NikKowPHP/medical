"use client";

import { Suspense, useRef } from "react";
import Link from "next/link";
import { Product } from "@/domain/models/models";
import Image from "next/image";
import { Tag } from "@/components/ui/tag/tag";
import { ChevronRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";

const products: Product[] = [
  {
    id: "1",
    image_url: "/product1.avif",
    description:
      "Single-use design eliminates the risk of patient infection, improving patient trust and confidence.",
    pdf_url: "https://example.com/product1.pdf",
    title: "Product 1",
    category: "Enhanced Safety:",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: "2",
    image_url: "/product1.avif",
    description:
      "Reduces expenses associated with sterilization, disinfectants, and autoclaves. Streamline your workflow and save valuable resources.",
    pdf_url: "https://example.com/product2.pdf",
    title: "Product 2",
    category: "Cost-Effective",
    created_at: new Date(),
    updated_at: new Date(),
  },
];

/**
 * A client-only component that adds a parallax effect to an image using Framer Motion.
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

  // Get the scroll progress relative to the element referenced by containerRef.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Map the scroll progress to a translateY effect.
  // Adjust the output range (here: 0 to 50) to change the parallax strength.
  const y = useTransform(scrollYProgress, [0, 1], [0, 50]);

  return (
    <motion.div ref={containerRef} style={{ y }} className="absolute inset-0 w-full h-full">
      <Image
        src={src}
        alt={alt}
        fill
        className={`object-cover ${className ? className : ""}`}
        loading="lazy"
        quality={100}
      />
    </motion.div>
  );
}

export async function ProductList() {
  // const blogPosts = await blogPostService.getBlogPosts();
  // logger.log('blogposts in blog posts component', blogPosts)

  return (
    <section id="work" className="relative overflow-hidden">
      <div className="max-w-7xl px-[20px] md:px-0 mx-auto py-[80px]">
        <Suspense
          fallback={
            <div className="min-h-[500px]">
              <span className="sr-only">Loading healthcare articles...</span>
              Loading posts...
            </div>
          }
        >
            <ul
              className="relative  flex flex-col gap-[32px] md:gap-[40px] justify-start md:justify-center md:items-center border border-green-500"
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
      className=" w-full"
      itemScope
      itemType="https://schema.org/Product"
      itemProp="itemListElement"
    >
      <div className="flex flex-col md:flex-row justify-between gap-[24px] border border-red-500">
        {/* Image Section */}
        {product.image_url && (
          <div
            className="relative w-full h-full aspect-[6/3] rounded-xl overflow-hidden md:order-2 "
            role="img"
            aria-label={`${product.title} preview image`}
          >
            <ParallaxImage src={product.image_url} alt={product.title} />
          </div>
        )}
        <div className="flex flex-col gap-[24px] border border-blue-500 w-full">
          {/* Content Section */}
          <div className="flex flex-col justify-between h-full  gap-[20px] ">
            <header className="flex justify-between gap-2">
              <div className="flex items-center gap-2">
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 256 256"
                    focusable="false"
                    className="w-6 h-6"
                    color="var(--token-8e9f7d65-9fbe-4bbc-aa91-54812dc50f56, rgb(38, 38, 40))"
                    style={{
                      userSelect: "none",

                      display: "inline-block",
                      fill: "var(--token-8e9f7d65-9fbe-4bbc-aa91-54812dc50f56, rgb(38, 38, 40))",
                      color:
                        "var(--token-8e9f7d65-9fbe-4bbc-aa91-54812dc50f56, rgb(38, 38, 40))",
                      flexShrink: 0,
                    }}
                  >
                    <g color="var(--token-8e9f7d65-9fbe-4bbc-aa91-54812dc50f56, rgb(38, 38, 40))">
                      <path d="M56,96v64a8,8,0,0,1-16,0V96a8,8,0,0,1,16,0ZM88,24a8,8,0,0,0-8,8V224a8,8,0,0,0,16,0V32A8,8,0,0,0,88,24Zm40,32a8,8,0,0,0-8,8V192a8,8,0,0,0,16,0V64A8,8,0,0,0,128,56Zm40,32a8,8,0,0,0-8,8v64a8,8,0,0,0,16,0V96A8,8,0,0,0,168,88Zm40-16a8,8,0,0,0-8,8v96a8,8,0,0,0,16,0V80A8,8,0,0,0,208,72Z" />
                    </g>
                  </svg>
                </span>
                <span>
                  <Tag variant="simple" className="px-8 text-[20px]">
                    {product.category}
                  </Tag>
                </span>
              </div>
            </header>

            <div
              className="text-[26px] sm:text-[18px] lg:text-[20px] font-medium tracking-[-0.02em] flex items-center gap-2"
              itemProp="headline"
            >
              {product.description}
            </div>
            <meta itemProp="position" content={String(position)} />
          </div>

          <div className="flex flex-wrap  gap-[10px]">
            <Link
              href="/products"
              className="flex items-center gap-[10px] text-white  text-[16px] bg-[#014441] rounded-full  pl-[20px] pr-[10px] py-[15px]"
            >
              Request a Quote <ChevronRight className="w-6 h-6" />
            </Link>
            <Link
              href="/products"
              className="flex items-center gap-[10px] text-white  text-[16px] bg-[black] rounded-full  pl-[20px] pr-[10px] py-[15px]"
            >
              Download Product Brochure <ChevronRight className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </div>
    </li>
  );
};
