import React from "react";
import { Outlet } from "react-router-dom";

export default function Edit() {
  return (
    <div className='flex-1 flex flex-col bg-gray-100'>
      <Outlet />
    </div>
  );
}
