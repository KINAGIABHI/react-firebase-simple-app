import { useState } from "react";
import { app, auth, googleProvider } from "./config/fire-base";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
export const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //by adding ? in between we make sure that we are trying to get the email address of the user who is existing and we are not trying to get the email address of the user who is not valid.

  const signIn = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error(error);
    }
  };
  //   console.log(auth?.currentUser?.photoURL);
  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error(error);
    }
  };
  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <input
        placeholder="Enter Email"
        type="email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        placeholder="Enter Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={signIn}>Submit</button>
      <br />
      <button onClick={signInWithGoogle}>Submit with Google</button>
      <br />
      <button onClick={logout}>Logout Google</button>
    </div>
  );
};
