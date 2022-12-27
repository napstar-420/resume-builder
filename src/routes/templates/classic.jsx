import React from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { formatDate } from "../../App";
import jsPDF from "jspdf";
import { useRef } from "react";
import { useEffect } from "react";
import {BsPencilFill, BsDownload} from 'react-icons/bs'

export default function Classic() {
  const pdfRef = useRef(null)
  const navigate = useNavigate()
  const userDoc = useOutletContext();
  const { personalInfo, workHistory, education, skills, summary, extras } =
    userDoc;

  function handleDownload() {
    navigate('/templates/download/classic')
  }

  return (
    <div className='bg-gray-300 p-2 min-h-[calc(100vh-7rem)] grid place-items-center sm:grid-cols-[1fr_auto_auto_1fr]'>
      <div></div>
      <main
      ref={pdfRef}
        id='classic'
        className='bg-white w-full xs:w-[450px] origin-top-left py-2 px-4'
      >
        <h1 className='uppercase text-2xl leading-[0.5] font-semibold text-center font-railway tracking-widest mt-4'>
          {personalInfo.fname} {personalInfo.sname}
        </h1>
        <h2 className='uppercase text mt-2 tracking-wider font-medium text-[#666] text-center font-poppins mb-4'>
          {summary.title || "Frontend developer"}
        </h2>
        <article className='grid grid-cols-[1fr_2fr] gap-2'>
          <section>
            <div className='text-right pr-1 mb-4'>
              <h3 className='font-semibold text-xs text font-railway tracking-widest border-b-2 border-neutral-300 pb-[0.10rem] mb-2 uppercase'>
                CONTACT
              </h3>
              <div className='font-poppins text-[0.5rem]'>{personalInfo.email}</div>
              <div className='font-poppins text-[0.5rem]'>{personalInfo.mNumber}</div>
              <div className='font-poppins text-[0.5rem]'>{personalInfo.sNumber}</div>
            </div>
            <div className='text-right pr-1 mb-4'>
            <h3 className='font-semibold text-xs text font-railway tracking-widest border-b-2 border-neutral-300 pb-[0.10rem] mb-2 uppercase'>
                EDUCATION
              </h3>
              {Object.keys(education).map((key, index) => {
                const edu = education[key];
                return (
                  <div key={index} className='grid grid-cols-[1fr_auto] my-1 gap-x-[0.15rem]'>
                    <div className='font-poppins text-[0.5rem] font-medium'>{edu.degree},&nbsp;</div>
                    <div className='font-poppins text-gray-700 text-[0.5rem] italic'>
                      {edu.fieldOfStudy}
                    </div>
                    <div className='font-poppins text-[0.5rem] col-start-1 col-end-3'>{edu.schoolName}</div>
                  </div>
                );
              })}
            </div>
            <div className='text-right pr-1 mb-4'>
            <h3 className='font-semibold text-xs text font-railway tracking-widest border-b-2 border-neutral-300 pb-[0.10rem] mb-2 uppercase'>
                SKILLS
              </h3>
              {Object.keys(skills).map((key, index) => {
                return (
                  <div key={index} className='font-poppins capitalize text-[0.5rem]'>
                    {skills[key].name}
                  </div>
                );
              })}
            </div>
            {Object.keys(extras).map((key, Hindex) => {
              return (
                <div key={Hindex} className='text-right pr-1 mb-4'>
              <h3 className='font-semibold text-xs text font-railway tracking-widest border-b-2 border-neutral-300 pb-[0.10rem] mb-2 uppercase'>
                    {extras[key].heading}
                  </h3>
                  {extras[key].items.map((item, index) => (
                    <div key={index} className='font-poppins capitalize text-[0.5rem]'>
                      {item}
                    </div>
                  ))}
                </div>
              );
            })}
          </section>
          <section>
            <div className='pl-1 mb-4'>
            <h3 className='font-semibold text-xs text font-railway tracking-widest border-b-2 border-neutral-300 pb-[0.10rem] mb-2 uppercase'>
                {summary.title} - Summary
              </h3>
              <p className='font-poppins text-[0.5rem]'>{summary.summary}</p>
            </div>
            <div className='pl-1 mb-4'>
            <h3 className='font-semibold text-xs text font-railway tracking-widest border-b-2 border-neutral-300 pb-[0.10rem] mb-2 uppercase'>
                PROFESSIONAL EXPERIENCE
              </h3>
              {Object.keys(workHistory).map((key, index) => {
                const work = workHistory[key];
                return (
                  <div key={index} className='my-1'>
                    <h4 className='font-medium text-[0.5rem] font-poppins tracking-widest uppercase leading-none mb-[0.15rem]'>
                      {work.jobTitle}
                    </h4>
                    <h5 className='text-sm italic font-railway mb-2 text-[0.5rem] leading-none'>
                      {work.employer} / {formatDate(work.startDate)}
                      &nbsp;-&nbsp;
                      {work.currentWork ? "present" : formatDate(work.endDate)}
                    </h5>
                    <p className='font-poppins text-[0.5rem] mb-4'>{work.workExp}</p>
                  </div>
                );
              })}
            </div>
          </section>
        </article>
      </main>
      <div className="flex flex-col sm:ml-4 ml-0 w-full mt-2 sm:mt-0">
        <Link to='/edit' className="px-4 py-2 bg-white text-mainBlue hover:bg-blue-50 transition font-poppins my-1 font-medium flex items-center justify-center w-full sm:w-max"><BsPencilFill className="mr-1"/> Edit Details</Link>
        <button onClick={handleDownload} className="px-4 py-2 bg-green-500 hover:bg-green-600 transition text-white font-poppins my-1 font-medium flex items-center justify-center w-full sm:w-max"><BsDownload className="mr-1"/> Download</button>
      </div>
      <div></div>
    </div>
  );
}

export function ClassicPrint() {
  const userDoc = useOutletContext();
  const navigate = useNavigate();
  const pdfRef = useRef(null);
  const { personalInfo, workHistory, education, skills, summary, extras } =
    userDoc;

  window.title = 'DOWNLOADING PDF'
  
  async function download() {
    var doc = new jsPDF('p', 'px', [1122.519685, 793.7007874]);
    const content = pdfRef.current;
    doc.html(content, {
      callback: (doc) => {
        doc.deletePage(2)
        doc.save('resume.pdf');
      }
    })
  }

  useEffect(() => {
    download();
    navigate('/templates/classic')
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
  <main
        ref={pdfRef}
        id='classic-print'
        className='mx-auto bg-white w-[793.7007874px] h-[1122.519685px] p-4'
      >
        <h1 className='uppercase text-5xl font-medium text-center font-railway tracking-widest mt-8'>
          {personalInfo.fname} {personalInfo.sname}
        </h1>
        <h2 className='uppercase text-2xl mt-2 tracking-wider font-medium text-[#666] text-center font-poppins mb-8'>
          {summary.title || "Frontend developer"}
        </h2>
        <article className='grid grid-cols-[1fr_2fr] gap-4'>
          <section>
            <div className='text-right pr-4 mb-6'>
              <h3 className='font-semibold text-xl font-railway tracking-widest border-b-4 border-neutral-300 pb-3 my-2'>
                CONTACT
              </h3>
              <div className='font-poppins'>{personalInfo.email}</div>
              <div className='font-poppins'>{personalInfo.mNumber}</div>
              <div className='font-poppins'>{personalInfo.sNumber}</div>
            </div>
            <div className='text-right pr-4 mb-6'>
            <h3 className='font-semibold text-xl font-railway tracking-widest border-b-4 border-neutral-300 pb-3 my-2'>
                EDUCATION
              </h3>
              {Object.keys(education).map((key, index) => {
                const edu = education[key];
                return (
                  <div key={index}>
                    <span className='font-poppins'>{edu.degree} - </span>
                    <span className='font-poppins italic text-gray-700'>
                      {edu.fieldOfStudy}
                    </span>
                    <div className='font-poppins'>{edu.schoolName}</div>
                  </div>
                );
              })}
            </div>
            <div className='text-right pr-4 mb-6'>
            <h3 className='font-semibold text-xl font-railway tracking-widest border-b-4 border-neutral-300 pb-3 my-2'>
                SKILLS
              </h3>
              {Object.keys(skills).map((key, index) => {
                return (
                  <div key={index} className='font-poppins capitalize'>
                    {skills[key].name}
                  </div>
                );
              })}
            </div>
            {Object.keys(extras).map((key, Hindex) => {
              return (
                <div key={Hindex} className='text-right pr-4 mb-6'>
                  <h3 className='font-semibold text-xl font-railway tracking-widest border-b-4 border-neutral-300 pb-3 my-2 uppercase'>
                    {extras[key].heading}
                  </h3>
                  {extras[key].items.map((item, index) => (
                    <div key={index} className='font-poppins capitalize'>
                      {item}
                    </div>
                  ))}
                </div>
              );
            })}
          </section>
          <section>
            <div className='pl-4 mb-6'>
              <h3 className='font-semibold text-xl font-railway tracking-widest border-b-4 border-neutral-300 pb-3 my-2 uppercase'>
                {summary.title} - Summary
              </h3>
              <p className='font-poppins text-sm'>{summary.summary}</p>
            </div>
            <div className='pl-4 mb-6'>
              <h3 className='font-semibold text-xl font-railway tracking-widest border-b-4 border-neutral-300 pb-3 my-2'>
                PROFESSIONAL EXPERIENCE
              </h3>
              {Object.keys(workHistory).map((key, index) => {
                const work = workHistory[key];
                return (
                  <div key={index} className='my-2'>
                    <h4 className='font-medium font-poppins tracking-widest uppercase'>
                      {work.jobTitle}
                    </h4>
                    <h5 className='text-sm italic font-railway mb-2'>
                      {work.employer} / {formatDate(work.startDate)}
                      &nbsp;-&nbsp;
                      {work.currentWork ? "present" : formatDate(work.endDate)}
                    </h5>
                    <p className='font-poppins text-sm mb-4'>{work.workExp}</p>
                  </div>
                );
              })}
            </div>
          </section>
        </article>
      </main>
  )
}
