import { getAuth } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { RxDoubleArrowLeft, RxDoubleArrowRight } from "react-icons/rx";
import { Form, Link, redirect, useLoaderData, useNavigation } from "react-router-dom";
import { db } from "../firebaseConfig";

export async function loader() {
  const auth = getAuth();
  const user = auth.currentUser;
  if (!user) {
    return redirect("/edit/");
  }
  const ref = doc(db, 'users', user.displayName + user.uid, 'data', 'summary');
  const dataSnap = (await getDoc(ref)).data();
  return dataSnap;
}

export async function action({request}) {
  const auth = getAuth();
  const user = auth.currentUser;
  const ref = doc(db, 'users', user.displayName + user.uid, 'data', 'summary');
  const formData = await request.formData();
  const newSummary = Object.fromEntries(formData);
  await updateDoc(ref, newSummary);
  return redirect('/edit/extras');
}

export default function Summary() {
  const dataSnap = useLoaderData();
  const [summary, setSummary] = useState(dataSnap.summary);
  const navigation = useNavigation();
  
  return (
    <section className='info_container grid-rows-1'>
      <article className='info_subContainer'>
        <nav className='container_nav'>
          <Link className='back_forward_link' to='/edit/skills'>
            <RxDoubleArrowLeft />
            <span>Back</span>
          </Link>
          <h1>Summary</h1>
          <Link className='back_forward_link' to='/edit/extras'>
            <span>Next</span>
            <RxDoubleArrowRight />
          </Link>
        </nav>
        <main>
          <p className='description_para'>
            Your resume summary or objective should be a short, one to two
            sentence section that briefly explains who you are and why you’re
            qualified. Carefully review the job posting for clues on which of
            your technical and soft skills will be most important and relevant.
          </p>
          <Form method="post" className='edit_info_form'>
            <div className="sm:col-start-1 sm:col-end-3">
              <label htmlFor='summary' className='formLabel'>
                Briefly tell us about your background
              </label>
              <textarea 
                name="summary" 
                id="summary" 
                cols="30" 
                rows="5" 
                className="form_control resize-none"
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
              ></textarea>
            </div>
            <button type="onClick" onClick={() => setSummary('')} className="reset-btn">Reset</button>
            <button type="submit" className="submit-btn">Save and Continue</button>
            {
              navigation.state === 'submitting' ? (
                <div className="absolute w-full h-full grid place-items-center">
                  <div className="arc self-end"></div>
                  <span className=" font-black text-darkBlue text-xl text-center self-start">
                    SAVING
                  </span>
                </div>
              ) : ''
            }
          </Form>
        </main>
      </article>
      <div className={navigation.state === 'loading' ? 'animation-wrapper' : 'hidden'}>
        <div class='cube'>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </section>
  );
}
