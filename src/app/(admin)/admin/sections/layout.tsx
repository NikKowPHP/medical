import { headers } from 'next/headers';
import Link from 'next/link'
import { LayoutDashboard, ShoppingBag } from 'lucide-react'
import { AdminProvider } from '@/contexts/admin-context'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const headersList = headers();
  const pathname = headersList.get('next-url') || '/';
  
  return (
    <AdminProvider>
      <div className="min-h-screen bg-gray-50 flex">
        {/* Sidebar */}
        <aside className=" w-[100px] md:w-[200px] bg-white shadow-sm py-8 px-6 fixed top-0 left-0 h-full">
          <Link href="/admin/dashboard" className="flex items-center gap-2 mb-12">
            <span className="text-sm font-medium text-gray-500">Admin</span>
          </Link>

          <nav className="flex flex-col space-y-1">
            <Link 
              href="/admin/sections/dashboard" 
              className={`flex items-center gap-3 py-3 px-4 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors ${
                pathname === '/admin/sections/dashboard' ? 'bg-gray-100 font-semibold text-primary-500' : ''
              }`}
            >
              <LayoutDashboard className="w-5 h-5" />
              <span className="font-medium hidden md:block">Dashboard</span>
            </Link>
            
            {/* Products Link */}
            <Link
              href="/admin/sections/products"
              className={`flex items-center gap-3 py-3 px-4 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors ${
                pathname === '/admin/sections/products' ? 'bg-gray-100 font-semibold text-primary-500' : ''
              }`}
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="font-medium hidden md:block">Products</span>
            </Link>

            <Link
              href="/admin/sections/slider"
              className={`flex items-center gap-3 py-3 px-4 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors ${
                pathname === '/admin/sections/slider' ? 'bg-gray-100 font-semibold text-primary-500' : ''
              }`}
            >
              <LayoutDashboard className="w-5 h-5" />
              <span className="font-medium hidden md:block">Slider</span>
            </Link>

          
          </nav>
        </aside>

        {/* Main Content */}
        <main className=" ml-[100px] md:ml-[200px]  flex-1 py-8">
          <div className="max-w-7xl mx-auto px-8">
            {children}
          </div>
        </main>
      </div>
    </AdminProvider>
  )
} 