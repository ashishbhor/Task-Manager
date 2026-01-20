import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBKmwioOqsErmuhT1gG7wgY1STSmKntXqU",
    authDomain: "task-manager-7a93b.firebaseapp.com",
    projectId: "task-manager-7a93b",
    storageBucket: "task-manager-7a93b.firebasestorage.app",
    messagingSenderId: "189567559680",
    appId: "1:189567559680:web:74b1a7dce09f03e65f50e5"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
