import { getAuth } from "firebase/auth";
import React from "react";
import { Link, Outlet, redirect, useLoaderData } from "react-router-dom";
import headerIcon from "../assets/header-icon.webp";

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
    <div className='flex-1'>
      <header className='bg-white p-2 shadow-sm relative'>
        <Link to='/' className='flex items-center'>
          <img src={headerIcon} alt='' width='30px' className='mr-2' />
          <h2 className='text-xl font-semibold text-darkBlue'>
            Resume Builder
          </h2>
        </Link>
        <h3 className='hidden xs:block absolute right-2 top-2 text-lg font-medium text-mainYellow'>
          <span className='text-gray-500'>Welcome!</span> {displayName}
        </h3>
      </header>
      <Outlet />
    </div>
  );
}
