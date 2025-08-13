import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./constants";

console.log(firebaseConfig);

const app = initializeApp(firebaseConfig);