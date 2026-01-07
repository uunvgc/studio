
'use client';

import {useEffect, useState} from 'react';
import type {Auth} from 'firebase/auth';
import type {FirebaseApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {getFirestore, type Firestore} from 'firebase/firestore';
import { getFunctions, type Functions } from 'firebase/functions';

import {FirebaseProvider} from './provider';
import {initializeFirebase} from '.';

type Props = {
  children: React.ReactNode;
};

export function FirebaseClientProvider({children}: Props) {
  const [firebaseApp, setFirebaseApp] = useState<FirebaseApp | null>(null);
  const [firestore, setFirestore] = useState<Firestore | null>(null);
  const [auth, setAuth] = useState<Auth | null>(null);
  const [functions, setFunctions] = useState<Functions | null>(null);

  useEffect(() => {
    try {
      const {app} = initializeFirebase();
      const db = getFirestore(app);
      const auth = getAuth(app);
      const functions = getFunctions(app);
      setFirebaseApp(app);
      setFirestore(db);
      setAuth(auth);
      setFunctions(functions);
    } catch (error) {
        if (error instanceof Error) {
            // The error from initializeFirebase is already descriptive
            console.error(error.message);
        } else {
            console.error("An unknown error occurred during Firebase initialization.");
        }
    }
  }, []);

  return (
    <FirebaseProvider app={firebaseApp} firestore={firestore} auth={auth} functions={functions}>
      {children}
    </FirebaseProvider>
  );
}
