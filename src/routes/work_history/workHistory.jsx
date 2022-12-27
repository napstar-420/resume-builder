import React, { useState } from "react";
import { getAuth } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { RxDoubleArrowLeft, RxDoubleArrowRight } from "react-icons/rx";
import { HiPlusCircle } from "react-icons/hi";
import {
  Link,
  NavLink,
  Outlet,
  redirect,
  useLoaderData,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import { db } from "../../firebaseConfig";
import EmptyDoc from "../../components/emptyDoc";

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
  const navigation = useNavigation()
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
            <RxDoubleArrowLeft />
            <span>Back</span>
          </Link>
          <h1>Work History</h1>
          <Link className='back_forward_link' to='/edit/education'>
            <span>Next</span>
            <RxDoubleArrowRight />
          </Link>
        </nav>
        <main className=''>
          <p className='description_para'>
            Also called your “experience” or “professional history” section,
            this is an opportunity to showcase the value you’ve brought to
            former employers. Here, you should list all of your most relevant
            work experiences, beginning with your most recent job.
          </p>
          <Outlet context={[updateWorkHistory]} />
        </main>
      </article>
      <div className='added_info_container'>
        {Object.keys(workHistory).length > 0 ? (
          Object.keys(workHistory).map((key, index) => {
            const workItem = workHistory[key]
            return (
              <NavLink
                to={`/edit/work_history/${key}`}
                key={index}
                className={({isActive, isPending}) => 
                isActive ? 'active_link' : isPending ? 'pending_link' : 'nav_link'
              }
              >
                <h3 className='font-semibold'>{workItem.jobTitle || "Empty"}</h3>
                <h4 className='text-sm italic'>
                  - {workItem.employer || "Empty"}
                </h4>
              </NavLink>
            );
          })
        ) : (
          <EmptyDoc name={'work'}/>
        )}
        <button className='add_new_btn self-start' onClick={handleCreateNewWork}>
          Add new Work <HiPlusCircle className='plus-icon' />
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
