'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button/button"
// import { AnalyticsDashboard } from "@/components/analytics/analyticsDashboard"

export default function AdminDashboard() {
  // const handleRevalidate = async () => {
  //   const response = await fetch('/api/admin/revalidate')
  //   if (response.ok) {
  //     console.log('Cache revalidated')
  //   } else {
  //     console.error('Failed to revalidate cache')
  //   }
  // }
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-[32px] font-medium tracking-[-0.02em] text-gray-900">
          Admin Dashboard
        </h1>
        {/* <Button variant="primary" onClick={handleRevalidate}>
          Revalidate Cache
        </Button> */}
      </div>

      {/* Analytics Dashboard */}
      {/* <div className="mb-8">
        <h2 className="text-xl font-medium text-gray-900 mb-4">Analytics Overview</h2>
        <AnalyticsDashboard />
      </div> */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      


        {/* Slider Section */}
        <Link
          href="/admin/sections/slider"
          className="flex flex-col p-6 bg-white border-2 border-gray-200 hover:shadow-lg transition-shadow"
        >
          <h2 className="text-xl font-medium text-gray-900 mb-2">
            Slider Section
          </h2>
          <p className="text-gray-600 mb-4">
            Manage the slider section.
          </p>
          <Button variant="primary" className="mt-auto w-full sm:w-auto">
            Manage Slider Section
          </Button>
        </Link>

        {/* Products Section */}
        <Link
          href="/admin/sections/products"
          className="flex flex-col p-6 bg-white border-2 border-gray-200 hover:shadow-lg transition-shadow"
        >
          <h2 className="text-xl font-medium text-gray-900 mb-2">
            Products Section
          </h2>
          <p className="text-gray-600 mb-4">
            Manage the products section.
          </p>
          <Button variant="primary" className="mt-auto w-full sm:w-auto">
            Manage Products Section
          </Button>
        </Link>

        {/* Add more admin sections here as needed */}
      </div>
    </div>
  )
} 