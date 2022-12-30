import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { RiCloseCircleLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { VscSignOut } from "react-icons/vsc";
import { HiOutlineClipboardDocumentCheck } from "react-icons/hi2";
import { FaRegUserCircle } from "react-icons/fa";

export default function Header({ showNav, setShowNav, authState, logOutUser }) {
  return (
    <header className='h-11 md:h-14 px-4 shadow flex justify-between items-center bg-white'>
      <Link to='/' className='flex items-center'>
        <HiOutlineClipboardDocumentCheck className='mr-2 text-2xl text-blue-500' />
        <h2 className='text-xl font-medium text-[#505050]'>Resume Builder</h2>
      </Link>
      <button
        className='border-2 border-[#606060] rounded p-1 text-[#303030] md:hidden'
        onClick={() => setShowNav(!showNav)}
      >
        <GiHamburgerMenu />
      </button>
      <nav className='md:block hidden'>
        <Link to={"/"} className='mx-4 hover:underline'>
          Privacy Policy
        </Link>
        <a href="mailto:dev.zohaib.work@gmail.com" className='mx-4 hover:underline'>
          Contact me
        </a>
        <Link to={"/templates"} className='mx-4 hover:underline '>
          Templates
        </Link>
      </nav>
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

function PcNav({ authState, logOutUser }) {
  const { user } = authState;
  if (user) {
    return (
      <div className='hidden md:flex items-center'>
        <h3 className='hidden font-poppins text-[#888] xs:flex items-center hover:bg-[#eee] px-2 py-1 rounded-md'>
          <FaRegUserCircle className='text-[#555] mr-2 text-xl' />{" "}
          {user.displayName}
        </h3>
        <button
          className='text-darkBlue text-2xl mx-1 p-2 hover:bg-blue-200 rounded-full'
          title='logout'
          onClick={logOutUser}
        >
          <VscSignOut />
        </button>
      </div>
    );
  } else {
    return (
      <nav className='hidden md:block'>
        <div className='flex text-center items-center'>
          <Link
            to='login'
            className='border-btn border-transparent text-mainBlue text-lg py-0 hover:bg-blue-100 transition-all'
          >
            Login
          </Link>
          <Link
            to='signup'
            className='normal-btn bg-mainBlue transition-all text-white border-mainBlue text-lg py-0 active:bg-opacity-90 hover:border-opacity-60'
          >
            Sign up
          </Link>
        </div>
      </nav>
    );
  }
}

function MobileNav({ showNav, setShowNav, authState, logOutUser }) {
  const { isSignedIn, user } = authState;
  const backgroundStyle = {
    backgroundColor: "#ffffff",
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%2398bdbd' fill-opacity='0.43'%3E%3Cpath d='M0 38.59l2.83-2.83 1.41 1.41L1.41 40H0v-1.41zM0 1.4l2.83 2.83 1.41-1.41L1.41 0H0v1.41zM38.59 40l-2.83-2.83 1.41-1.41L40 38.59V40h-1.41zM40 1.41l-2.83 2.83-1.41-1.41L38.59 0H40v1.41zM20 18.6l2.83-2.83 1.41 1.41L21.41 20l2.83 2.83-1.41 1.41L20 21.41l-2.83 2.83-1.41-1.41L18.59 20l-2.83-2.83 1.41-1.41L20 18.59z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
  };
  return (
    <nav
      style={backgroundStyle}
      className={`z-50 absolute top-0 left-0 ${
        showNav ? "translate-x-0" : "-translate-x-full"
      } w-screen min-h-screen p-2 md:hidden flex flex-col justify-between transition-all`}
    >
      <div className='flex justify-between'>
        <h3 className='text-2xl font-medium text-mainBlue bg-white'>
          Resume builder
        </h3>
        <button
          className='text-4xl bg-white text-red-400'
          onClick={() => setShowNav(!showNav)}
        >
          <RiCloseCircleLine />
        </button>
      </div>
      {isSignedIn ? (
        <div className='flex flex-col text-center items-center'>
          <h2 className='text-3xl font-semibold font-poppins text-mainBlue'>
            Welcome! <br />
            {user.displayName}
          </h2>
          <button
            onClick={logOutUser}
            className='px-4 py-1 rounded mt-4 text-xl font-medium text-mainYellow border-2 border-mainYellow'
          >
            logout
          </button>
        </div>
      ) : (
        <div className='flex flex-col text-center'>
          <Link
            to='login'
            onClick={() => setShowNav(false)}
            className='border-btn'
          >
            Login
          </Link>
          <Link
            to='signup'
            onClick={() => setShowNav(false)}
            className='normal-btn'
          >
            Sign up
          </Link>
        </div>
      )}
      <nav className='flex flex-col items-center'>
        <Link to={"/"} className='my-1 underline'>
          Privacy Policy
        </Link>
        <Link to={"/"} className='my-1 underline'>
          About Us
        </Link>
        <Link to={"/"} className='my-1 underline '>
          Templates
        </Link>
      </nav>
      <p className='text-xs text-center font-mono text-mainBlack'>
        Design and coded by Zohaib Khan
      </p>
    </nav>
  );
}
