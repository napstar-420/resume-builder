import React from 'react'
import { BsFillPatchCheckFill } from 'react-icons/bs'

export default function SkillsRoot() {
  return (
    <div className='flex flex-col items-center justify-center py-10'>
      <BsFillPatchCheckFill className='text-8xl mb-2 text-blue-200'/>
      <p className='font-black text-xl text-gray-400'>
        Select a <span className='text-mainYellow'>skill</span> to edit or create new
      </p>
    </div>
  )
}
