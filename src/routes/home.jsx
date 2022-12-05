import React from "react";
import { Link, useOutletContext } from "react-router-dom";
import heroImage from "../assets/hero_image.png";

export default function Home() {
  const [authState] = useOutletContext();
  return (
      <main style={{minHeight: 'calc(100vh - 3.5rem)', gridTemplateRows: '1fr auto auto auto 1fr'}} className='w-srceen px-2 md:px-4 py-1 flex flex-col justify-center items-center text-center md:text-left md:grid grid-cols-2 place-items-start'>
        <span></span>
        <h1 className='text-4xl sm:text-5xl lg:text-7xl font-semibold text-darkBlue md:self-end'>
            Free Online<br />
            Resume Builder
        </h1>
        <ul className='flex items-center text-mainYellow gap-1 my-1 md:mb-8'>
            <li className='sm:text-xl md:font-medium'>Free</li>
            <span className='sm:text-xl md:font-medium'>-</span>
            <li className='sm:text-xl md:font-medium'>Fast</li>
            <span className='sm:text-xl md:font-medium'>-</span>
            <li className='sm:text-xl md:font-medium'>Premium</li>
        </ul>
        <div className="hero_image_wrapper w-[250px] sm:w-[300px] lg:w-[400px] my-4 col-start-2 col-end-3 row-start-1 row-end-6 justify-self-center">
            <img src={heroImage} alt='resume vector art' className="w-full"/>
        </div>
        <div className="flex flex-wrap items-center justify-center md:self-start">
            <Link to='templates' className="border-btn md:ml-0">Templates</Link>
            <Link to={authState.isSignedIn ? 'edit' : 'signup'} className="normal-btn md:mr-0">Get Started</Link>
        </div>
        <span></span>
      </main>
  );
}


