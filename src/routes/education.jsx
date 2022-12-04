import React from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";

export default function Education() {
  return (
    <section className='info_container'>
      <article className='info_subContainer'>
        <nav className='container_nav'>
          <Link className='back_forward_link' to='/edit/work_history'>
            <IoIosArrowBack />
            <span>Back</span>
          </Link>
          <h1>Education</h1>
          <Link className='back_forward_link' to='/edit/skills'>
            <span>Next</span>
            <IoIosArrowForward />
          </Link>
        </nav>
        <main>
          <p className='description_para'>
            The resume education section is helpful for employers who require a
            certain degree, certificate or level of experience. You should
            include your most recent and relevant education based on your level
            of experience.
          </p>
          <form className='edit_info_form'>
            <div>
              <label htmlFor='school_name' className='formLabel'>
                School name
              </label>
              <input
                type='text'
                id='school_name'
                name='school_name'
                placeholder='University of Punjab'
                className='form_control'
              />
            </div>
            <div>
              <label htmlFor='school_loc' className='formLabel'>
                School Location
              </label>
              <input
                type='text'
                id='school_loc'
                name='school_loc'
                placeholder='Canal RD, Lahore, PK'
                className='form_control'
              />
            </div>
            <div>
              <label htmlFor='degree' className='formLabel'>
                Degree
              </label>
              <input
                type='text'
                id='degree'
                name='degree'
                placeholder='Bachelor'
                className='form_control'
              />
            </div>
            <div>
              <label htmlFor='degree_field' className='formLabel'>
                Field of Study
              </label>
              <input
                type='text'
                id='degree_field'
                name='degree_field'
                placeholder='Computer Science'
                className='form_control'
              />
            </div>
            <div>
              <label htmlFor='grad_start_date' className='formLabel'>
                Graduation Start Date
              </label>
              <input
                type='month'
                id='grad_start_date'
                name='grad_start_date'
                className='form_control'
              />
            </div>
            <div>
              <label htmlFor='grad_end_date' className='formLabel'>
                Graduation End Date
              </label>
              <input
                type='month'
                id='grad_end_date'
                name='grad_end_date'
                className='form_control'
              />
            </div>
            <div className='flex items-center sm:col-start-1 sm:col-end-3 justify-self-end mb-4'>
              <input
                type='checkbox'
                name='current_school'
                id='current_school'
                className='mr-2'
              />
              <label
                htmlFor='current_school'
                className='formLabel text-gray-500 text-sm'
              >
                I am currently attending here.
              </label>
            </div>
            <button type='reset' className='reset-btn'>
              Clear All
            </button>
            <button type='submit' className='submit-btn'>
              Save
            </button>
          </form>
        </main>
      </article>
      <div className='added_info_container'>
        <p className='text-center text-xl font-semibold text-gray-600 place-self-center'>
          No Education added
        </p>
      </div>
    </section>
  );
}
