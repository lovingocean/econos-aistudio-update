import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { getFirestore, doc, getDocFromServer } from 'firebase/firestore';
import rawConfig from '../../firebase-applet-config.json';

const apiKey = import.meta.env.VITE_FIREBASE_API_KEY || rawConfig.apiKey || '';

const firebaseConfig = {
  ...rawConfig,
  apiKey
};

const app = !getApps().length && apiKey ? initializeApp(firebaseConfig) : (getApps().length ? getApp() : null);
export const auth = app ? getAuth(app) : ({} as any);
export const db = app ? getFirestore(app, firebaseConfig.firestoreDatabaseId || '(default)') : ({} as any);
export const googleProvider = new GoogleAuthProvider();

// Connection test as required by skill
export async function testFirestoreConnection() {
  if (!app) return;
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn('[Firebase] Client is offline or Firestore initialization pending.');
    }
  }
}

if (app) {
  testFirestoreConnection();
}

export { signInWithPopup, signOut, onAuthStateChanged };
export type { FirebaseUser };
