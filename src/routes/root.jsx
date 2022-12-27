import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from '../components/footer'
import Header from '../components/header'

export default function Root() {

  const [showNav, setShowNav] = useState(false);
  const [authState, setAuthState] = useState({isSignedIn: false, user: null});
  const navigate = useNavigate();
  const auth = getAuth();
  function logOutUser() {
    signOut(auth).then(() => {
      setAuthState({
        isSignedIn: false,
        user: null
      })
      navigate('/')
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  

  return (
    <div className='flex flex-col min-h-screen'>
      <Header showNav={showNav} setShowNav={setShowNav} authState={authState} logOutUser={logOutUser}/>
      <Outlet />
      <Footer />
    </div>
  )
}
