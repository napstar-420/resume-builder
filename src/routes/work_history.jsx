import React from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { Link } from 'react-router-dom';

export default function WorkHistory() {
  return (
    <section className='info_container'>
        <article className='info_subContainer'>
            <nav className="container_nav">
                <Link className='back_forward_link' to='/edit/personal_info'>
                    <IoIosArrowBack />
                    <span>Back</span>
                </Link>
                <h1>Work History</h1>
                <Link className='back_forward_link' to='/edit/education'>
                    <span>Next</span>
                    <IoIosArrowForward />
                </Link>
            </nav>
            <main className=''>
                <p className="description_para">
                Also called your “experience” or “professional history” section, this is an opportunity to showcase the value you’ve brought to former employers. Here, you should list all of your most relevant work experiences, beginning with your most recent job.
                </p>
                <form className='edit_info_form'>
                    <p>Required feilds are marked with <span className="astrk">*</span></p>
                    <div>
                        <label htmlFor="job_title" className="formLabel">Job Title</label>
                        <input type="text" id='job_title' name='job_title' placeholder='Retails sale associate' className="form_control" />
                    </div>
                    <div>
                        <label htmlFor="employer" className="formLabel">Employer</label>
                        <input type="text" id='employer' name='employer' placeholder='Dermalogica' className="form_control" />
                    </div>
                    <div>
                        <label htmlFor="city" className="formLabel">City / Municipality</label>
                        <input type="text" id="city" name='city' className="form_control" placeholder='lahore' />
                    </div>
                    <div>
                        <label htmlFor="country" className="formLabel">Country</label>
                        <input type="text" id="country" name='country' placeholder='Pakistan' className="form_control" />
                    </div>
                    <div>
                        <label htmlFor="job_start_date" className="formLabel">Start Date</label>
                        <input type="month" id="job_start_date" name='job_start_date' className="form_control" />
                    </div>
                    <div>
                        <label htmlFor="job_end_date" className="formLabel">End Date</label>
                        <input type="month" id="job_end_date" name='job_end_date' className="form_control" />
                    </div>
                    <div className='flex items-center sm:col-start-1 sm:col-end-3 justify-self-end'>
                        <input type="checkbox" name="current_work" id="current_work" className='mr-2'/>
                        <label htmlFor='current_work' className='formLabel text-gray-500 text-sm'>I am currently working here.</label>
                    </div>
                    <button type="reset" className='reset-btn'>Reset</button>
                    <button type="submit" className='submit-btn'>Save</button>
                </form>
            </main>
        </article>
        <div className='added_info_container'>
            <p className='text-center text-xl font-semibold text-gray-600 place-self-center'>No work added</p>
        </div>
    </section>
  )
}
