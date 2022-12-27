import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import React from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { HiOutlineClipboardDocumentCheck } from "react-icons/hi2";
import {
  Link,
  NavLink,
  Outlet,
  useLoaderData,
} from "react-router-dom";
import { db } from "../../firebaseConfig";

const exampleObject = {
  personalInfo: {
    fname: "John",
    sname: "Smith",
    email: "johnsmith@email.com",
    mNumber: "+1-202-555-0199",
    sNumber: "+1-202-555-0159",
    address: "18058 John Ports Suite 577, South Jennyferside, Idaho, USA",
  },
  workHistory: {
    0: {
      city: "New York",
      employer: "Employer",
      endDate: "2022-12",
      startDate: "2022-12",
      jobTitle: "Senior Computer Manager",
      country: "USA",
      workExp: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque id unde consectetur in, laborum laboriosam natus, recusandae sed facilis excepturi beatae vero? Sint dolorum, quam atque nobis dolorem explicabo temporibus aliquam cupiditate hic quod, quis vitae sit perferendis? Velit aut non commodi quas repellat atque laboriosam nulla porro magni. Rem!",
    },
    1: {
      city: "New York",
      employer: "Employer",
      endDate: "2022-12",
      startDate: "2022-12",
      jobTitle: "Septic Tank Servicer",
      country: "USA",
      workExp: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque id unde consectetur in, laborum laboriosam natus, recusandae sed facilis excepturi beatae vero? Sint dolorum, quam atque nobis dolorem explicabo temporibus aliquam cupiditate hic quod, quis vitae sit perferendis? Velit aut non commodi quas repellat atque laboriosam nulla porro magni. Rem!",
    },
    2: {
      city: "New York",
      startDate: "2022-12",
      country: "USA",
      employer: "Employer",
      jobTitle: "Frontend Developer",
      currentWork: "on",
      workExp: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque id unde consectetur in, laborum laboriosam natus, recusandae sed facilis excepturi beatae vero? Sint dolorum, quam atque nobis dolorem explicabo temporibus aliquam cupiditate hic quod, quis vitae sit perferendis? Velit aut non commodi quas repellat atque laboriosam nulla porro magni. Rem!",
    },
  },
  education: {
    0: {
      endDate: "2019-08",
      startDate: "2017-04",
      degree: "Degree",
      schoolName: "School name",
      fieldOfStudy: "Feild of Study",
      schoolLocation: "School Location",
      eduExp: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque id unde consectetur in, laborum laboriosam natus, recusandae sed facilis excepturi beatae vero? Sint dolorum, quam atque nobis dolorem explicabo temporibus aliquam cupiditate hic quod, quis vitae sit perferendis? Velit aut non commodi quas repellat atque laboriosam nulla porro magni. Rem!",
    },
    1: {
      endDate: "2022-01",
      startDate: "2019-09",
      degree: "Degree",
      schoolName: "School name",
      fieldOfStudy: "Feild of Study",
      schoolLocation: "School Location",
      eduExp: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque id unde consectetur in, laborum laboriosam natus, recusandae sed facilis excepturi beatae vero? Sint dolorum, quam atque nobis dolorem explicabo temporibus aliquam cupiditate hic quod, quis vitae sit perferendis? Velit aut non commodi quas repellat atque laboriosam nulla porro magni. Rem!",
    },
    2: {
      startDate: "2022-03",
      currSchool: "on",
      degree: "Degree",
      schoolName: "School name",
      fieldOfStudy: "Feild of Study",
      schoolLocation: "School Location",
      eduExp: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque id unde consectetur in, laborum laboriosam natus, recusandae sed facilis excepturi beatae vero? Sint dolorum, quam atque nobis dolorem explicabo temporibus aliquam cupiditate hic quod, quis vitae sit perferendis? Velit aut non commodi quas repellat atque laboriosam nulla porro magni. Rem!",
    },
  },
  skills: {
    0: {
      name: "Skill 1",
      level: "beginner",
    },
    1: {
      level: "beginner",
      name: "Skill 2",
    },
    2: {
      level: "expert",
      name: "Skill 3",
    },
    3: {
      name: "skill 4",
      level: "intermediate",
    },
  },
  summary: {
    title: "Sales Manager",
    summary: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque id unde consectetur in, laborum laboriosam natus, recusandae sed facilis excepturi beatae vero? Sint dolorum, quam atque nobis dolorem explicabo temporibus aliquam cupiditate hic quod, quis vitae sit perferendis? Velit aut non commodi quas repellat atque laboriosam nulla porro magni. Rem!",
  },
  extras: {
    0: {
      heading: "Hobbies",
      items: [
        "Reading Books",
        "Playing video Games",
        "Surfing Internet",
        "Learning new things",
        "Reading news paper",
      ],
    },
    1: {
      heading: "software",
      items: ["ms-excel", "ms-word", "ms-power point"],
    },
  },
};

export async function loader() {
  const auth = getAuth();
  const user = auth.currentUser;
  if (!user) {
    return {
      userDoc: exampleObject,
      name: "",
    };
  } else {
    const personalInfo = (
      await getDoc(
        doc(db, "users", user.displayName + user.uid, "data", "personal_info")
      )
    ).data();
    const workHistory = (
      await getDoc(
        doc(db, "users", user.displayName + user.uid, "data", "work_history")
      )
    ).data();
    const education = (
      await getDoc(
        doc(db, "users", user.displayName + user.uid, "data", "education")
      )
    ).data();
    const skills = (
      await getDoc(
        doc(db, "users", user.displayName + user.uid, "data", "skills")
      )
    ).data();
    const summary = (
      await getDoc(
        doc(db, "users", user.displayName + user.uid, "data", "summary")
      )
    ).data();
    const extras = (
      await getDoc(
        doc(db, "users", user.displayName + user.uid, "data", "extras")
      )
    ).data();
    const userDoc = {
      personalInfo,
      workHistory,
      education,
      skills,
      summary,
      extras,
    };
    return { userDoc, name: user.displayName };
  }
}

export default function Templates() {
  const { userDoc, name } = useLoaderData();
  console.log(userDoc);
  return (
    <div>
      <header className='h-11 md:h-14 px-4 shadow flex justify-between bg-white print:hidden'>
        <Link to='/' className='flex items-center'>
          <HiOutlineClipboardDocumentCheck className='mr-2 text-2xl text-blue-500' />
          <h2 className='text-xl font-medium text-[#505050]'>Resume Builder</h2>
        </Link>
        <h3 className='hidden font-poppins text-[#888] xs:flex items-center hover:bg-[#eee] px-2 py-1 rounded-md'>
          <FaRegUserCircle className='text-[#555] mr-2 text-xl' /> {name}
        </h3>
      </header>
      <Outlet context={userDoc} />
      <nav className='flex md:justify-center items-center px-2 shadow-[#e7e7e7] shadow-[0px_-2px_2px] w-full h-14 overflow-x-scroll md:overflow-auto print:hidden'>
        <NavLink to='classic' className='template_link'>
          <span />
          Classic
        </NavLink>
        <NavLink to={'modern'} className='template_link'>
          <span className='!bg-blue-500' />
          Modern
        </NavLink>
      </nav>
    </div>
  );
}
