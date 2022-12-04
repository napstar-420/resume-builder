import React from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";

export default function Summary() {
  return (
    <section className='info_container'>
      <article className='info_subContainer'>
        <nav className='container_nav'>
          <Link className='back_forward_link' to='/edit/skills'>
            <IoIosArrowBack />
            <span>Back</span>
          </Link>
          <h1>Summary</h1>
          <Link className='back_forward_link' to='/edit/extras'>
            <span>Next</span>
            <IoIosArrowForward />
          </Link>
        </nav>
        <main>
          <p className='description_para'>
            Your resume summary or objective should be a short, one to two
            sentence section that briefly explains who you are and why you’re
            qualified. Carefully review the job posting for clues on which of
            your technical and soft skills will be most important and relevant.
          </p>
          <form className='edit_info_form'>
            <div className="sm:col-start-1 sm:col-end-3">
              <label htmlFor='summary' className='formLabel'>
                Briefly tell us about your background
              </label>
              <textarea name="summary" id="summary" cols="30" rows="5" className="form_control resize-none"></textarea>
            </div>
            <button type="reset" className="reset-btn">Reset</button>
            <button type="submit" className="submit-btn">Save and Continue</button>
          </form>
        </main>
      </article>
    </section>
  );
}
