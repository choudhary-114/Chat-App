import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBrZaTpIYYzRDZJjq-ApCyeOgSzOtdOLPY",
  authDomain: "zylochat.firebaseapp.com",
  projectId: "zylochat",
  storageBucket: "zylochat.appspot.com",
  messagingSenderId: "743823095259",
  appId: "1:743823095259:web:792eb2dac37835d26163fe",
  measurementId: "G-FRSPC9LCR5"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

export { auth };
