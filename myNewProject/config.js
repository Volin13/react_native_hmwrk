import { initializeApp } from 'firebase/app';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
const firebaseConfig = {
  apiKey: 'AIzaSyBetQ9JLBG8AcA7EFmBUcj4OekbFVkDqZY',
  authDomain: 'nativegoithmwrk.firebaseapp.com',
  databaseURL:
    'https://nativegoithmwrk-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'nativegoithmwrk',
  storageBucket: 'nativegoithmwrk.appspot.com',
  messagingSenderId: '179854167179',
  appId: '1:179854167179:web:adb796c3b2b19171e7988e',
  measurementId: 'G-DF0Z2KDE80',
};

const app = initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

export { app, auth, db, storage };
