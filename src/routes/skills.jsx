import React from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";

export default function Skills() {
  return (
    <section className='info_container'>
      <article className='info_subContainer'>
        <nav className='container_nav'>
          <Link className='back_forward_link' to='/edit/education'>
            <IoIosArrowBack />
            <span>Back</span>
          </Link>
          <h1>Skills</h1>
          <Link className='back_forward_link' to='/edit/summary'>
            <span>Next</span>
            <IoIosArrowForward />
          </Link>
        </nav>
        <main>
          <p className='description_para'>
            Your skills section should include relevant technical or hard skills
            and soft skills. You can include any tools you’ve mastered or
            certifications you’ve obtained as well.
          </p>
          <form className='edit_info_form'>
            <div>
              <label htmlFor='skill' className='formLabel'>
                Add your skill
              </label>
              <input type="text" id="skill" name="skill" placeholder="Technical Support" className="form_control" />
            </div>
            <div>
                <label htmlFor="skill_level" className="formLabel">Select Skill Level</label>
              <select name="skill_level" id="skill_level" className="form_control bg-white">
                <option value="">--------</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="expert">Expert</option>
              </select>
            </div>
            <button type="submit" className="submit-btn sm:col-start-1 sm:col-end-3">Save</button>
          </form>
        </main>
      </article>
      <div className='added_info_container'>
        <p className='text-center text-xl font-semibold text-gray-600 place-self-center'>
          No Skill added
        </p>
      </div>
    </section>
  );
}
