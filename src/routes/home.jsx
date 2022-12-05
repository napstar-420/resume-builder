import React, {  useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { RiCloseCircleLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import heroImage from "../assets/hero_image.png";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

export default function Home() {
  
  const [showNav, setShowNav] = useState(false);
  const [authState, setAuthState] = useState({isSignedIn: false, user: null})
  
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
      setAuthState({...authState, isPending: true})
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
  }, [auth, authState]);

  return (
    <section>
      <header className='bg-mainBlue flex justify-between items-center px-2 md:px-4 py-2 h-14'>
        <h2 className='font-semibold text-2xl text-white'>
          Resume Builder
        </h2>
        <button
          className='border-2 border-white rounded p-1 text-white sm:hidden'
          onClick={() => setShowNav(!showNav)}
        >
          <GiHamburgerMenu />
        </button>
        <MobileNav showNav={showNav} setShowNav={setShowNav} />
        <PcNav authState={authState} logOutUser={logOutUser}/>
      </header>
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
    </section>
  );
}

function PcNav({authState, logOutUser}) {
  const {user} = authState;
  if(user) {
    return(
      <div className="flex items-center">
        <h3 className="font-semibold text-lg text-white mx-2">Welcome! {user.displayName}</h3>
        <button className="bg-mainYellow text-white font-medium rounded px-2" onClick={logOutUser}>Log out</button>
      </div>
    )
  } else {
    return (
      <nav className='hidden sm:block'>
        <div className='flex text-center items-center'>
          <Link
            to='login'
            className='border-btn border-transparent text-white text-lg py-0 hover:bg-white hover:bg-opacity-30'
          >
            Login
          </Link>
          <Link
            to='signup'
            className='normal-btn bg-white text-mainBlue border-white text-lg py-0 hover:bg-opacity-90 hover:border-opacity-70'
          >
            Sign up
          </Link>
        </div>
      </nav>
    );
  }
}

function MobileNav({ showNav, setShowNav }) {
  const backgroundStyle = {
    backgroundColor: "#ffffff",
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%2398bdbd' fill-opacity='0.43'%3E%3Cpath d='M0 38.59l2.83-2.83 1.41 1.41L1.41 40H0v-1.41zM0 1.4l2.83 2.83 1.41-1.41L1.41 0H0v1.41zM38.59 40l-2.83-2.83 1.41-1.41L40 38.59V40h-1.41zM40 1.41l-2.83 2.83-1.41-1.41L38.59 0H40v1.41zM20 18.6l2.83-2.83 1.41 1.41L21.41 20l2.83 2.83-1.41 1.41L20 21.41l-2.83 2.83-1.41-1.41L18.59 20l-2.83-2.83 1.41-1.41L20 18.59z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
  };
  return (
    <nav
      style={backgroundStyle}
      className={`absolute top-0 left-0 ${
        showNav ? "translate-x-0" : "-translate-x-full"
      } w-screen min-h-screen p-2 sm:hidden flex flex-col justify-between transition-all`}
    >
      <div className='flex justify-between'>
        <h3 className='text-2xl font-semibold text-darkBlue bg-white'>
          Resume builder
        </h3>
        <button
          className='text-4xl bg-white text-mainYellow'
          onClick={() => setShowNav(!showNav)}
        >
          <RiCloseCircleLine />
        </button>
      </div>
      <div className='flex flex-col text-center'>
        <Link to='login' className='border-btn'>
          Login
        </Link>
        <Link to='signup' className='normal-btn'>
          Sign up
        </Link>
      </div>
      <p className='text-xs text-center font-mono text-mainBlack'>
        Design and coded by Zohaib Khan
      </p>
    </nav>
  );
}
