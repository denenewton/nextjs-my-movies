import { FirebaseApp, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { Firestore, getFirestore } from "firebase/firestore";
import { FirebaseStorage, getStorage } from "firebase/storage";

var app: FirebaseApp, db: Firestore, storage: FirebaseStorage;

export const firebaseConfig = {
  apiKey: "AIzaSyBQhZ7-rnUxVXLodqcnIc2ps912rzuS4PY",
  authDomain: "movies-db-de1e4.firebaseapp.com",
  projectId: "movies-db-de1e4",
  storageBucket: "movies-db-de1e4.appspot.com",
  messagingSenderId: "309539875407",
  appId: "1:309539875407:web:b342a83da1ab4a5083d83a",
  measurementId: "G-RY4GTQR46F"
  // apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY_ID,
  // authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  // projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  // storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  // messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  // appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  // measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};


if (typeof window !== "undefined") {
  app = initializeApp(firebaseConfig);
  storage = getStorage(app);
  db = getFirestore(app);
  getAnalytics(app);
}

if (process.env.FIREBASE_CLIENT_EMAIL) {
  const app = initializeApp(firebaseConfig);
}

export { db, storage };
