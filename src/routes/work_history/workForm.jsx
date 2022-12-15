import { getAuth } from "firebase/auth";
import { deleteField, doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { useEffect } from "react";
import {
  Form,
  redirect,
  useLoaderData,
  useNavigate,
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
    "work_history"
  );
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  await updateDoc(ref, {
    [params.index]: updates,
  });
  return redirect(`/edit/work_history/`);
}

export default function WorkForm() {

  const { dataSnap, index } = useLoaderData();
  const [updateWorkHistory] = useOutletContext();
  const navigate = useNavigate();

  const [data, setData] = useState(dataSnap[index]);
  const [jobTitle, setJobTitle] = useState(data.jobTitle);
  const [employer, setEmployer] = useState(data.employer);
  const [city, setCity] = useState(data.city);
  const [country, setCountry] = useState(data.country);
  const [startDate, setStartDate] = useState(data.startDate);
  const [endDate, setEndDate] = useState(data.endDate);
  const [currentWork, setCurrentWork] = useState(data.currentWork);
  const [workExp, setWorkExp] = useState(data.workExp);

  useEffect(() => {
    setData(dataSnap[index]);
    setJobTitle(data.jobTitle);
    setEmployer(data.employer);
    setCity(data.city);
    setCountry(data.country);
    setStartDate(data.startDate);
    setEndDate(data.endDate);
    setCurrentWork(data.currentWork);
    setWorkExp(data.workExp);
  }, [
    data.jobTitle,
    data.employer,
    data.city,
    data.country,
    data.startDate,
    data.endDate,
    data.currentWork,
    data.workExp,
    index,
    dataSnap,
  ]);

  async function handleSave() {
    await updateWorkHistory();
  }

  async function handleDelete() {
    const auth = getAuth();
    const user = auth.currentUser;
    const ref = doc(
      db,
      "users",
      user.displayName + user.uid,
      "data",
      "work_history"
    );
    await updateDoc(ref, {
      [index]: deleteField()
    })
    await updateWorkHistory();
    navigate('/edit/work_history');
  }

  return (
    <Form method='post' className='edit_info_form' onSubmit={handleSave}>
      <p>
        Required feilds are marked with <span className='astrk'>*</span>
      </p>
      <div>
        <label htmlFor='job_title' className='formLabel'>
          Job Title <span className='astrk'>*</span>
        </label>
        <input
          type='text'
          id='jobTitle'
          name='jobTitle'
          placeholder='Retails sale associate'
          className='form_control'
          required
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor='employer' className='formLabel'>
          Employer <span className='astrk'>*</span>
        </label>
        <input
          type='text'
          id='employer'
          name='employer'
          placeholder='Dermalogica'
          className='form_control'
          required
          value={employer}
          onChange={(e) => setEmployer(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor='city' className='formLabel'>
          City / Municipality <span className='astrk'>*</span>
        </label>
        <input
          type='text'
          id='city'
          name='city'
          className='form_control'
          placeholder='lahore'
          required
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor='country' className='formLabel'>
          Country <span className='astrk'>*</span>
        </label>
        <input
          type='text'
          id='country'
          name='country'
          placeholder='Pakistan'
          className='form_control'
          required
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor='job_start_date' className='formLabel'>
          Start Date <span className='astrk'>*</span>
        </label>
        <input
          type='month'
          id='startDate'
          name='startDate'
          className='form_control'
          required
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </div>
      {currentWork !== "on" ? (
        <>
          <div>
            <label htmlFor='job_end_date' className='formLabel'>
              End Date <span className='astrk'>*</span>
            </label>
            <input
              type='month'
              id='endDate'
              name='endDate'
              className='form_control'
              required
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
          <div className='flex items-center sm:col-start-1 sm:col-end-3 justify-self-end'>
            <input
              type='checkbox'
              name='currentWork'
              id='currentWork'
              className='mr-2'
              onChange={(e) => {
                if (e.target.checked) {
                  setCurrentWork("on");
                } else {
                  setCurrentWork("off");
                }
              }}
            />
            <label
              htmlFor='currentWork'
              className='formLabel text-gray-500 text-sm'
            >
              I am currently working here.
            </label>
          </div>
        </>
      ) : (
        <>
          <div>
            <label htmlFor='job_end_date' className='formLabel'>
              End Date
            </label>
            <input
              type='month'
              id='endDate'
              name='endDate'
              className='form_control'
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              disabled // DISABLED
            />
          </div>
          <div className='flex items-center sm:col-start-1 sm:col-end-3 justify-self-end'>
            <input
              type='checkbox'
              name='currentWork'
              id='currentWork'
              className='mr-2'
              defaultChecked
              onChange={(e) => {
                if (e.target.checked) {
                  setCurrentWork("on");
                } else {
                  setCurrentWork("off");
                }
              }}
            />
            <label
              htmlFor='currentWork'
              className='formLabel text-gray-500 text-sm'
            >
              I am currently working here.
            </label>
          </div>
        </>
      )}
      <div className='sm:col-start-1 sm:col-end-3'>
        <label className='formLabel' htmlFor='workExp'>
          Work Experience
        </label>
        <textarea
          name='workExp'
          id='workExp'
          cols='30'
          rows='5'
          className='form_control resize-none'
          value={workExp}
          onChange={(e) => setWorkExp(e.target.value)}
        ></textarea>
      </div>
      <button type='button' onClick={handleDelete} className='reset-btn'>
        Delete
      </button>
      <button type='submit' className='submit-btn'>
        Save
      </button>
    </Form>
  );
}
