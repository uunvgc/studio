'use client';

import {useEffect, useState} from 'react';
import type {Auth} from 'firebase/auth';
import type {FirebaseApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {getFirestore, type Firestore} from 'firebase/firestore';

import {FirebaseProvider} from './provider';
import {initializeFirebase} from '.';

type Props = {
  children: React.ReactNode;
};

export function FirebaseClientProvider({children}: Props) {
  const [firebaseApp, setFirebaseApp] = useState<FirebaseApp | null>(null);
  const [firestore, setFirestore] = useState<Firestore | null>(null);
  const [auth, setAuth] = useState<Auth | null>(null);

  useEffect(() => {
    // Correctly initialize Firebase on the client with the API key from the environment.
    const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
    if (!apiKey) {
      console.error("Firebase API key is missing. Make sure NEXT_PUBLIC_FIREBASE_API_KEY is set.");
      return;
    }

    const {app} = initializeFirebase(apiKey);
    const db = getFirestore(app);
    const auth = getAuth(app);
    setFirebaseApp(app);
    setFirestore(db);
    setAuth(auth);
  }, []);

  return (
    <FirebaseProvider app={firebaseApp} firestore={firestore} auth={auth}>
      {children}
    </FirebaseProvider>
  );
}
