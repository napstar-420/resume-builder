import {getAuth, signInWithEmailAndPassword} from 'firebase/auth'

export async function loginUser(email, password) {
    const auth = getAuth();
    const result = signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        return 'logged-in';
      })
      .catch((error) => {
        return error.code;
      })
    return result;
}