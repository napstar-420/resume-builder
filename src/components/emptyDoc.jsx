import React from "react";
import emptyIcon from '../assets/empty-folder.png'

export default function EmptyDoc({name}) {
  return (
    <div className='flex-1 flex flex-col items-center my-2 text-center'>
      <img src={emptyIcon} alt="" className="w-[100px] relative after:content-[''] after:w-full after:h-full after:absolute after:bg-white"/>
      <p className='text-md font-medium text-gray-400'>Oops! Looks like {name} is Empty.</p>
    </div>
  );
}
