export const footerConfig = {
  aboutLinks: [
   
    {
      title: 'Contact us',
      href: 'contact-us',
      isRoute: true,
    },
  
  ],
  pageLinks: [
   
    {
      title: 'Terms of Service',
      href: 'terms-of-service',
      isRoute: true,
    },
    {
      title: 'Privacy Policy',
      href: 'privacy-policy',
      isRoute: true,
    },
  ],
  socialLinks: [
    {
      title: 'X',
      href: 'https://x.com/rosemedical',
      isRoute: false,
      icon: 'X',
    },
    {
      title: 'Instagram',
      href: 'https://www.instagram.com/rosemedical',
      isRoute: false,
      icon: 'Instagram',
    },
  ],
} as const 

