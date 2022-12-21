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
  const ref = doc(db, "users", user.displayName + user.uid, "data", "skills");

  const formData = await request.formData();
  const updates = Object.fromEntries(formData);

  await updateDoc(ref, {
    [params.index]: updates,
  });

  return redirect("/edit/skills/");
}

export default function SkillForm() {
  const { dataSnap, index } = useLoaderData();
  const [updateSkills] = useOutletContext();
  const navigate = useNavigate();
  const navigation = useNavigation();

  const [data, setData] = useState(dataSnap[index]);
  const [name, setName] = useState(data.name);
  const [level, setLevel] = useState(data.level);

  async function handleSave() {
    await updateSkills();
  };

  async function handleDelete() {
    const auth = getAuth();
    const user = auth.currentUser;
    const ref = doc(db, "users", user.displayName + user.uid, "data", "skills");

    await updateDoc(ref, {
        [index]: deleteField() 
    });

    await updateSkills();

    navigate('/edit/skills')
  }

  useEffect(() => {
    setData(dataSnap[index]);
    setName(data.name);
    setLevel(data.level);
  }, [dataSnap, index, data.name, data.level]);

  return (
    <Form method='post' className='edit_info_form' onSubmit={handleSave}>
      <p>
        Required feilds are marked with <span className='astrk'>*</span>
      </p>
      <div>
        <label htmlFor='name' className='formLabel'>
          Add your skill <span className='astrk'>*</span>
        </label>
        <input
          type='text'
          id='skill_name'
          name='name'
          placeholder='Technical Support'
          className='form_control'
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor='level' className='formLabel'>
          Select Skill Level <span className='astrk'>*</span>
        </label>
        <select
          id='skill_level'
          name='level'
          className='form_control bg-white'
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          required
        >
          <option value=''>--------</option>
          <option value='beginner'>Beginner</option>
          <option value='intermediate'>Intermediate</option>
          <option value='expert'>Expert</option>
        </select>
      </div>
      <button type='button' onClick={handleDelete} className='reset-btn'>
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
