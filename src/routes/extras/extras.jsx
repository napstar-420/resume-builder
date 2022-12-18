import { getAuth } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { HiPlusCircle } from "react-icons/hi";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Link, Outlet, redirect, useLoaderData, useNavigate } from "react-router-dom";
import { db } from "../../firebaseConfig";

export async function loader({ params }) {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) {
      return redirect("/edit/");
    }
    const ref = doc(
      db,
      "users",
      user.displayName + user.uid,
      "data",
      "extras"
    );
    const dataSnap = (await getDoc(ref)).data();
    return { dataSnap, index: params.index };
  }

export default function Extras() {

  const { dataSnap } = useLoaderData();
  const navigate = useNavigate();
  const [extras, setExtras] = useState(dataSnap);

  async function updateExtras() {
    const auth = getAuth();
    const user = auth.currentUser;
    const ref = doc(
      db,
      "users",
      user.displayName + user.uid,
      "data",
      "extras"
    );
    setExtras((await getDoc(ref)).data());
  }

  async function createNewExtra() {
    const auth = getAuth();
    const user = auth.currentUser;
    const ref = doc(
      db,
      "users",
      user.displayName + user.uid,
      "data",
      "extras"
    );
    await updateDoc(ref, {
      [Object.keys(extras).length]: {
        heading: '',
        items: []
      },
    }).then(async () => {
      await updateExtras();
      navigate(`/edit/extras/${Object.keys(extras).length}`);
    });
  }

  return (
    <section className='info_container'>
      <article className='info_subContainer'>
        <nav className='container_nav'>
          <Link className='back_forward_link' to='/edit/summary'>
            <IoIosArrowBack />
            <span>Back</span>
          </Link>
          <h1>Extras</h1>
          <Link className='back_forward_link' to='/edit/templates'>
            <span>Next</span>
            <IoIosArrowForward />
          </Link>
        </nav>
        <main>
          <p className='description_para'>
            The last section to consider adding to your resume is a shortlist of
            any other relevant accomplishments or volunteer work. Only include
            those that are relevant or that may help create a better picture of
            who you are as an individual as related to the position you’re
            applying for.
          </p>
          <Outlet context={[updateExtras]}/>
        </main>
      </article>
      <div className='added_info_container'>
      {Object.keys(extras).length > 0 ? (
          Object.keys(extras).map((key, index) => {
            const extraItem = extras[key];
            return (
              <Link
                to={`/edit/extras/${key}`}
                key={index}
                className='bg-white p-2 rounded border-2 border-gray-200 m-1 bg-opacity-50 hover:border-mainBlue text-darkBlue hover:text-mainBlue cursor-pointer transition-all'
              >
                <h3 className='font-semibold'>{extraItem.heading || "Empty"}</h3>
                <h4 className='text-sm italic'>
                  - {extraItem.items.length || "0"} items
                </h4>
              </Link>
            );
          })
        ) : (
          <p className='text-center text-xl font-semibold text-gray-600 place-self-center'>
            No extra added
          </p>
        )}
        <button className='add_new_btn' onClick={createNewExtra}>
          Add new Extra <HiPlusCircle className='plus-icon' />
        </button>
      </div>
    </section>
  );
}
