import {initializeApp, getApp, getApps} from 'firebase/app';

import {firebaseConfig} from './config';
import {
  useAuth,
  useFirebase,
  useFirebaseApp,
  useFirestore,
} from './provider';

function initializeFirebase() {
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
