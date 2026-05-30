import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyAdKBZVdeZb-jFDebBlOyEwJMgLhRd9Jjo",  
  authDomain: "tauha-qr-code.firebaseapp.com",
  projectId: "tauha-qr-code",
  storageBucket: "tauha-qr-code.firebasestorage.app",
  messagingSenderId: "523948330331",
  appId: "1:523948330331:web:110135781a707c0fea1e7e",
  measurementId: "G-CKM9WF39NG",
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)

