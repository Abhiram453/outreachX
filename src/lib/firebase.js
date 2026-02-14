import { initializeApp, getApps } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB18Ktu4Lm2XDv_PIG5eCyqcFKtStAFWLY",
  authDomain: "outreachx-5dff2.firebaseapp.com",
  projectId: "outreachx-5dff2",
  storageBucket: "outreachx-5dff2.firebasestorage.app",
  messagingSenderId: "597161469401",
  appId: "1:597161469401:web:67c60d5ec485cc5c3025c8",
  measurementId: "G-SBKK310XY5"
};

// Initialize Firebase only if it hasn't been initialized
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);

// Providers
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };
