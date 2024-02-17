// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import firebaseConfig from "../config/firebase.config";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';

import {
  doc,
  getDoc,
  getDocs,
  setDoc,
  collection,
  where,
  writeBatch,
  query,
  getFirestore,
  startAfter,
  endBefore,
  limitToLast,
  orderBy,
  limit,
  getCountFromServer,
} from 'firebase/firestore';

import { ref, getStorage, uploadBytes, getDownloadURL } from "firebase/storage"

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore()

export const uploadImage = async (image) => {
  if (!image) return
  try {
    const storage = getStorage(app)
    const imageRef = ref(storage, `image/${image.name}`)
    await uploadBytes(imageRef, image)
  } catch (error) {
    console.log(error.code);
  }
}

export const getImageURL = async (image) => {
  if (!image) return
  try {
    const storage = getStorage(app)
    const imageRef = ref(storage, `image/${image.name}`)
    const imageURL = await getDownloadURL(imageRef)

    return imageURL
  } catch (error) {
    switch (error.code) {
      case 'storage/object-not-found':
        console.error("File doesn't exist")
        break;
      case 'storage/unauthorized':
        console.error("User doesn't have permission to access the object")
        break;
      case 'storage/canceled':
        console.error("User canceled the upload");
        break;
      case 'storage/unknown':
        console.error("Unknown error occurred, inspect the server response");
        break;
    }
  }
}

export const getCollectionByGenre = async (genre) => {
  try {
    const q = query(collection(db, "movies"), where("genre", "==", genre));
    const data = []
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      data.push(doc.data())
    });
    console.log('GENRE DARA',data);
    return data
  } catch (error) {
    console.log(error);
  }
}

export const addCollection = async (collectionKey, object) => {
  if (!collectionKey || !object) return
  try {
    const batch = writeBatch(db);

    const collectionRef = collection(db, collectionKey);
    const docRef = doc(collectionRef, object.title.toLowerCase());

    batch.set(docRef, object);

    await batch.commit();
    console.log("done");
  } catch (error) {

  }
};


export const getOneDocument = async (collectionKey, docName) => {
  const docRef = doc(db, collectionKey, docName);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data()
  } else {
    console.log("No such document!");
    return null
  }
}

export const allCollectios = async (docName) => {
  const querySnapshot = await getDocs(collection(db, docName));
  const data = []
  querySnapshot.forEach((doc) => {
    data.push(doc.data())
  });

  console.log(data);
  return data
}

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: 'select_account',
});

export const auth = getAuth();

export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);



export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;

  const userDocRef = doc(db, 'users', userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email, photoURL } = userAuth;
    const createdAt = new Date();
    const authorized = false;
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        photoURL,
        authorized,
        ...additionalInformation,
      });
    } catch (error) {
      console.log('error creating the user', error.message);
    }
  }
  return userDocRef;
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);


///////////PAGINATION WITH FIREBASE//////////////////////////////////////////
//TO RETURN THE NUMBER OF PAGES THAT YOU GOT FORM DE SERVER
export const getNumPages = async (collectionName, numPerPages) => {
  const dataCollection = collection(db, collectionName)
  const count = await getCountFromServer(dataCollection)
  const numPages = count.data().count / numPerPages //Math.ciel(count.data().count / numPerPages)
  return numPages
}

///////////FUNCITON TO PAGINATE///////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
export const getPaginatedData = async (
  collectionS, // Name of the collection
  orderByProp, // Property to order by
  direction, //'next' | 'prev' | undefined,
  startAfterDoc,  //DocumentSnapshot,
  endBeforeDoc, //DocumentSnapshot,
  numPerPage    //number limit
) => {
  const dataCollection = collection(db, collectionS);

  // Define the initial data query with ordering and limit
  let dataQuery = query(dataCollection, orderBy(orderByProp), limit(numPerPage));

  // Update query based on direction and provided documents
  if (direction === 'next' && startAfterDoc) {
    // For next direction, start after the provided document
    dataQuery = query(dataQuery, startAfter(startAfterDoc));
  } else if (direction === 'prev' && endBeforeDoc) {
    // For previous direction, end before the provided document and limit to last
    dataQuery = query(
      dataCollection,
      orderBy(orderByProp),
      endBefore(endBeforeDoc),
      limitToLast(numPerPage)
    );
  }

  // Get snapshot of documents based on the final query
  const productsSnapshot = await getDocs(dataQuery);
  // Extract data from each document and map to an array of objects
  const products = productsSnapshot.docs.map((doc) => doc.data());

  // Return an object retrieved products, and first and last documents
  return {
    result: products, // Cast products to an array of Product objects
    lastDoc: productsSnapshot.docs[productsSnapshot.docs.length - 1],
    firstDoc: productsSnapshot.docs[0],
  };
};