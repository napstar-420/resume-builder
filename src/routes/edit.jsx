import React from "react";
import { Outlet, Link } from "react-router-dom";

export default function Edit() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Outlet />
    </div>
  );
}