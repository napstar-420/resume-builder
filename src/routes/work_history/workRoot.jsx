import React from 'react';
import {MdWork} from 'react-icons/md';

export default function WorkRoot() {
  return (
    <div className='flex flex-col items-center justify-center py-10'>
      <MdWork className='text-8xl sm:text-9xl text-blue-200'/>
      <p className='font-medium text-lg sm:text-xl text-gray-400 font-poppins'>
        Select a <span className='text-mainYellow'>work</span> to edit or create new
      </p>
    </div>
  )
}
