import { getAuth } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { HiPlusCircle } from "react-icons/hi";
import { RxDoubleArrowLeft, RxDoubleArrowRight } from "react-icons/rx";
import { Link, NavLink, Outlet, redirect, useLoaderData, useNavigate, useNavigation } from "react-router-dom";
import { db } from "../../firebaseConfig";
import EmptyDoc from '../../components/emptyDoc'

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
  const navigation = useNavigation();
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
            <RxDoubleArrowLeft />
            <span>Back</span>
          </Link>
          <h1>Extras</h1>
          <Link className='back_forward_link' to='/templates'>
            <span>Next</span>
            <RxDoubleArrowRight />
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
              <NavLink
                to={`/edit/extras/${key}`}
                key={index}
                className={({isActive, isPending}) => 
                isActive ? 'active_link' : isPending ? 'pending_link' : 'nav_link'
              }
              >
                <h3 className='font-semibold'>{extraItem.heading || "Empty"}</h3>
                <h4 className='text-sm italic'>
                  - {extraItem.items.length || "0"} items
                </h4>
              </NavLink>
            );
          })
        ) : (
          <EmptyDoc name={'extras'}/>
        )}
        <button className='add_new_btn self-start m-1' onClick={createNewExtra}>
          Add new Extra <HiPlusCircle className='plus-icon' />
        </button>
      </div>
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
