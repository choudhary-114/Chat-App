import firebase from "firebase/compat/app";
import "firebase/compat/auth";

// Initialize Firebase
firebase.initializeApp({
        apiKey: "AIzaSyDyZZmsR2EIkKBVX2ZCJnMHiKSQbvNIpIc",
        authDomain: "unichat-d949e.firebaseapp.com",
        projectId: "unichat-d949e",
        storageBucket: "unichat-d949e.appspot.com",
        messagingSenderId: "386804452146",
        appId: "1:386804452146:web:d372a15dd90cce02a4a52b"
});

// Access auth object
export const auth = firebase.auth();
