export const navigationConfig = {
  mainNav: [
    {
      title: 'About',
      href: '/', // Main page URL
      targetSection: 'about', // Section ID to scroll to
      isRoute: false,
      color: '#fdba74' // orange
    },
    {
      title: 'Features',
      href: '/',
      targetSection: 'features',
      isRoute: false,
      color: '#93c5fd' // blue
    },
    {
      title: 'Products',
      href: '/',
      targetSection: 'products',
      isRoute: false,
      color: '#f9a8d4' // pink
    },
    {
      title: 'Contact',
      href: 'contact',
      isRoute: true,
      color: '#f9a8d4' // pink
    }
  ],
}  as const 