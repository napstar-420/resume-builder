import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { RiCloseCircleLine } from "react-icons/ri";
import { Link } from "react-router-dom";

export default function Header({showNav, setShowNav, authState, logOutUser}) {
  return (
    <header className='bg-mainBlue flex justify-between items-center px-2 md:px-4 py-2 h-14'>
      <h2 className='font-semibold text-2xl text-white'>Resume Builder</h2>
      <button
        className='border-2 border-white rounded p-1 text-white sm:hidden'
        onClick={() => setShowNav(!showNav)}
      >
      <GiHamburgerMenu />
      </button>
      <MobileNav
        showNav={showNav}
        setShowNav={setShowNav}
        authState={authState}
        logOutUser={logOutUser}
      />
      <PcNav authState={authState} logOutUser={logOutUser} />
    </header>
  );
}

function PcNav({authState, logOutUser}) {
    const {user} = authState;
    if(user) {
      return(
        <div className="hidden sm:flex items-center">
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
  
  function MobileNav({ showNav, setShowNav, authState, logOutUser }) {
    const {isSignedIn, user} = authState;
    const backgroundStyle = {
      backgroundColor: "#ffffff",
      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%2398bdbd' fill-opacity='0.43'%3E%3Cpath d='M0 38.59l2.83-2.83 1.41 1.41L1.41 40H0v-1.41zM0 1.4l2.83 2.83 1.41-1.41L1.41 0H0v1.41zM38.59 40l-2.83-2.83 1.41-1.41L40 38.59V40h-1.41zM40 1.41l-2.83 2.83-1.41-1.41L38.59 0H40v1.41zM20 18.6l2.83-2.83 1.41 1.41L21.41 20l2.83 2.83-1.41 1.41L20 21.41l-2.83 2.83-1.41-1.41L18.59 20l-2.83-2.83 1.41-1.41L20 18.59z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
    };
    return (
      <nav
        style={backgroundStyle}
        className={`z-50 absolute top-0 left-0 ${
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
          {
            isSignedIn ? (
                <div className='flex flex-col text-center items-center'>
                  <h2 className="text-3xl font-semibold text-mainBlue">
                    Welcome! <br />
                    {user.displayName}
                  </h2>
                  <button onClick={logOutUser} className="px-6 py-1 rounded mt-4 text-lg font-medium text-mainYellow border-4 border-mainYellow">
                    logout
                  </button>
                </div>
              ) : (
                <div className='flex flex-col text-center'>
                  <Link to='login' onClick={() => setShowNav(false)} className='border-btn'>
                    Login
                  </Link>
                  <Link to='signup' onClick={() => setShowNav(false)} className='normal-btn'>
                    Sign up
                  </Link>
                </div>
              )
          }
        <p className='text-xs text-center font-mono text-mainBlack'>
          Design and coded by Zohaib Khan
        </p>
      </nav>
    );
  }