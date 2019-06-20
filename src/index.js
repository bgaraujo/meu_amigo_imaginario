import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import * as firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyBPBZz57ELPfhhLWGby5eADjCDZb5Fz_-E",
    authDomain: "meu-amigo-imaginario.firebaseapp.com",
    databaseURL: "https://meu-amigo-imaginario.firebaseio.com",
    projectId: "meu-amigo-imaginario",
    storageBucket: "meu-amigo-imaginario.appspot.com",
    messagingSenderId: "417452459490",
    appId: "1:417452459490:web:04aceeb3f4efd469"
};

firebase.initializeApp(firebaseConfig);

ReactDOM.render(<App firebase={firebase} />, document.getElementById('root'));

serviceWorker.unregister();
