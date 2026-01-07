
import {initializeApp, getApp, getApps, type FirebaseOptions} from 'firebase/app';

import {firebaseConfig as baseConfig} from './config';
import {
  useAuth,
  useFirebase,
  useFirebaseApp,
  useFirestore,
} from './provider';

function initializeFirebase() {
  const firebaseConfig: FirebaseOptions = {
    ...baseConfig,
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  };

  if (!firebaseConfig.apiKey) {
    throw new Error('Firebase API key is missing. Make sure NEXT_PUBLIC_FIREBASE_API_KEY is set in your environment.');
  }

  const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
  return {app};
}

export {
  initializeFirebase,
  useAuth,
  useFirebase,
  useFirebaseApp,
  useFirestore,
};
export * from './provider';
