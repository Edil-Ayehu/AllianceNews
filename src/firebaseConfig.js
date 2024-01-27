// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDCwOUEv4XGvGMSu0mn8hujh44rUmDd5yU",
  authDomain: "genius-eth.firebaseapp.com",
  databaseURL: "https://genius-eth-default-rtdb.firebaseio.com",
  projectId: "genius-eth",
  storageBucket: "genius-eth.appspot.com",
  messagingSenderId: "502967306119",
  appId: "1:502967306119:web:94dd070d4f6cdc7d213522",
  measurementId: "G-6DZQYV8KFQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
