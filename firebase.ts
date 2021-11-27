// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: 'nextagram-6c419.firebaseapp.com',
  projectId: 'nextagram-6c419',
  storageBucket: 'nextagram-6c419.appspot.com',
  messagingSenderId: '412692676828',
  appId: '1:412692676828:web:2cf4f2adf8d056cb927419',
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp(); // ? 하나의 인스턴스만 존재하게 설정
const db = getFirestore();
const storage = getStorage();

export { app, db, storage };
