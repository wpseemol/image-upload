// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';

import { getApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyBf5co_vBk7habxTlZlUK-jyNI9rIb6W38',
    authDomain: 'file-upload-de4ca.firebaseapp.com',
    projectId: 'file-upload-de4ca',
    storageBucket: 'file-upload-de4ca.appspot.com',
    messagingSenderId: '409690408907',
    appId: '1:409690408907:web:a3915d13394e8fbc5c184e',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const firebaseApp = getApp();
export const storage = getStorage(
    firebaseApp,
    'gs://file-upload-de4ca.appspot.com'
);
