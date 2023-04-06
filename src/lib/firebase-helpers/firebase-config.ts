// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAgWFIU-NGMUV5wARG7vSRjhrL4psi_icA",
    authDomain: "personal-36b0f.firebaseapp.com",
    databaseURL: "https://personal-36b0f-default-rtdb.firebaseio.com",
    projectId: "personal-36b0f",
    storageBucket: "personal-36b0f.appspot.com",
    messagingSenderId: "1026764985171",
    appId: "1:1026764985171:web:49f31124048213714d47a6",
    measurementId: "G-LR5NP550VH"
  };

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getDatabase();