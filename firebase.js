// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.3/firebase-app.js";
import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    onSnapshot,
    deleteDoc,
    doc,
    getDoc,
    updateDoc,
} from "https://www.gstatic.com/firebasejs/9.6.3/firebase-firestore.js"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCPxHlZ588bo4Dr3gDalW9-sRiRWWKczl0",
    authDomain: "fir-javascript-crud-41012.firebaseapp.com",
    projectId: "fir-javascript-crud-41012",
    storageBucket: "fir-javascript-crud-41012.appspot.com",
    messagingSenderId: "749734909503",
    appId: "1:749734909503:web:f8af90d1a44c2df4fb0a8a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const saveTask = (title, description) =>
    addDoc(collection(db, 'tasks'), {title, description});

export const getTasks = () =>
    getDocs(collection(db, 'tasks'));

export const onTasksChange = (callback) =>
    onSnapshot(collection(db, 'tasks'), callback);

export const deleteTask = id =>
    deleteDoc(doc(db, 'tasks', id));

export const getTask = id =>
    getDoc(doc(db, 'tasks', id));

export const updateTask = (id, newFields) =>
    updateDoc(doc(db, 'tasks', id), newFields);
