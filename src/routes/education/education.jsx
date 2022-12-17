import { getAuth } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { HiPlusCircle } from "react-icons/hi";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import {
  Link,
  Outlet,
  redirect,
  useLoaderData,
  useNavigate,
} from "react-router-dom";
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
    setEducation((await getDoc(ref)).data());
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
            <IoIosArrowBack />
            <span>Back</span>
          </Link>
          <h1>Education</h1>
          <Link className='back_forward_link' to='/edit/skills'>
            <span>Next</span>
            <IoIosArrowForward />
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
            return (
              <Link
                to={`/edit/education/${key}`}
                key={index}
                className='bg-white p-2 rounded border-2 border-gray-200 m-1 bg-opacity-50 hover:border-mainBlue text-darkBlue hover:text-mainBlue cursor-pointer transition-all'
              >
                <h3 className='font-semibold'>{eduItem.degree || "Empty"}</h3>
                <h4 className='text-sm italic'>
                  - {eduItem.schoolName || "Empty"}
                </h4>
              </Link>
            );
          })
        ) : (
          <p className='text-center text-xl font-semibold text-gray-600 place-self-center'>
            No education added
          </p>
        )}
        <button className='add_new_btn' onClick={createNewEducation}>
          Add new Education <HiPlusCircle className='plus-icon' />
        </button>
      </div>
    </section>
  );
}
