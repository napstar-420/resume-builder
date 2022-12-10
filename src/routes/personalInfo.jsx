import { getAuth } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import React from "react";
import { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { Link, useLoaderData, Form, redirect } from "react-router-dom";
import { db } from "../firebaseConfig";

export async function loader() {
  const auth = getAuth();
  const user = auth.currentUser;
  const ref = doc(db, 'users', user.displayName + user.uid, 'data', 'personal_info');
  const dataSnap = await getDoc(ref);
  return dataSnap.data();
}

export async function action({request}) {
  const auth = getAuth();
  const user = auth.currentUser;
  const ref = doc(db, 'users', user.displayName + user.uid, 'data', 'personal_info');
  const formData = await request.formData();
  const updates = Object.fromEntries(formData)
  await setDoc(ref, updates);
  return redirect(`/edit/work_history`);
}

export default function PersonalInfo() {
  const data = useLoaderData();
  const [fname, setFname] = useState(data.fname);
  const [sname, setSname] = useState(data.sname);
  const [email, setEmail] = useState(data.email);
  const [mNumber, setMNumber] = useState(data.mNumber);
  const [sNumber, setSNumber] = useState(data.sNumber);
  const [address, setAddress] = useState(data.address);

  return (
    <section className='info_container grid-rows-1'>
      <article className='info_subContainer'>
        <nav className='container_nav'>
          <h1>Personal Information</h1>
          <Link className='back_forward_link' to='/edit/work_history'>
            <span>Next</span>
            <IoIosArrowForward />
          </Link>
        </nav>
        <main>
          <p className="description_para">
          At a minimum, your contact information section should include your name, phone number and email address. Depending on the type of job you’re applying for, you might also include a link to an online portfolio or professional website.
          </p>
          <Form method="post" className='edit_info_form'>
            <p>Required feilds are marked with <span className="astrk">*</span></p>
            <div>
              <label htmlFor='fname' className='formLabel'>
                First name <span className="astrk">*</span>
              </label>
              <input
                type='text'
                className='form_control'
                id='fname'
                name='fname'
                required
                placeholder='Ali'
                value={fname}
                onChange={(e) => setFname(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor='sname' className='formLabel'>
                Surname <span className="astrk">*</span>
              </label>
              <input
                type='text'
                className='form_control'
                id='sname'
                name='sname'
                required
                placeholder='Khan'
                value={sname}
                onChange={(e) => setSname(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor='email' className='formLabel'>
                Email <span className="astrk">*</span>
              </label>
              <input
                type='email'
                className='form_control'
                id='email'
                name='email'
                required
                placeholder='khanali@service.pk'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor='m_number' className='formLabel'>
                Mobile number <span className="astrk">*</span>
              </label>
              <input
                type='number'
                className='form_control'
                id='mNumber'
                name='mNumber'
                required
                placeholder='+923001234567'
                value={mNumber}
                onChange={(e) => setMNumber(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor='s_number' className='formLabel'>Secondary number</label>
              <input
                type='number'
                className='form_control'
                id='sNumber'
                name='sNumber'
                placeholder='+923001234567'
                value={sNumber}
                onChange={(e) => setSNumber(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor='address' className='formLabel'>Address</label>
              <input
                type='text'
                className='form_control'
                id='address'
                name='address'
                placeholder='H #67, St #22, Liberty, Lahore, PK'
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <button type='submit' className='submit-btn'>
              Save and continue
            </button>
            <button type='reset' className='reset-btn'>
              Reset
            </button>
          </Form>
        </main>
      </article>
    </section>
  );
}