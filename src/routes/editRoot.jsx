import React from "react";
import { Link } from "react-router-dom";
import {TiTick} from 'react-icons/ti';

export default function EditRoot() {
  return (
    <section className='px-2 md:px-4 flex-1 max-w-[1500px] mx-auto'>
      <h1 className='text-3xl sm:text-4xl lg:text-5xl 2xl:text-6xl text-center lg:text-left my-4 lg:my-8  font-semibold text-mainBlue'>
        Let's get started by adding your resume content.
      </h1>
      <article className="my-8 grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* PERSONAL INFO LINK */}
        <Link to='personal_info' className='edit_link'>
          <span className="rounded-full mr-1 bg-gray-400 text-white">
            <TiTick />
          </span>
          <h2>1. &nbsp;Personal Info</h2>
          <Link to='personal_info' className="edit_link_btn">Edit</Link>
          <p>
          At a minimum, your contact information section should include your name, phone number and email address. Depending on the type of job you’re applying for, you might also include a link to an online portfolio or professional website.
          </p>
        </Link>
        {/* WORK LINK */}
        <Link to='work_history' className='edit_link'>
          <span className="rounded-full mr-1 bg-gray-400 text-white">
            <TiTick />
          </span>
          <h2>2. &nbsp;Work History</h2>
          <Link to='work_history' className="edit_link_btn">Edit</Link>
          <p>
          Also called your “experience” or “professional history” section, this is an opportunity to showcase the value you’ve brought to former employers. Here, you should list all of your most relevant work experiences, beginning with your most recent job.
          </p>
        </Link>
        {/* EDUCATION LINK */}
        <Link to='education' className='edit_link'>
          <span className="rounded-full mr-1 bg-gray-400 text-white">
            <TiTick />
          </span>
          <h2>3. &nbsp;Education</h2>
          <Link to='education' className="edit_link_btn">Edit</Link>
          <p>
          The resume education section is helpful for employers who require a certain degree, certificate or level of experience. You should include your most recent and relevant education based on your level of experience.
          </p>
        </Link>
        {/* SKILLS LINK */}
        <Link to='skills' className='edit_link'>
          <span className="rounded-full mr-1 bg-gray-400 text-white">
            <TiTick />
          </span>
          <h2>4. &nbsp;Skills</h2>
          <Link to='skills' className="edit_link_btn">Edit</Link>
          <p>
          Your skills section should include relevant technical or hard skills and soft skills. You can include any tools you’ve mastered or certifications you’ve obtained as well.
          </p>
        </Link>
        {/* SUMMARY LINK */}
        <Link to='summary' className='edit_link'>
          <span className="rounded-full mr-1 bg-gray-400 text-white">
            <TiTick />
          </span>
          <h2>5. &nbsp;Summary</h2>
          <Link to='summary' className="edit_link_btn">Edit</Link>
          <p>
          Your resume summary or objective should be a short, one to two sentence section that briefly explains who you are and why you’re qualified. Carefully review the job posting for clues on which of your technical and soft skills will be most important and relevant.
          </p>
        </Link>
        {/* EXTRAS LINK */}
        <Link to='extras' className='edit_link'>
          <span className="rounded-full mr-1 bg-gray-400 text-white">
            <TiTick />
          </span>
          <h2>6. &nbsp;Extras</h2>
          <Link to='extras' className="edit_link_btn">Edit</Link>
          <p>
          The last section to consider adding to your resume is a shortlist of any other relevant accomplishments or volunteer work. Only include those that are relevant or that may help create a better picture of who you are as an individual as related to the position you’re applying for.
          </p>
        </Link>
      </article>
    </section>
  );
}
