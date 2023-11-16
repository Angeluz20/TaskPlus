
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBLFFo9W_Vy7AexBoQzuW5moo1jpSMnhOY",
  authDomain: "taskplus-c6d03.firebaseapp.com",
  projectId: "taskplus-c6d03",
  storageBucket: "taskplus-c6d03.appspot.com",
  messagingSenderId: "419004826994",
  appId: "1:419004826994:web:cd003c7f8aa77db58609eb"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);

export {db};