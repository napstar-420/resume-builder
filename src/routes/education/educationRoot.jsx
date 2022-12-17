import React from 'react'
import { FaUniversity } from 'react-icons/fa'

export default function EducationRoot() {
  return (
    <div className='flex flex-col items-center justify-center py-10'>
      <FaUniversity className='text-9xl text-gray-300'/>
      <p className='font-black text-xl text-gray-400'>
        Select a <span className='text-mainYellow'>education</span> to edit or create new
      </p>
    </div>
  )
}
