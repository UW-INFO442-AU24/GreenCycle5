import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';

import { initializeApp } from "firebase/app";
// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAhzuQJTgxibJ5z-FsMcPotRZvu2aXf5Hc",
  authDomain: "greencycle-99908.firebaseapp.com",
  projectId: "greencycle-99908",
  storageBucket: "greencycle-99908.firebasestorage.app",
  messagingSenderId: "717198798310",
  appId: "1:717198798310:web:4af0b268d279da917c3a27"
};

// Initializing Firebase
const app = initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
