// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
const { getFirestore } = require("firebase/firestore");
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBoz7Y2uc30cWNuvZiG2DPyEgT8NZG768k",
  authDomain: "dincuytech.firebaseapp.com",
  projectId: "dincuytech",
  storageBucket: "dincuytech.appspot.com",
  messagingSenderId: "637097204346",
  appId: "1:637097204346:web:d83f748f34bd838d38f9c3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

module.exports = { app, db };
