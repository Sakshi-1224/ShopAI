import {getAuth, GoogleAuthProvider} from "firebase/auth"
import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyATo4yJ2CQIxEChJdWHyGUoY1QyXwWWBPA",
  authDomain: "loginshopai.firebaseapp.com",
  projectId: "loginshopai",
  storageBucket: "loginshopai.firebasestorage.app",
  messagingSenderId: "1004781059076",
  appId: "1:1004781059076:web:30c250c0481082726a4951"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider()


export {auth , provider}

