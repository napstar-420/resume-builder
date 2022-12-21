import { getAuth } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { HiPlusCircle } from "react-icons/hi";
import { RxDoubleArrowLeft, RxDoubleArrowRight } from "react-icons/rx";
import {
  Link,
  NavLink,
  Outlet,
  redirect,
  useLoaderData,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import EmptyDoc from "../../components/emptyDoc";
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
    "education"
  );
  const dataSnap = (await getDoc(ref)).data();
  return { dataSnap, index: params.index };
}

export default function Education() {
  const { dataSnap } = useLoaderData();
  const [education, setEducation] = useState(dataSnap);
  const navigate = useNavigate();
  const navigation = useNavigation();

  async function updateEducation() {
    const auth = getAuth();
    const user = auth.currentUser;
    const ref = doc(
      db,
      "users",
      user.displayName + user.uid,
      "data",
      "education"
    );
    const dataSnap = (await getDoc(ref)).data();
    setEducation(dataSnap);
  }

  async function createNewEducation() {
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
      [Object.keys(education).length]: {
        schoolName: '',
        schoolLocation: '',
        degree: '',
        fieldOfStudy: '',
        startDate: '',
        endDate: '',
        eduExp: ''
      },
    }).then(async () => {
      await updateEducation();
      navigate(`/edit/education/${Object.keys(education).length}`);
    });
  }

  return (
    <section className='info_container'>
      <article className='info_subContainer'>
        <nav className='container_nav'>
          <Link className='back_forward_link' to='/edit/work_history'>
            <RxDoubleArrowLeft />
            <span>Back</span>
          </Link>
          <h1>Education</h1>
          <Link className='back_forward_link' to='/edit/skills'>
            <span>Next</span>
            <RxDoubleArrowRight />
          </Link>
        </nav>
        <main>
          <p className='description_para'>
            The resume education section is helpful for employers who require a
            certain degree, certificate or level of experience. You should
            include your most recent and relevant education based on your level
            of experience.
          </p>
          <Outlet context={[updateEducation]}/>
        </main>
      </article>
      <div className='added_info_container'>
        {Object.keys(education).length > 0 ? (
          Object.keys(education).map((key, index) => {
            const eduItem = education[key];
            console.log(eduItem)
            return (
              <NavLink
                to={`/edit/education/${key}`}
                key={index}
                className={({isActive, isPending}) => 
                isActive ? 'active_link' : isPending ? 'pending_link' : 'nav_link'
              }
              >
                <h3 className='font-semibold'>{eduItem.degree || "Empty"}</h3>
                <h4 className='text-sm italic'>
                  - {eduItem.schoolName || "Empty"}
                </h4>
              </NavLink>
            );
          })
        ) : (
          <EmptyDoc name={'education'}/>
        )}
        <button className='add_new_btn self-start m-1' onClick={createNewEducation}>
          Add new Education <HiPlusCircle className='plus-icon' />
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
