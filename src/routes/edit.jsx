import React from "react";
import { Outlet, Link } from "react-router-dom";

export default function Edit() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header
        className='w-screen bg-white py-2 px-3 md:px-4 2xl:px-6 2xl:py-2'
        style={{ boxShadow: "0 5px 5px #ccc" }}
      >
        <h2 className='text-lg sm:text-xl 2xl:text-3xl font-semibold text-darkBlue'>
          <Link to='/'>Resume Builder</Link>
        </h2>
      </header>
      <Outlet />
      <footer className='p-2 bg-mainBlack'>
        <p className="text-xs text-white text-center">Developed by Zohaib Khan</p>
      </footer>
    </div>
  );
}