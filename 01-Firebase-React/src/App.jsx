import { useEffect, useState } from "react";
import "./App.css";
import { Auth } from "./auth";
import { db, auth, storage } from "./config/fire-base";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";

import { ref, uploadBytes } from "firebase/storage";

function App() {
  const [movieList, setMovieList] = useState([]);
  const moviesCollectionRef = collection(db, "movies");

  //for sending the data to backend server we create states
  const [newMovieTitle, setNewMovieTitle] = useState("");
  const [newReleaseDate, setnewReleaseDate] = useState(0);
  const [isNewMovieOscar, setIsNewMovieOscar] = useState(false);

  //update new movie title
  const [updatedTitle, setUpdatedTitle] = useState("");

  //for upploading the file
  const [fileUpload, setFileUpload] = useState(null);

  const getMovieList = async () => {
    try {
      const data = await getDocs(moviesCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setMovieList(filteredData);
    } catch (error) {
      console.error("Error getting documents: ", error);
    }
  };

  useEffect(() => {
    getMovieList();
  }, []);

  const onSubmitMovie = async () => {
    try {
      await addDoc(moviesCollectionRef, {
        Title: newMovieTitle,
        ReleaseDate: newReleaseDate,
        recievedOscar: isNewMovieOscar,
        userId: auth?.currentUser?.uid,
      });
      getMovieList();
    } catch (error) {
      console.error("Error adding new movie: ", error);
    }
  };

  const deleteMovie = async (id) => {
    // console.log("deleteMovie");
    const movieDoc = doc(db, "movies", id);
    await deleteDoc(movieDoc);
    getMovieList();
  };

  //updating the movie list
  const updateMovieTitle = async (id) => {
    const movieDoc = doc(db, "movies", id);
    await updateDoc(movieDoc, { Title: updatedTitle });
    getMovieList();
  };

  //upload file
  const uploadFile = async () => {
    if (!fileUpload) return;
    const filesFolderRef = ref(storage, `projectFiles/${fileUpload.name}`);
    try {
      await uploadBytes(filesFolderRef, fileUpload);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      <Auth />
      <div>
        <input
          placeholder="Enter Movie Name"
          onChange={(e) => {
            setNewMovieTitle(e.target.value);
          }}
        />
        <input
          placeholder="Enter Movie Release Date"
          type="number"
          onChange={(e) => {
            setnewReleaseDate(Number(e.target.value));
          }}
        />
        <input
          type="checkbox"
          checked={isNewMovieOscar}
          onChange={(e) => {
            setIsNewMovieOscar(e.target.checked);
          }}
        />{" "}
        <label>Recieved An Oscar..?</label>
        <button onClick={onSubmitMovie}>Submit data</button>
      </div>

      <div>
        {movieList.map((movie) => (
          <div>
            <h1 style={{ color: movie.recievedOscar ? "green" : "red" }}>
              {movie.Title}
            </h1>
            <p>Date : {movie.ReleaseDate}</p>
            <button onClick={() => deleteMovie(movie.id)}>Delete Movie</button>
            <br />
            <br />
            <input
              placeholder="enter new movie title"
              onChange={(e) => setUpdatedTitle(e.target.value)}
            />
            <button
              onClick={() => {
                updateMovieTitle(movie.id);
              }}
            >
              Update Title
            </button>
          </div>
        ))}
      </div>

      <div>
        <input type="file" onChange={(e) => setFileUpload(e.target.files)} />
        <button onClick={uploadFile}>Upload File </button>
      </div>
    </div>
  );
}
export default App;
