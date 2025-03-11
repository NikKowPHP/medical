import Image from "next/image";
import Link from "next/link";
import { footerConfig } from "@/config/footer";
import { X, Instagram } from "lucide-react";

export function Footer() {

  const socialIcons = {
    X: X,
    Instagram: Instagram,
  }

  return (
    <>
      <footer
        className="bg-[#014441] w-full py-12 px-[20px] md:px-20 text-white"
        itemScope
        itemType="https://schema.org/Organization"
      >
        <div className="max-w-7xl mx-auto px-[20px] md:px-0">
          <div className="flex flex-col justify-start lg:flex-row gap-[30px] sm:gap-[30px]  lg:gap-[100px]  w-full">

            {/* first row */}
            <div>
              <div className=" border-r border-gray-200 ">
                <Link
                  href="/"
                  className="gap-2 self-start font-bold transition-all duration-300 max-w-[100px] max-h-[38px]"
                  title="Rose Medical"
                  aria-label="Rose Medical Homepage"
                >
                  <Image
                    src="/logo.svg"
                    alt="Rose Medical Logo"
                    width={100}
                    height={100}
                    className="h-auto"
                  />
                </Link>
              </div>
              <div className="text-base ">Disposable Endoscopic Accessories</div>
            </div>


            {/* second row*/}
            <div>
              {/* first column */}
              <div>
                {footerConfig.aboutLinks.map((link) => (
                  <Link href={link.href} key={link.title}>{link.title}</Link>
                ))}

              </div>

              {/* second column */}
              <div>
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
            <div className="flex gap-4">
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
