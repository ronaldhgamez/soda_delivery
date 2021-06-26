import firebase from 'firebase/app';
import "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyB7hoc1Fu0Dh1VIPEW297zqGnPrWRI3kpU",
    authDomain: "sodas-db-nodejs.firebaseapp.com",
    databaseURL: "https://sodas-db-nodejs-default-rtdb.firebaseio.com",
    projectId: "sodas-db-nodejs",
    storageBucket: "sodas-db-nodejs.appspot.com",
    messagingSenderId: "355260340354",
    appId: "1:355260340354:web:830ab3eacff01ffa563c9b"
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export {storage,firebase as default};