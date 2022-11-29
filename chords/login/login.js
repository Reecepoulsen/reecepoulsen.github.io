import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js';
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js';
// import { getFirestore, collection, getDocs, getDoc } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js';

const firebaseApp = initializeApp({
    apiKey: "AIzaSyBGnCGjYp2uXMIeaXWnyUA9nMZhTobUFEA",
    authDomain: "chords-login.firebaseapp.com",
    projectId: "chords-login",
    storageBucket: "chords-login.appspot.com",
    messagingSenderId: "603992297587",
    appId: "1:603992297587:web:67d0a937f020fe94591a06",
    measurementId: "G-FB78SBXQMP"
});

const auth = getAuth(firebaseApp);
let email = null;
let password = null;

// Create a new user
createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const user = userCredential.user;
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
    });

// Sign in existing users
signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const user = userCredential.user;
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
    });

// Set an authentication state observer and get user data
onAuthStateChanged(auth, (user) => {
    if (user) {
        // user is signed in
        const uid = user.uid;
        console.log("User logged in!", uid);
    } else{
        // user is signed out
        console.log("User signed out")
    }
});



document.getElementById("login-btn").addEventListener("click", (event) => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    createUserWithEmailAndPassword(auth, email, password);
    event.preventDefault();
});

document.getElementById("logout-btn").addEventListener("click", (event) => {
    signOut(auth).then(() => {
        console.log("logout successful")
    }).catch((error) => {
        console.log(error.code, error.message);
    })
})
