import React from "react";
import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";

export default function PersonalInfo() {
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
          <form className='edit_info_form'>
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
              />
            </div>
            <div>
              <label htmlFor='m_number' className='formLabel'>
                Mobile number <span className="astrk">*</span>
              </label>
              <input
                type='number'
                className='form_control'
                id='m_number'
                name='m_number'
                required
                placeholder='+923001234567'
              />
            </div>
            <div>
              <label htmlFor='s_number' className='formLabel'>Secondary number</label>
              <input
                type='number'
                className='form_control'
                id='s_number'
                name='s_number'
                placeholder='+923001234567'
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
              />
            </div>
            <button type='submit' className='submit-btn'>
              Save and continue
            </button>
            <button type='reset' className='reset-btn'>
              Reset
            </button>
          </form>
        </main>
      </article>
    </section>
  );
}