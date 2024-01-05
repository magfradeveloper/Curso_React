import firebase from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAFQMm068WdZGs39SPN9rTLSZl6gLWgHL4",
  authDomain: "negocios-339f0.firebaseapp.com",
  databaseURL: "https://negocios-339f0.firebaseio.com",
  projectId: "negocios-339f0",
  storageBucket: "negocios-339f0.appspot.com",
  messagingSenderId: "194638065010",
  appId: "1:194638065010:web:ebcf9a60e7fa4ed93c81eb",
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);
