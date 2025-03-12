import '@/styles/globals.css'
import { ClientWrapper } from './client-wrapper'
import { PageProvider } from '@/contexts/page-context'
import { siteUrl } from '@/config/constants';
import { SmoothScroll } from '@/components/smooth-scroll';

interface LocaleLayoutProps {
  children: React.ReactNode
}



export default async function LocaleLayout({
  children,
}: LocaleLayoutProps) {



 
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <head>
        <link rel="canonical" href={siteUrl} />
        
        {/* Google Analytics Script */}
        {/* <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
              cookie_flags: 'SameSite=None;Secure'
            });
          `}
        </Script> */}
      </head>
      <body suppressHydrationWarning>
          <PageProvider>
            <ClientWrapper>
              {/* <SmoothScroll> */}
                <main className="relative">{children}</main>
              {/* </SmoothScroll> */}
              </ClientWrapper>
            </PageProvider>
      </body>
    </html>
  )
}
