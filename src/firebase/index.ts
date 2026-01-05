import {initializeApp, getApp, getApps, type FirebaseOptions} from 'firebase/app';

import {firebaseConfig as baseConfig} from './config';
import {
  useAuth,
  useFirebase,
  useFirebaseApp,
  useFirestore,
} from './provider';

function initializeFirebase(apiKey?: string) {
  const firebaseConfig: FirebaseOptions = {
    ...baseConfig,
    apiKey: apiKey || process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  };

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
