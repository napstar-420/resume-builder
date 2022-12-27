import React, { useState } from "react";
import { Link, Form, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import {AiOutlineLoading3Quarters} from 'react-icons/ai';
import { createUser, signUpWithGoogle, createUserDoc } from "../signup";
import {IoMdArrowBack} from 'react-icons/io'

export default function Signup() {
  const navigate = useNavigate();
  // useStates Hooks
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [accountCreated, setAccountCreated] = useState('');
  // Handle Submit
  async function handleSubmit(e) {
    setAccountCreated("in-process");
    e.preventDefault();
    if (password !== confPassword) {
      setAccountCreated('idle');
      return;
    } else {
      const result = await createUser(email, password, name);
      if (result !== "email-already-in-use" && result !== "error") {
        await createUserDoc(result, name, email, password);
        setAccountCreated("account-created");
        navigate("/edit");
      } else if (result === "email-already-in-use") {
        setAccountCreated(result);
      } else {
        setAccountCreated(result);
      }
    }
  }

  const handleGoogleSignUp = async () => {
    const result = await signUpWithGoogle();
    if (result) {
      setAccountCreated("in-process");
      await createUserDoc(result.uid, result.name, result.email, '');
      navigate("/edit");
    }
  };

  return (
    <div
      className='flex-1 grid place-items-center'
    >
      <div className='bg-white h-full sm:w-max sm:h-max sm:my-4 px-4 py-2 sm:px-20 sm:py-8 flex flex-col sm:rounded sm:shadow sm:shadow-gray-400 relative'>
        <h1 className='text-5xl font-semibold text-mainBlue text-center mt-4 xs:mt-0'>Sign up</h1>
        <h3 className='text-base font-medium text-gray-500 text-center'>
          To Resume Builder
        </h3>
        <Form onSubmit={(e) => handleSubmit(e)} className='my-4'>
          {accountCreated !== "in-process" ? (
            <>
              <label htmlFor='name' className='formLabel'>
                Name
              </label>
              <input
                type='text'
                id='name'
                name='name'
                className='form_control mb-2'
                placeholder='John Doe'
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <label htmlFor='email' className='formLabel'>
                Email
              </label>
              <p className='text-xs text-red-500'>
                {accountCreated === "email-already-in-use"
                  ? "Email already in use"
                  : ""}
              </p>
              <input
                type='email'
                id='email'
                name='email'
                className='form_control mb-2 invalid:outline-red-500 valid:outline-green-500'
                placeholder='johndoe@example.com'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label htmlFor='password' className='formLabel'>
                Password
              </label>
              <input
                type='password'
                id='password'
                name='password'
                className='form_control mb-2 invalid:outline-red-500 valid:outline-green-500'
                minLength='8'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label htmlFor='conf_password' className='formLabel'>
                Confirm Password
              </label>
              <p className='text-xs text-red-500'>
                {passwordsMatch ? "" : "Passwords do not match"}
              </p>
              <input
                type='password'
                id='conf_password'
                name='conf_password'
                className={`form_control mb-2 ${
                  passwordsMatch
                    ? "valid:outline-green-500"
                    : "invalid:outline-red-500 "
                }`}
                required
                minLength='8'
                value={confPassword}
                onChange={(e) => {
                  setConfPassword(e.target.value);
                  if (password === e.target.value) {
                    setPasswordsMatch(true);
                  } else {
                    setPasswordsMatch(false);
                  }
                }}
              />
              <button type='submit' className='submit-btn w-full'>
                Create account
              </button>
            </>
          ) : (
            <>
              <label htmlFor='name' className='formLabel'>
                Name
              </label>
              <input
                type='text'
                id='name'
                name='name'
                className='form_control mb-2'
                placeholder='John Doe'
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                disabled
              />
              <label htmlFor='email' className='formLabel'>
                Email
              </label>
              <p className='text-xs text-red-500'>
                {accountCreated === "email-already-in-use"
                  ? "Email already in use"
                  : ""}
              </p>
              <input
                type='email'
                id='email'
                name='email'
                className='form_control mb-2 invalid:outline-red-500 valid:outline-green-500'
                placeholder='johndoe@example.com'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled
              />
              <label htmlFor='password' className='formLabel'>
                Password
              </label>
              <input
                type='password'
                id='password'
                name='password'
                className='form_control mb-2 invalid:outline-red-500 valid:outline-green-500'
                minLength='8'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled
              />
              <label htmlFor='conf_password' className='formLabel'>
                Confirm Password
              </label>
              <p className='text-xs text-red-500'>
                {passwordsMatch ? "" : "Passwords do not match"}
              </p>
              <input
                type='password'
                id='conf_password'
                name='conf_password'
                className={`form_control mb-2 ${
                  passwordsMatch
                    ? "valid:outline-green-500"
                    : "invalid:outline-red-500 "
                }`}
                required
                disabled
                minLength='8'
                value={confPassword}
                onChange={(e) => {
                  setConfPassword(e.target.value);
                  if (password === e.target.value) {
                    setPasswordsMatch(true);
                  } else {
                    setPasswordsMatch(false);
                  }
                }}
              />
              <button type='submit' className='submit-btn w-full flex items-center justify-center'>
                Creating <AiOutlineLoading3Quarters className="ml-2 animate-spin"/>
              </button>
            </>
          )}
        </Form>
        <Link
          to='/login'
          className='text-xs underline self-end text-mainYellow'
        >
          Have an account? sign-in.
        </Link>
        <div className='flex w-full items-center my-2'>
          <div className='flex-1 h-1 bg-gray-300 rounded'></div>
          <div className='mx-2'>or</div>
          <div className='flex-1 h-1 bg-gray-300 rounded'></div>
        </div>
        <button
          onClick={handleGoogleSignUp}
          className='px-16 py-2 border-2 border-gray-600 hover:bg-gray-600 rounded text-lg font-semibold text-gray-600 hover:text-white transition-all flex items-center justify-center mb-4'
        >
          Sign up with Google <FcGoogle className='ml-2 text-xl' />
        </button>
        <Link to='/' className="absolute left-0 top-0 m-4 border-2 border-mainYellow text-mainYellow hover:bg-mainYellow hover:text-white rounded-full p-1 text-xl transition-all">
          <IoMdArrowBack />
        </Link>
        <p className='text-xs text-gray-400 '>
          Design and developed by Zohaib Khan
        </p>
      </div>
    </div>
  );
}
