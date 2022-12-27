import jsPDF from "jspdf";
import React, { useEffect } from "react";
import { useRef } from "react";
import { BsDownload, BsPencilFill } from "react-icons/bs";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { formatDate } from "../../App";

export default function Modern() {
  const userDoc = useOutletContext();
  const { personalInfo, workHistory, education, skills, summary, extras } =
    userDoc;

  const navigate = useNavigate();

  function handleDownload() {
    navigate("/templates/download/modern");
  }

  return (
    <div className='bg-gray-300 p-2 min-h-[calc(100vh-7rem)] grid place-items-center sm:grid-cols-[1fr_auto_auto_1fr]'>
      <div></div>
      <div className='mx-auto bg-white w-full xs:w-[450px] grid grid-cols-[1fr_2fr]'>
        <div className='bg-blue-600'>
          <h1 className='text-xl text-white font-railway font-semibold mx-2 mt-2'>
            {personalInfo.fname + " " + personalInfo.sname}
          </h1>
          <h2 className='text-sm font-light text-white mb-2 mx-2'>
            {summary.title}
          </h2>
          <h3 className='bg-blue-800 p-2 flex items-center text-xs text-white font-poppins tracking-wider leading-none'>
            Personal Info
          </h3>
          <div className='px-2 py-1'>
            <h4 className='text-xs mb-1 font-medium text-white font-railway'>
              Address
            </h4>
            <p className='text-white text-[0.5rem] font-poppins font-light mb-1'>
              {personalInfo.address}
            </p>
            <h4 className='text-xs mb-1 font-medium text-white font-railway'>
              Phone
            </h4>
            <h5 className='text-white font-poppins font-light text-[0.5rem] mb-1'>
              {personalInfo.mNumber}
            </h5>
            <h5 className='text-white font-poppins font-light text-[0.5rem] mb-1'>
              {personalInfo.sNumber}
            </h5>
            <h4 className='text-xs mb-1 font-medium text-white font-railway'>
              Email
            </h4>
            <h5 className='text-white font-poppins font-light text-[0.5rem] mb-1'>
              {personalInfo.email}
            </h5>
          </div>
          <h3 className='bg-blue-800 p-2 flex items-center text-xs text-white font-poppins tracking-wider leading-none'>
            Skills
          </h3>
          <div className='px-2 py-1'>
            {Object.keys(skills).map((key, index) => {
              const skill = skills[key];
              return (
                <h5
                  key={index}
                  className='text-[0.5rem] text-white font-poppins capitalize'
                >
                  {skill.name}
                </h5>
              );
            })}
          </div>
          {Object.keys(extras).map((key) => {
            const extra = extras[key];
            return (
              <>
                <h3 className='capitalize bg-blue-800 p-2 flex items-center text-xs text-white font-poppins tracking-wider leading-none'>
                  {extra.heading}
                </h3>
                <div className='px-2 py-1'>
                  {extra.items.map((item, index) => (
                    <h5
                      key={index}
                      className='text-[0.5rem] text-white font-poppins capitalize'
                    >
                      {item}
                    </h5>
                  ))}
                </div>
              </>
            );
          })}
        </div>
        <div className='px-2 py-1'>
          <p className='font-poppins text-[0.5rem] mb-1'>{summary.summary}</p>
          <h2 className='leading-[0] py-[10px] border-t-[1px] border-b-[1px] border-t-gray-400 border-b-gray-400 text-sm font-bold text-darkBlue'>
            Experience
          </h2>
          <div>
            {Object.keys(workHistory).map((key, index) => {
              const work = workHistory[key];
              return (
                <div
                  key={index}
                  className='grid grid-cols-[1fr_3fr] gap-2 my-2'
                >
                  <div>
                    <h4 className='text-[0.5rem] text-gray-600'>
                      {formatDate(work.startDate)} -{" "}
                      {work.currentWork ? "present" : formatDate(work.endDate)}
                    </h4>
                  </div>
                  <div>
                    <h3 className='font-medium text-[0.5rem] font-poppins'>
                      {work.jobTitle}
                    </h3>
                    <h5 className='italic text-[0.5rem] text-gray-600'>
                      {work.employer}
                    </h5>
                    <p className='text-[0.35rem] font-poppins my-1'>
                      {work.workExp}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          <h2 className='mt-2 leading-[0] py-[10px] border-t-[1px] border-b-[1px] border-t-gray-400 border-b-gray-400 text-sm font-bold text-darkBlue'>
            Education
          </h2>
          <div>
            {Object.keys(education).map((key, index) => {
              const edu = education[key];
              return (
                <div
                  key={index}
                  className='grid grid-cols-[1fr_3fr] gap-2 my-2'
                >
                  <div>
                    <h4 className='text-[0.5rem] text-gray-600'>
                      {formatDate(edu.startDate)} -{" "}
                      {edu.currSchool ? "present" : formatDate(edu.endDate)}
                    </h4>
                  </div>
                  <div>
                    <h3 className='font-medium text-[0.5rem] font-poppins leading-none'>
                      {edu.degree}
                    </h3>
                    <h5 className='italic text-sm text-[0.5rem] text-gray-600'>
                      {edu.schoolName}
                    </h5>
                    <p className='text-[0.35rem] overflow-clip font-poppins'>
                      {edu.eduExp}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className='flex flex-col sm:ml-4 ml-0 w-full mt-2 sm:mt-0'>
        <Link
          to='/edit'
          className='px-4 py-2 bg-white text-mainBlue hover:bg-blue-50 transition font-poppins my-1 font-medium flex items-center justify-center w-full sm:w-max'
        >
          <BsPencilFill className='mr-1' /> Edit Details
        </Link>
        <button
          onClick={handleDownload}
          className='px-4 py-2 bg-green-500 hover:bg-green-600 transition text-white font-poppins my-1 font-medium flex items-center justify-center w-full sm:w-max'
        >
          <BsDownload className='mr-1' /> Download
        </button>
      </div>
      <div></div>
    </div>
  );
}

export function ModernPrint() {
  const userDoc = useOutletContext();
  const pdfRef = useRef(null);
  const { personalInfo, workHistory, education, skills, summary, extras } =
    userDoc;

  const navigate = useNavigate();

  async function download() {
    var doc = new jsPDF("p", "px", [1122.519685, 793.7007874]);
    const content = pdfRef.current;
    doc.html(content, {
      callback: (doc) => {
        doc.deletePage(2);
        doc.save("resume.pdf");
      },
    });
  }

  useEffect(() => {
    download();
    setTimeout(() => {
        navigate("/templates/modern");
    }, 3000)
  }, []);

  return (
    <div className='bg-gray-300 min-h-[calc(100vh-7rem)] p-4'>
      <div
        ref={pdfRef}
        className='mx-auto bg-white w-[794px] h-[1200px] grid grid-cols-[1fr_2fr]'
      >
        <div className='bg-blue-600'>
          <h1 className='text-4xl text-white font-railway font-medium mx-4 mt-6'>
            {personalInfo.fname + " " + personalInfo.sname}
          </h1>
          <h2 className='text-2xl font-light text-white mb-6 mx-4'>
            {summary.title}
          </h2>
          <h3 className='bg-blue-800 px-4 pb-5 flex items-center text-xl text-white font-bold font-poppins leading-none'>
            Personal Info
          </h3>
          <div className='p-[0_1rem_1rem_1rem]'>
            <h4 className='text-xl mb-1 font-semibold text-white font-railway'>
              Address
            </h4>
            <p className='text-white font-poppins font-light text-sm mb-2'>
              {personalInfo.address}
            </p>
            <h4 className='text-xl mb-1 font-semibold text-white font-railway'>
              Phone
            </h4>
            <h5 className='text-white font-poppins font-light text-sm mb-2'>
              {personalInfo.mNumber}
            </h5>
            <h5 className='text-white font-poppins font-light text-sm mb-2'>
              {personalInfo.sNumber}
            </h5>
            <h4 className='text-xl mb-1 font-semibold text-white font-railway'>
              Email
            </h4>
            <h5 className='text-white font-poppins font-light text-sm mb-2'>
              {personalInfo.email}
            </h5>
          </div>
          <h3 className='bg-blue-800 px-4 pb-5 flex items-center text-xl text-white font-bold font-poppins leading-none'>
            Skills
          </h3>
          <div className='p-[0_1rem_1rem_1rem]'>
            {Object.keys(skills).map((key, index) => {
              const skill = skills[key];
              return (
                <h5 key={index} className='text-white font-poppins capitalize'>
                  {skill.name}
                </h5>
              );
            })}
          </div>
          {Object.keys(extras).map((key) => {
            const extra = extras[key];
            return (
              <>
                <h3 className='bg-blue-800 px-4 pb-5 flex items-center text-xl text-white font-bold font-poppins leading-none capitalize'>
                  {extra.heading}
                </h3>
                <div className='p-[0_1rem_1rem_1rem]'>
                  {extra.items.map((item, index) => (
                    <h5
                      key={index}
                      className='text-white font-poppins capitalize'
                    >
                      {item}
                    </h5>
                  ))}
                </div>
              </>
            );
          })}
        </div>
        <div className='p-4'>
          <p className='font-poppins font-light leading-tight mb-8' style={{'wordSpacing': '0.1rem'}}>{summary.summary}</p>
          <h2 className='leading-[0] h-10 pt-[6px] border-t-[1px] border-b-[1px] border-t-gray-400 border-b-gray-400 text-2xl font-bold text-darkBlue'>
            Experience
          </h2>
          <div>
            {Object.keys(workHistory).map((key, index) => {
              const work = workHistory[key];
              return (
                <div key={index} className='grid grid-cols-[1fr_3fr]'>
                  <div>
                    <h4 className='text-sm text-gray-600'>
                      {formatDate(work.startDate)} -{" "}
                      {work.currentWork ? "present" : formatDate(work.endDate)}
                    </h4>
                  </div>
                  <div>
                    <h3 className='font-medium font-poppins'>
                      {work.jobTitle}
                    </h3>
                    <h5 className='italic text-sm text-gray-600'>
                      {work.employer}
                    </h5>
                    <p className='text-xs font-poppins my-1'>{work.workExp}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <h2 className='mt-2 leading-[0] h-10 pt-[6px] border-t-[1px] border-b-[1px] border-t-gray-400 border-b-gray-400 text-2xl font-bold text-darkBlue'>
            Education
          </h2>
          <div>
            {Object.keys(education).map((key, index) => {
              const edu = education[key];
              return (
                <div
                  key={index}
                  className='grid grid-cols-[1fr_3fr] gap-2 my-4'
                >
                  <div>
                    <h4 className='text-sm text-gray-600'>
                      {formatDate(edu.startDate)} -{" "}
                      {edu.currSchool ? "present" : formatDate(edu.endDate)}
                    </h4>
                  </div>
                  <div>
                    <h3 className='font-medium font-poppins leading-none mb-1'>
                      {edu.degree}
                    </h3>
                    <h5 className='italic text-sm text-gray-600'>
                      {edu.schoolName}
                    </h5>
                    <p className='text-xs max-h-16 overflow-clip font-poppins'>
                      {edu.eduExp}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
