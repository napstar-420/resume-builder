import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../components/footer'

export default function Root() {
  return (
    <div className='flex flex-col min-h-screen'>
      <Outlet />
      <Footer />
    </div>
  )
}
