// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCBY8rLq0U7FBKpuZiOTAsqIvZKiPe40PY",
  authDomain: "resume-builder-97.firebaseapp.com",
  projectId: "resume-builder-97",
  storageBucket: "resume-builder-97.appspot.com",
  messagingSenderId: "816529590570",
  appId: "1:816529590570:web:9c1aa2d43c0ddf9946f653"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);