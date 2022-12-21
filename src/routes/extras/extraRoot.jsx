import React from 'react';
import { MdWidgets } from 'react-icons/md';

export default function ExtraRoot() {
  return (
    <div className='flex flex-col items-center justify-center py-10'>
      <MdWidgets className='text-9xl text-blue-200'/>
      <p className='font-black text-xl text-gray-400'>
        Select an <span className='text-mainYellow'>extra</span> to edit or create new
      </p>
    </div>
  )
}