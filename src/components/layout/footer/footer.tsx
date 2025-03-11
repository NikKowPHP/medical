import Image from "next/image";
import Link from "next/link";
import { footerConfig } from "@/config/footer";
import {  Instagram } from "lucide-react";

const XIcon = ({ className }: { className: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      focusable="false"
      style={{
        userSelect: 'none',
        display: 'inline-block',
        flexShrink: 0,
        color: 'white',
      }}
      className={className}
    >
      <g>
        <path
          fill="currentColor"
          d="M214.75,211.71l-62.6-98.38,61.77-67.95a8,8,0,0,0-11.84-10.76L143.24,99.34,102.75,35.71A8,8,0,0,0,96,32H48a8,8,0,0,0-6.75,12.3l62.6,98.37-61.77,68a8,8,0,1,0,11.84,10.76l58.84-64.72,40.49,63.63A8,8,0,0,0,160,224h48a8,8,0,0,0,6.75-12.29ZM164.39,208,62.57,48h29L193.43,208Z"
        />
      </g>
    </svg>
  );
}

export function Footer() {

  const socialIcons = {
    X: XIcon,
    Instagram: Instagram,
  }

 

  return (
    <>
      <footer
        className="bg-[#014441] w-full py-12 px-[20px] md:px-20 text-white text-base"
        itemScope
        itemType="https://schema.org/Organization"
      >
        <div className="max-w-7xl mx-auto px-[20px] md:px-0">
          <div className="flex flex-col justify-start lg:flex-row gap-[30px] sm:gap-[30px]  lg:gap-[100px]  w-full">

            {/* first row */}
            <div className="flex gap-[20px]">
              <div className=" ">
                <Link
                  href="/"
                  className="   max-w-[110px] max-h-[28px]"
                  title="Rose Medical"
                  aria-label="Rose Medical Homepage"
                >
                  <Image
                    src="/logo-white.avif"
                    alt="Rose Medical Logo"
                    width={100}
                    height={100}
                    className="h-auto"
                  />
                </Link>
              </div>
              <span className="text-base border-r border-gray-200 h-[28px]"></span>
              <div className="text-base ">Disposable Endoscopic Accessories</div>
            </div>


            {/* second row*/}
            <div className="flex justify-between gap-[20px]">
              {/* first column */}
              <div className="flex flex-col gap-[10px]">
                {footerConfig.aboutLinks.map((link) => (
                  <Link href={link.href} key={link.title}>{link.title}</Link>
                ))}

              </div>

              {/* second column */}
              <div className="flex flex-col gap-[10px]" >
                {footerConfig.pageLinks.map((link) => (
                  <Link href={link.href} key={link.title}>{link.title}</Link>
                ))}

              </div>
            </div>

            {/* third row */}
            <p className="text-base">
            RoseMed is your trusted source for Alton (Shanghai) Medical Instruments Co., Ltd.'s comprehensive range of disposable endoscopic accessories. 
            </p>

            {/* fourth row | copyright */}
            <p className="text-base">© {new Date().getFullYear()}. All rights reserved. Rose Medical. </p>

            {/* fifth row | social media */}
            <div className="flex gap-4 items-center justify-end  ">
              <span>@rosemedical</span>
              {footerConfig.socialLinks.map((link) => {
                // Get the proper icon component based on the icon property
                const Icon = socialIcons[link.icon as keyof typeof socialIcons];
                return (
                  <Link href={link.href} key={link.title}>
                    <Icon className="w-[30px] h-[30px]"/>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
