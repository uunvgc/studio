
import {initializeApp, getApp, getApps, type FirebaseApp} from 'firebase/app';
import { getAnalytics } from "firebase/analytics";
import { getAuth, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';
import { getFunctions, type Functions } from 'firebase/functions';


import {
  useAuth,
  useFirebase,
  useFirebaseApp,
  useFirestore,
} from './provider';

function initializeFirebase(): { app: FirebaseApp; firestore: Firestore; auth: Auth; functions: Functions; } {
    const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
    if (!apiKey) {
      throw new Error("Firebase API key is missing. Make sure NEXT_PUBLIC_FIREBASE_API_KEY is set in your environment.");
    }

    const firebaseConfig = {
      apiKey,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
      messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
      measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID!,
    };
    
    const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    const firestore = getFirestore(app);
    const auth = getAuth(app);
    const functions = getFunctions(app);

    if (typeof window !== "undefined") {
      try {
        getAnalytics(app);
      } catch (error) {
        console.log("Couldn't initialize Analytics", error);
      }
    }

    return {app, firestore, auth, functions };
}

export {
  initializeFirebase,
  useAuth,
  useFirebase,
  useFirebaseApp,
  useFirestore,
};
export * from './provider';
