import { getAuth, createUserWithEmailAndPassword, updateProfile, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import {app, db} from './firebaseConfig';


export async function createUser(email, password, name) {
    const auth = getAuth(app);
    return await createUserWithEmailAndPassword(auth, email, password)
    .then(async(userCredentials) => {
      await updateProfile(auth.currentUser, {
        displayName: name
      })
      return userCredentials.user.uid;
    })
    .catch((error) => {
      if(error.code === 'auth/email-already-in-use') {
        return 'email-already-in-use';
      } else {
        return 'error';
      }
    })
}

export function signUpWithGoogle() {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  const result = signInWithPopup(auth, provider)
  .then(() => {
    return 'logged-in';
  })
  .catch((error) => {
    console.log(error);
  })
  return result;
}

export async function createUserDoc(uid, name, email, password) {
  await setDoc(doc(db, `users/${name + uid}`), {
    email,
    password,
    name
  })

  await setDoc(doc(db, 'users', name + uid, 'data', 'personal_info'), {
    fname: '',
    sname: '',
    email: '',
    mNumber: '',
    sNumber: '',
    address: ''
  })

  await setDoc(doc(db, 'users', name + uid, 'data', 'work_history'), {
    workHistory: [
      {
        jobTitle: '',
        employer: '',
        city: '',
        country: '',
        startDate: '',
        endDate: '',
        workExp: ''
      }
    ]
  })
  await setDoc(doc(db, 'users', name + uid, 'data', 'education'), {
    education: [
      {
        schoolName: '',
        schoolLocation: '',
        degree: '',
        fod: '',
        startDate: '',
        endDate: '',
        eduExp: ''
      }
    ]
  })
  await setDoc(doc(db, 'users', name + uid, 'data', 'skills'), {
    skills: [
      {
        skillName: '',
        skillLevel: ''
      }
    ]
  })
  await setDoc(doc(db, 'users', name + uid, 'data', 'summary'), {
    summary: ''
  })
  await setDoc(doc(db, 'users', name + uid, 'data', 'extras'), {
    extras: [
    {
      extraHeading: '',
      extraItems: ['']
    }
    ]
  })
}