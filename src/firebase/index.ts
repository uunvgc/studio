
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
    const authDomain = process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN;
    const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
    const storageBucket = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET;
    const messagingSenderId = process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID;
    const appId = process.env.NEXT_PUBLIC_FIREBASE_APP_ID;
    
    if (!apiKey || !authDomain || !projectId || !storageBucket || !messagingSenderId || !appId) {
      throw new Error("One or more Firebase environment variables are missing. Please check your configuration.");
    }

    const firebaseConfig = {
      apiKey,
      authDomain,
      projectId,
      storageBucket,
      messagingSenderId,
      appId,
      measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
    };
    
    const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    const firestore = getFirestore(app);
    const auth = getAuth(app);
    const functions = getFunctions(app);

    if (typeof window !== "undefined" && firebaseConfig.measurementId) {
      try {
        getAnalytics(app);
      } catch (error) {
        console.warn("Could not initialize Firebase Analytics:", error);
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
