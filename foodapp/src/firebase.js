// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCLOjO48-1YyaRypRbpYe1RgDZxN-YTPaQ",
  authDomain: "foodapp-3e945.firebaseapp.com",
  databaseURL: "https://foodapp-3e945-default-rtdb.firebaseio.com",
  projectId: "foodapp-3e945",
  storageBucket: "foodapp-3e945.firebasestorage.app",
  messagingSenderId: "427446275791",
  appId: "1:427446275791:web:9400c23146d51fafd771ba",
  measurementId: "G-MZ1ZTS1ZHX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default getFirestore();