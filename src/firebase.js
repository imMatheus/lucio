import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
// import 'firebase/firestore'
import 'firebase/firestore'

const app = firebase.initializeApp({
    apiKey: 'AIzaSyCT_kJrMPZg_ezIMOqh9nx84KIFmcPLLHw',
    authDomain: 'testingfortest-14f68.firebaseapp.com',
    databaseURL: 'https://testingfortest-14f68-default-rtdb.europe-west1.firebasedatabase.app',
    projectId: 'testingfortest-14f68',
    storageBucket: 'testingfortest-14f68.appspot.com',
    messagingSenderId: '733916222574',
    appId: '1:733916222574:web:161ce7ac1e5c82ac45827f',
    measurementId: 'G-9519YE24PJ',
})

export const fs = firebase.firestore()
export const auth = app.auth()
export const db = app.database()

export default app
// apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
// databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
// authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
// projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
// storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
// messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
// appId: process.env.REACT_APP_FIREBASE_APP_ID,
// measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
