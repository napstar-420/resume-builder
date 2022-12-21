import { getAuth } from "firebase/auth";
import React from "react";
import { HiOutlineClipboardDocumentCheck } from "react-icons/hi2";
import { Link, Outlet, redirect, useLoaderData } from "react-router-dom";

export async function loader() {
  const auth = getAuth();
  const user = auth.currentUser;
  if (user) {
    return user.displayName;
  } else {
    return redirect("/");
  }
}

export default function Edit() {
  const displayName = useLoaderData();
  return (
    <div className='flex-1 flex flex-col bg-gray-100'>
      <header className=' py-2 md:py-3 px-4 shadow-lg flex justify-between bg-white'>
        <Link to='/' className='flex items-center'>
          <HiOutlineClipboardDocumentCheck className='mr-2 text-2xl text-blue-500' />
          <h2 className='text-2xl font-medium text-[#505050]'>
            Resume Builder
          </h2>
        </Link>
        <h3 className='hidden xs:block text-xl font-medium font-poppins text-mainYellow'>
          <span className='text-gray-500'>Welcome!</span> {displayName}
        </h3>
      </header>
      <Outlet />
    </div>
  );
}
