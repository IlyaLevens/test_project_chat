import React from 'react'
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.scss';
import reportWebVitals from './reportWebVitals';
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import store from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { persistor } from './redux/store';

firebase.initializeApp({
  apiKey: "AIzaSyDaNlF0OLG02wD7qlh2j9FFp20tk6PBnlE",
  authDomain: "react-chat-b8e74.firebaseapp.com",
  projectId: "react-chat-b8e74",
  storageBucket: "react-chat-b8e74.appspot.com",
  messagingSenderId: "384198102434",
  appId: "1:384198102434:web:4b69512da44bb00444b6fb",
  measurementId: "G-0JJVEXWMZC"
});

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const element = document.getElementById('root')!;
const root = ReactDOM.createRoot(element);
root.render(
  
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>    
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
