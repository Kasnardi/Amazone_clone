// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import { getAuth } from "firebase/auth";
import "firebase/compat/firestore";
import "firebase/compat/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyAxRl339UhK7qk5SqbwxRXYh7lqO0rwG-Q",
	authDomain: "e-clone-80d00.firebaseapp.com",
	projectId: "e-clone-80d00",
	storageBucket: "e-clone-80d00.appspot.com",
	messagingSenderId: "512646730798",
	appId: "1:512646730798:web:8231f320d8017e377e3bbf",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = app.firestore();
