
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyDjUBaUI3-IDhpAVDxRXQrLl_mJOytebNc",
    authDomain: "mypolekemon.firebaseapp.com",
    projectId: "mypolekemon",
    storageBucket: "mypolekemon.firebasestorage.app",
    messagingSenderId: "753028219477",
    appId: "1:753028219477:web:34ae862e60f3cd2be74adc",
    measurementId: "G-WYGM819N0K"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
