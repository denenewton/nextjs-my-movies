import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../config/firebaseConfig";
import { Movie } from "../components/RegisterMovies";
import { db } from "../config/firebaseConfig";
import {
  writeBatch,
  collection,
  doc,
  DocumentData,
  getDocs,
  getDoc,
  query,
  where,
} from "firebase/firestore";

export const upLoadImage = (data:any,setImageURL:(arg:string)=> void, setProgressImg:(arg:number) => void) => {
  const file = data?.file[0];
  const storageRef = ref(storage, `image/${file?.name}`);
  const uploadTask = uploadBytesResumable(storageRef, file);

  uploadTask.on(
    "state_changed",
    async (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setProgressImg(progress);
    },
    (error) => {
      alert(error);
      console.log(error);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL: any) => {
        setImageURL(downloadURL);
        const movie = {
          title: data.title,
          genre: data.genre,
          director: data.director,
          description: data.description,
          year: data.year,
          url: downloadURL,
        };
        addCollection("movies", movie);
      });
    }
  );
};

export const addCollection = async (collectionKey: string, object: Movie) => {
  try {
    const batch = writeBatch(db);

    const collectionRef = collection(db, collectionKey);
    const docRef = doc(collectionRef, object.title.toLowerCase());

    batch.set(docRef, object);
    await batch.commit();
    console.log("done");
  } catch (error) {
    console.error(error);
  }
};

export const getMoviesList = async () => {
  const q = query(collection(db, "movies"));
  const querySnapshot = await getDocs(q);
  const movies: DocumentData | any = [];

  querySnapshot.forEach((doc) => {
    movies.push(doc.data());
  });
  return movies;
};

export const getMovieDetails = async (title: any) => {
  console.log(title);

  try {
    const docRef = doc(db, "movies", title?.toLowerCase());
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) return docSnap.data();
    return null;
  } catch (error) {
    console.error(error);
  }
};

export const getMovieByGenre = async (genre: any) => {
  try {
    const docRef = collection(db, "movies");
   
    const q = query(docRef, where("genre", "==", genre.toString()));
    const movies = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      movies.push(doc.data());
      //console.log(doc.id, " => ", doc.data());
    });
    return movies;
  } catch (error) {
    console.error(error);
  }
};
