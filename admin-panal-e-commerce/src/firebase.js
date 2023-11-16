import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyBbkMpEPlP7tusrjqdrsvXd94JnFE388Pg",
    authDomain: "e-commerce-dbddf.firebaseapp.com",
    projectId: "e-commerce-dbddf",
    storageBucket: "e-commerce-dbddf.appspot.com",
    messagingSenderId: "206182569733",
    appId: "1:206182569733:web:832f72ac721ea2f50cc96c",
    measurementId: "G-3PFQQ44Z2X"  
};


export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app);