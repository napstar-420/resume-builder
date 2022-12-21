import { getAuth } from "firebase/auth";
import { deleteField, doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { useEffect } from "react";
import {
  Form,
  redirect,
  useLoaderData,
  useNavigate,
  useNavigation,
  useOutletContext,
} from "react-router-dom";
import { db } from "../../firebaseConfig";

export async function action({ request, params }) {
  const auth = getAuth();
  const user = auth.currentUser;
  const ref = doc(
    db,
    "users",
    user.displayName + user.uid,
    "data",
    "education"
  );
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  await updateDoc(ref, {
    [params.index]: updates,
  });
  return redirect(`/edit/education/`);
}

export default function EducationForm() {
  
  const { dataSnap, index } = useLoaderData();
  const [updateEducation] = useOutletContext();
  const navigate = useNavigate();
  const navigation = useNavigation();

  const [data, setData] = useState(dataSnap[index]);
  const [schoolName, setSchoolName] = useState(data.schoolName);
  const [schoolLocation, setSchoolLocation] = useState(data.schoolLocation);
  const [degree, setDegree] = useState(data.degree);
  const [fieldOfStudy, setFieldOfStudy] = useState(data.fieldOfStudy);
  const [startDate, setStartDate] = useState(data.startDate);
  const [endDate, setEndDate] = useState(data.endDate);
  const [currSchool, setCurrSchool] = useState(data.currSchool);
  const [eduExp, setEduExp] = useState(data.eduExp);

  useEffect(() => {
    setData(dataSnap[index]);
    setSchoolName(data.schoolName);
    setSchoolLocation(data.schoolLocation);
    setDegree(data.degree);
    setFieldOfStudy(data.fieldOfStudy);
    setStartDate(data.startDate);
    setEndDate(data.endDate);
    setCurrSchool(data.currSchool);
    setEduExp(data.eduExp);
  }, [
    dataSnap,
    data.schoolName,
    data.schoolLocation,
    data.degree,
    data.fieldOfStudy,
    data.startDate,
    data.endDate,
    data.currSchool,
    data.eduExp,
    index
  ]);

  async function handleSave() {
    await updateEducation();
  }

  async function handleDelete() {
    const auth = getAuth();
    const user = auth.currentUser;
    const ref = doc(
      db,
      "users",
      user.displayName + user.uid,
      "data",
      "education"
    );
    await updateDoc(ref, {
      [index]: deleteField()
    })
    await updateEducation();
    navigate('/edit/education');
  }

  return (
    <Form method='post' className='edit_info_form' onSubmit={handleSave}>
      <p>
        Required feilds are marked with <span className='astrk'>*</span>
      </p>
      <div>
        <label htmlFor='schoolName' className='formLabel'>
          School name <span className='astrk'>*</span>
        </label>
        <input
          type='text'
          id='schoolName'
          name='schoolName'
          placeholder='University of Punjab'
          className='form_control'
          value={schoolName}
          onChange={(e) => setSchoolName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor='schoolLocation' className='formLabel'>
          School Location <span className='astrk'>*</span>
        </label>
        <input
          type='text'
          id='schoolLocation'
          name='schoolLocation'
          placeholder='Canal RD, Lahore, PK'
          className='form_control'
          value={schoolLocation}
          onChange={(e) => setSchoolLocation(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor='degree' className='formLabel'>
          Degree <span className='astrk'>*</span>
        </label>
        <input
          type='text'
          id='degree'
          name='degree'
          placeholder='Bachelor'
          className='form_control'
          value={degree}
          onChange={(e) => setDegree(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor='fieldOfStudy' className='formLabel'>
          Field of Study <span className='astrk'>*</span>
        </label>
        <input
          type='text'
          id='fieldOfStudy'
          name='fieldOfStudy'
          placeholder='Computer Science'
          className='form_control'
          value={fieldOfStudy}
          onChange={(e) => setFieldOfStudy(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor='startDate' className='formLabel'>
          Graduation Start Date <span className='astrk'>*</span>
        </label>
        <input
          type='month'
          id='startDate'
          name='startDate'
          className='form_control'
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </div>
      {currSchool !== "on" ? (
        <>
          <div>
            <label htmlFor='endDate' className='formLabel'>
              Graduation End Date <span className='astrk'>*</span>
            </label>
            <input
              type='month'
              id='endDate'
              name='endDate'
              className='form_control'
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
          <div className='flex items-center sm:col-start-1 sm:col-end-3 justify-self-end mb-4'>
            <input
              type='checkbox'
              name='currSchool'
              id='currSchool'
              className='mr-2'
              onChange={(e) => {
                if (e.target.checked) {
                  setCurrSchool("on");
                } else {
                  setCurrSchool("off");
                }
              }}
            />
            <label
              htmlFor='currSchool'
              className='formLabel text-gray-500 text-sm'
            >
              I am currently attending here.
            </label>
          </div>
        </>
      ) : (
        <>
          <div>
            <label htmlFor='endDate' className='formLabel'>
              Graduation End Date
            </label>
            <input
              type='month'
              id='endDate'
              name='endDate'
              className='form_control'
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              disabled
            />
          </div>
          <div className='flex items-center sm:col-start-1 sm:col-end-3 justify-self-end mb-4'>
            <input
              type='checkbox'
              name='currSchool'
              id='currSchool'
              className='mr-2'
              defaultChecked
              onChange={(e) => {
                if (e.target.checked) {
                  setCurrSchool("on");
                } else {
                  setCurrSchool("off");
                }
              }}
            />
            <label
              htmlFor='currSchool'
              className='formLabel text-gray-500 text-sm'
            >
              I am currently attending here.
            </label>
          </div>
        </>
      )}
      <div className='sm:col-start-1 sm:col-end-3'>
        <label className='formLabel' htmlFor='eduExp'>
          Work Experience
        </label>
        <textarea
          name='eduExp'
          id='eduExp'
          cols='30'
          rows='5'
          className='form_control resize-none'
          value={eduExp}
          onChange={(e) => setEduExp(e.target.value)}
        ></textarea>
      </div>
      <button type='button' className='reset-btn' onClick={handleDelete}>
        Delete
      </button>
      <button type='submit' className='submit-btn'>
        Save
      </button>
      {navigation.state === "submitting" ? (
        <div className='absolute w-full h-full grid place-items-center'>
          <div className='arc self-end'></div>
          <span className=' font-black text-darkBlue text-xl text-center self-start'>
            SAVING
          </span>
        </div>
      ) : (
        ""
      )}
    </Form>
  );
}
