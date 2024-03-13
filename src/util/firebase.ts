const firebase = require('firebase');

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBjPh91wtB3E_94VUr_AIKlt0efYM1Sz3M",
  authDomain: "nodefirebaseapi-demo.firebaseapp.com",
  projectId: "nodefirebaseapi-demo",
  storageBucket: "nodefirebaseapi-demo.appspot.com",
  messagingSenderId: "43097487275",
  appId: "1:43097487275:web:5baf6b5730b16ee58984ee"
};
firebase.initializeApp(firebaseConfig); //initialize firebase app 
module.exports = { firebase }; //export the app