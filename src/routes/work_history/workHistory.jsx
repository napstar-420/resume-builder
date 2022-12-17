import React, { useState } from "react";
import { getAuth } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { HiPlusCircle } from "react-icons/hi";
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
    "work_history"
  );
  const dataSnap = (await getDoc(ref)).data();
  return { dataSnap, index: params.index };
}

export default function WorkIndex() {
  const navigate = useNavigate();
  const { dataSnap } = useLoaderData();
  const [workHistory, setWorkHistory] = useState(dataSnap);

  async function updateWorkHistory() {
    const auth = getAuth();
    const user = auth.currentUser;
    const ref = doc(
      db,
      "users",
      user.displayName + user.uid,
      "data",
      "work_history"
    );
    const workHistory = (await getDoc(ref)).data();
    setWorkHistory(workHistory);
  }

  async function handleCreateNewWork() {
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
      [Object.keys(workHistory).length]: {
        jobTitle: "",
        employer: "",
        city: "",
        country: "",
        startDate: "",
        endDate: "",
        currentWork: false,
        workExp: "",
      },
    }).then(async () => {
      await updateWorkHistory();
      navigate(`/edit/work_history/${Object.keys(workHistory).length}`);
    });
  }

  return (
    <section className='info_container'>
      <article className='info_subContainer'>
        <nav className='container_nav'>
          <Link className='back_forward_link' to='/edit/personal_info'>
            <IoIosArrowBack />
            <span>Back</span>
          </Link>
          <h1>Work History</h1>
          <Link className='back_forward_link' to='/edit/education'>
            <span>Next</span>
            <IoIosArrowForward />
          </Link>
        </nav>
        <main className=''>
          <p className='description_para'>
            Also called your “experience” or “professional history” section,
            this is an opportunity to showcase the value you’ve brought to
            former employers. Here, you should list all of your most relevant
            work experiences, beginning with your most recent job.
          </p>
          <Outlet context={[updateWorkHistory]}/>
        </main>
      </article>
      <div className='added_info_container'>
        {Object.keys(workHistory).length > 0 ? (
          Object.keys(workHistory).map((key, index) => {
            const workItem = workHistory[key]
            return (
              <Link
                to={`/edit/work_history/${key}`}
                key={index}
                className='bg-white p-2 rounded border-2 border-gray-200 m-1 bg-opacity-50 hover:border-mainBlue text-darkBlue hover:text-mainBlue cursor-pointer transition-all'
              >
                <h3 className='font-semibold'>{workItem.jobTitle || "Empty"}</h3>
                <h4 className='text-sm italic'>
                  - {workItem.employer || "Empty"}
                </h4>
              </Link>
            );
          })
        ) : (
          <p className='text-center text-xl font-semibold text-gray-600 place-self-center'>
            No work added
          </p>
        )}
        <button className='add_new_btn' onClick={handleCreateNewWork}>
          Add new Work <HiPlusCircle className='plus-icon' />
        </button>
      </div>
    </section>
  );
}
