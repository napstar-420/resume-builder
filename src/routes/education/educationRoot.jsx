import React from 'react'
import { MdWork } from 'react-icons/md'

export default function EducationRoot() {
  return (
    <div className='flex flex-col items-center justify-center py-10'>
      <MdWork className='text-9xl text-gray-300'/>
      <p className='font-black text-xl text-gray-400'>
        Select a work to edit or create new
      </p>
    </div>
  )
}
