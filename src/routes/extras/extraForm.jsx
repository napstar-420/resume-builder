import { getAuth } from "firebase/auth";
import { deleteField, doc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { HiPlusCircle } from "react-icons/hi";
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
  const ref = doc(db, "users", user.displayName + user.uid, "data", "extras");
  const rawUpdate = Object.fromEntries(await request.formData());
  const items = [];
  for (let key in rawUpdate) {
    if(key !== 'heading' && rawUpdate[key]){
        items.push(rawUpdate[key]);
    }
  }
  const updates = {
    heading: rawUpdate.heading,
    items,
  };
  await updateDoc(ref, {
    [params.index]: updates,
  });
  return redirect("/edit/extras/");
}

export default function ExtraForm() {
  const { dataSnap, index } = useLoaderData();
  const [updateExtras] = useOutletContext();
  const navigate = useNavigate();

  const [extras, setExtras] = useState(dataSnap[index]);
  const [heading, setHeading] = useState(extras.heading);
  const [items, setItems] = useState(extras.items);

  async function handleSave() {
    await updateExtras();
  }

  async function handleDelete() {
    const auth = getAuth();
    const user = auth.currentUser;
    const ref = doc(db, "users", user.displayName + user.uid, "data", "extras");

    await updateDoc(ref, {
      [index]: deleteField(),
    });

    await updateExtras();
    navigate("/edit/extras");
  }

  useEffect(() => {
    setExtras(dataSnap[index]);
    setHeading(extras.heading);
    setItems(extras.items);
  }, [dataSnap, index, extras.heading, extras.items])

  return (
    <Form method='post' className='edit_info_form' onSubmit={handleSave}>
      <div className='sm:col-start-1 sm:col-end-3'>
        <label htmlFor='heading' className='formLabel'>
          Extra Heading
        </label>
        <input
          type='text'
          id='extra_heading'
          name='heading'
          className='form_control'
          placeholder='Hobbies / Software / Languages'
          value={heading}
          onChange={(e) => setHeading(e.target.value)}
          required
        />
      </div>
      <div className='sm:col-start-1 sm:col-end-3 grid sm:grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))] gap-1'>
        {items.map((item, index) => {
          return (
            <div key={index}>
              <label htmlFor={`item${index}`} className='formLabel'>
                Item {index + 1}
              </label>
              <input
                type='text'
                id='extra_item'
                name={`item${index}`}
                className='form_control'
                defaultValue={item}
              />
            </div>
          );
        })}
        <button
          className='add_new_btn self-end'
          type='button'
          onClick={() => setItems([...items, ""])}
        >
          new item <HiPlusCircle className='plus-icon' />
        </button>
      </div>
      <button type='button' className='reset-btn' onClick={handleDelete}>
        Delete
      </button>
      <button type='submit' className='submit-btn'>
        Save
      </button>
    </Form>
  );
}
