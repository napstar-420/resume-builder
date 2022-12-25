import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import React, { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigation } from "react-router-dom";
import heroImage from "../assets/hero_image.png";
import Header from "../components/header";

export default function Home() {
  const [showNav, setShowNav] = useState(false);
  const [authState, setAuthState] = useState({isSignedIn: false, user: null});
  const navigation = useNavigation();
  const auth = getAuth();
  function logOutUser() {
    signOut(auth).then(() => {
      setAuthState({
        isSignedIn: false,
        user: null
      })
    }).catch((error) => {
      console.log(error);
    })
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthState({
          isSignedIn: true,
          user,
        })
      } else {
        setAuthState({
          isSignedIn: false,
          user,
        })
      }
    });
  }, [])

  return (
    <>
      <Header 
        showNav={showNav} 
        setShowNav={setShowNav} 
        authState={authState} 
        logOutUser={logOutUser}
       />
      <main style={{minHeight: 'calc(100vh - 4rem)', gridTemplateRows: '1fr auto auto auto 1fr'}} className='px-2 md:px-4 lg:px-8 py-1 flex flex-col justify-center items-center text-center md:text-left md:grid grid-cols-2 place-items-start'>
        <span></span>
        <h1 className='text-4xl sm:text-5xl xl:text-7xl font-semibold font-poppins text-mainBlue md:self-end'>
            Free Online<br />
            Resume Builder
        </h1>
        <ul className='my-1 md:mb-8 md:mt-2'>
            <li className="text-[#404040] text-xs sm:text-sm xl:text-base">Create your resume easily with our<br /> free builder and professional templates.</li>
        </ul>
        <div className="hero_image_wrapper w-[250px] sm:w-[300px] xl:w-[400px] my-4 col-start-2 col-end-3 row-start-1 row-end-6 justify-self-center">
            <img src={heroImage} alt='resume vector art' className="w-full"/>
        </div>
        <div className="flex flex-wrap items-center justify-center md:self-start">
            <Link to='templates' className="border-btn md:ml-0 font-poppins  text-mainYellow border-mainYellow hover:bg-yellow-100">Templates</Link>
            <Link to={authState.isSignedIn ? 'edit' : 'signup'} className="normal-btn font-poppins md:mr-0 bg-mainYellow border-mainYellow hover:bg-yellow-600 hover:border-mainYellow">Get Started</Link>
        </div>
        <span></span>
      </main>
      <div className={navigation.state === 'loading' ? 'animation-wrapper' : 'hidden'}>
        <div className='cube'>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </>
  );
}


