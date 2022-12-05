import React, {useState} from "react";
import { Form, Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { loginUser } from "../login";
import { signUpWithGoogle } from "../signup";

export default function Login() {
  const backgroundStyle = {
    backgroundColor: "#0099ff",
    backgroundImage: `url("data:image/svg+xml,%3Csvg width='42' height='44' viewBox='0 0 42 44' xmlns='http://www.w3.org/2000/svg'%3E%3Cg id='Page-1' fill='none' fill-rule='evenodd'%3E%3Cg id='brick-wall' fill='%23074368' fill-opacity='0.4'%3E%3Cpath d='M0 0h42v44H0V0zm1 1h40v20H1V1zM0 23h20v20H0V23zm22 0h20v20H22V23z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
  };
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('')
  const handleSubmit = async (e) => {
    const result = await loginUser(email, password);
    if(result === 'logged-in') {
      navigate('/edit');
    } else if (result === 'auth/wrong-password') {
      setLoginError('wrong-password');
    } else if (result === 'auth/user-not-found') {
      setLoginError('user-not-found')
    }
  }
  const handleGoogleLogIn = async() => {
    const result = await signUpWithGoogle();
    if(result === 'logged-in') {
      navigate('/edit');
    }
  }
  return (
    <div
      className='w-screen flex-1 grid place-items-center'
      style={backgroundStyle}
    >
      <div className='bg-white w-full h-full sm:w-max sm:h-max px-4 py-2 sm:py-8 sm:px-20 flex flex-col justify-center items-center sm:rounded sm:shadow-lg sm:shadow-gray-600 relative'>
        <h1 className='text-5xl font-semibold text-mainBlue'>Login</h1>
        <h3 className='text-base font-medium text-gray-500'>
          To Resume Builder
        </h3>
        <Form onSubmit={handleSubmit} className='my-4'>
          <label htmlFor='email' className='formLabel'>
            Email
          </label>
          <p className='text-xs text-red-500'>
            {loginError === 'user-not-found' ? 'Sorry! this email does not have any account' : ''}
          </p>
          <input
            type='text'
            id='email'
            name='email'
            className='form_control mb-2'
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setLoginError('');
            }}
          />
          <label htmlFor='password' className='formLabel'>
            Password
          </label>
          <p className='text-xs text-red-500'>
            {loginError === 'wrong-password' ? 'wrong password' : ''}
          </p>
          <input
            type='password'
            id='password'
            name='password'
            className='form_control mb-2'
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
              setLoginError('');
            }}
          />
          <button type='submit' className='submit-btn w-full'>
            Login
          </button>
        </Form>
        <Link
          to='/signup'
          className='text-xs underline self-end text-mainYellow'
        >
          New user? create an account.
        </Link>
        <div className='flex w-full items-center my-2'>
          <div className='flex-1 h-1 bg-gray-300 rounded'></div>
          <div className='mx-2'>or</div>
          <div className='flex-1 h-1 bg-gray-300 rounded'></div>
        </div>
        <button onClick={handleGoogleLogIn} className='px-16 py-2 border-2 border-gray-600 rounded text-lg font-semibold text-gray-600 flex items-center justify-center mb-4'>
          Login with Google <FcGoogle className='ml-2 text-xl' />
        </button>
        <p className='text-xs text-gray-400 '>
          Design and developed by Zohaib Khan
        </p>
      </div>
    </div>
  );
}
