import { getAuth, createUserWithEmailAndPassword, updateProfile, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import {app} from './firebaseConfig';


export async function createUser(email, password, name) {
    const auth = getAuth(app);
    return await createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      updateProfile(auth.currentUser, {
        displayName: name
      })
      return 'account-created';
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
