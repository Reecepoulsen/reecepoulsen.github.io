import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js';
import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.0.2/firebase-auth.js';
import { getFirestore, collection, getDocs } from 'https://www.gstatic.com/firebasejs/9.0.2/firebase-firestore.js';

const firebaseApp = initializeApp({
    apiKey: "AIzaSyBGnCGjYp2uXMIeaXWnyUA9nMZhTobUFEA",
    authDomain: "chords-login.firebaseapp.com",
    projectId: "chords-login",
    storageBucket: "chords-login.appspot.com",
    messagingSenderId: "603992297587",
    appId: "1:603992297587:web:9ab8643648ee47d5591a06",
    measurementId: "G-2V0D8PQL17"
});
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);
const todosCol = collection(db, 'todos');
const snapshot = await getDocs(todosCol);

// Detect auth state
onAuthStateChanged(auth, user => {
    if(user != null){
        console.log('logged in!');
    }
    else {
        console.log("No user");
    }
});
