import React, { useState } from "react";
import { RxDoubleArrowLeft, RxDoubleArrowRight } from "react-icons/rx";
import { Link, NavLink, Outlet, redirect, useLoaderData, useNavigate, useNavigation } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { HiPlusCircle } from "react-icons/hi";
import EmptyDoc from "../../components/emptyDoc";

export async function loader({params}) {
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
    "skills"
  );
  const dataSnap = (await getDoc(ref)).data();
  return { dataSnap, index: params.index };
}

export default function Skills() {

  const { dataSnap } = useLoaderData();
  const [skills, setSkills] = useState(dataSnap);
  const navigate = useNavigate();
  const navigation = useNavigation()

  async function updateSkills() {
    const auth = getAuth();
    const user = auth.currentUser;
    const ref = doc(
      db,
      "users",
      user.displayName + user.uid,
      "data",
      "skills"
    );
    setSkills((await getDoc(ref)).data());
  }

  async function createNewSkill() {
    const auth = getAuth();
    const user = auth.currentUser;
    const ref = doc(
      db,
      "users",
      user.displayName + user.uid,
      "data",
      "skills"
    );
    await updateDoc(ref, {
      [Object.keys(skills).length]: {
        name: '',
        level: ''
      },
    }).then(async () => {
      await updateSkills();
      navigate(`/edit/skills/${Object.keys(skills).length}`);
    });
  }

  return (
    <section className='info_container'>
      <article className='info_subContainer'>
        <nav className='container_nav'>
          <Link className='back_forward_link' to='/edit/education'>
            <RxDoubleArrowLeft />
            <span>Back</span>
          </Link>
          <h1>Skills</h1>
          <Link className='back_forward_link' to='/edit/summary'>
            <span>Next</span>
            <RxDoubleArrowRight />
          </Link>
        </nav>
        <main>
          <p className='description_para'>
            Your skills section should include relevant technical or hard skills
            and soft skills. You can include any tools you’ve mastered or
            certifications you’ve obtained as well.
          </p>
          <Outlet context={[updateSkills]}/>
        </main>
      </article>
      <div className='added_info_container'>
        {Object.keys(skills).length > 0 ? (
          Object.keys(skills).map((key, index) => {
            const skillItem = skills[key];
            return (
              <NavLink
                to={`/edit/skills/${key}`}
                key={index}
                className={({isActive, isPending}) => 
                isActive ? 'active_link' : isPending ? 'pending_link' : 'nav_link'
              }
              >
                <h3 className='font-semibold'>{skillItem.name || "Empty"}</h3>
                <h4 className='text-sm italic'>
                  - {skillItem.level || "Empty"}
                </h4>
              </NavLink>
            );
          })
        ) : (
          <EmptyDoc name={'skills'}/>
        )}
        <button className='add_new_btn self-start m-1' onClick={createNewSkill}>
          Add new Skill <HiPlusCircle className='plus-icon' />
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
