import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './header'
import Footer from './footer'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';

export default function Root() {
  const [showNav, setShowNav] = useState(false);
  const [authState, setAuthState] = useState({isSignedIn: false, user: null});
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
  return (
    <div className='flex flex-col min-h-screen bg-gray-100'>
      <Header 
        showNav={showNav} 
        setShowNav={setShowNav} 
        authState={authState} 
        logOutUser={logOutUser}
      />
      <Outlet context={[authState]}/>
      <Footer />
    </div>
  )
}
