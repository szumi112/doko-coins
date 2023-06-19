import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDUtt1XsM5MDdhuu4J0FfUnWB4zn8hQ7a4",
  authDomain: "the-standard-7f64a.firebaseapp.com",
  projectId: "the-standard-7f64a",
  storageBucket: "the-standard-7f64a.appspot.com",
  messagingSenderId: "846112186374",
  appId: "1:846112186374:web:f46c186cbcfbc7ec466387",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
