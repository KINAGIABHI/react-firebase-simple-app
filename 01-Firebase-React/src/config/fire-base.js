// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

//to get the authentication function from the firebase we need to import getAuth function
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

//for storage purposes we need to import from the Firestore.
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyClKL8L8DyouYloY8PE3KptewWsRuyPvws",
  authDomain: "fir-react-6a49e.firebaseapp.com",
  projectId: "fir-react-6a49e",
  storageBucket: "fir-react-6a49e.appspot.com",
  messagingSenderId: "882416237416",
  appId: "1:882416237416:web:90506ec07d1024daa374dd",
  measurementId: "G-42MYJEHCT5",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);

export const storage = getStorage(app);
