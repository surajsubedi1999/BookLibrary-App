import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDDnk6U4CjccQ3ZHraMCtFRsNHDMcfFOPQ",
  authDomain: "book-library-51f37.firebaseapp.com",
  databaseURL: "https://book-library-51f37-default-rtdb.firebaseio.com",
  projectId: "book-library-51f37",
  storageBucket: "book-library-51f37.firebasestorage.app",
  messagingSenderId: "522267680476",
  appId: "1:522267680476:web:4097f348e0b17fc1bade19"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export default app;