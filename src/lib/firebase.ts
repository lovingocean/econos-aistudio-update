import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup as fbSignInWithPopup, signOut, onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { getFirestore, doc, getDocFromServer } from 'firebase/firestore';

const apiKey = (import.meta.env.VITE_FIREBASE_API_KEY as string | undefined)?.trim() || '';

const firebaseConfig = {
  projectId: (import.meta.env.VITE_FIREBASE_PROJECT_ID as string) || 'avian-upgrade-4v9wh',
  appId: (import.meta.env.VITE_FIREBASE_APP_ID as string) || '1:483785758203:web:418eb1a8c12118b9a4a75e',
  apiKey,
  authDomain: (import.meta.env.VITE_FIREBASE_AUTH_DOMAIN as string) || 'avian-upgrade-4v9wh.firebaseapp.com',
  firestoreDatabaseId: (import.meta.env.VITE_FIREBASE_DATABASE_ID as string) || 'ai-studio-econos-5816b8ff-6939-4adf-918b-a85213961468',
  storageBucket: (import.meta.env.VITE_FIREBASE_STORAGE_BUCKET as string) || 'avian-upgrade-4v9wh.firebasestorage.app',
  messagingSenderId: (import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID as string) || '483785758203'
};

const app: FirebaseApp | null = (!getApps().length && apiKey) 
  ? initializeApp(firebaseConfig) 
  : (getApps().length ? getApp() : null);

export const isFirebaseConfigured = Boolean(app && apiKey);
export const auth = app ? getAuth(app) : ({} as any);
export const db = app ? getFirestore(app, firebaseConfig.firestoreDatabaseId || '(default)') : ({} as any);
export const googleProvider = new GoogleAuthProvider();

export async function signInWithPopup(authInstance: any, provider: any) {
  if (!isFirebaseConfigured || !app) {
    throw new Error('Firebase authentication is not configured in this deployment. Please set VITE_FIREBASE_API_KEY in your environment variables, or sign in using your Sovereign Admin credentials.');
  }
  return fbSignInWithPopup(authInstance, provider);
}

// Connection test as required by skill
export async function testFirestoreConnection() {
  if (!app || !isFirebaseConfigured) return;
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn('[Firebase] Client is offline or Firestore initialization pending.');
    }
  }
}

if (app && isFirebaseConfigured) {
  testFirestoreConnection();
}

export { signOut, onAuthStateChanged };
export type { FirebaseUser };
