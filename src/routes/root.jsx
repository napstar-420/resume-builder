import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from './footer'

export default function Root() {
  return (
    <div className='flex flex-col min-h-screen bg-gray-100'>
      <Outlet />
      <Footer />
    </div>
  )
}
