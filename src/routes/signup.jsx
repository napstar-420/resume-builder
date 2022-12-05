import React, { useState } from "react";
import { Link, Form, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { createUser } from "../signup";

export default function Signup() {
  const navigate = useNavigate();
  // Background Style
  const backgroundStyle = {
    backgroundColor: "#0099ff",
    backgroundImage: `url("data:image/svg+xml,%3Csvg width='42' height='44' viewBox='0 0 42 44' xmlns='http://www.w3.org/2000/svg'%3E%3Cg id='Page-1' fill='none' fill-rule='evenodd'%3E%3Cg id='brick-wall' fill='%23074368' fill-opacity='0.4'%3E%3Cpath d='M0 0h42v44H0V0zm1 1h40v20H1V1zM0 23h20v20H0V23zm22 0h20v20H22V23z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
  };
  // useStates Hooks
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [accountCreated, setAccountCreated] = useState({bool: null, status: ''});
  // Handle Submit
  async function handleSubmit (e) {
    e.preventDefault();
    if (password !== confPassword) {
      return;
    } else {
      const result = await createUser(email, password, name);
      if(result === 'account-created') {
        setAccountCreated({bool: true, status: result});
        console.log('working');
        navigate('/edit');
      } else if (result === 'email-already-in-use') {
        setAccountCreated({bool: false, status: result});
      } else {
        setAccountCreated({bool: true, status: 'somethings-wrong-happened'});
      }
    }
  };

  return (
    <div
      className='w-full flex-1 grid place-items-center'
      style={backgroundStyle}
    >
      <div className='bg-white w-full h-full sm:w-max sm:h-max sm:my-4 px-4 py-2 sm:py-8 sm:px-20 flex flex-col justify-center items-center sm:rounded sm:shadow-lg sm:shadow-gray-600 relative'>
        <h1 className='text-5xl font-semibold text-mainBlue'>Sign up</h1>
        <h3 className='text-base font-medium text-gray-500'>
          To Resume Builder
        </h3>
        <Form onSubmit={(e) => handleSubmit(e)} className='my-4'>
          <label htmlFor='name' className="formLabel">Name</label>
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
            {accountCreated.status === 'email-already-in-use' ? 'Email already in use' : ''}
          </p>
          <input
            type='email'
            id='email'
            name='email'
            className='form_control mb-2 invalid:outline-red-500 valid:outline-green-500'
            placeholder="johndoe@example.com"
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
            Create an Account
          </button>
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
        <button className='px-16 py-2 border-2 border-gray-600 rounded text-lg font-semibold text-gray-600 flex items-center justify-center mb-4'>
          Sign up with Google <FcGoogle className='ml-2 text-xl' />
        </button>
        <p className='text-xs text-gray-400 '>
          Design and developed by Zohaib Khan
        </p>
      </div>
    </div>
  );
}
