import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
// import 'firebase/firestore'
import 'firebase/firestore'

const app = firebase.initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
})

export const fs = firebase.firestore()
export const auth = app.auth()
export const db = app.database()
// export const signUpWithGoogle = async (e) => {
//     e.preventDefault()
//     const provider = new firebase.auth.GoogleAuthProvider()
//     auth.signInWithPopup(provider).catch((error) => {
//         alert(error.message)
//     })
//     const user = auth.currentUser
//     await fs // firestore
//         .collection('users')
//         .doc(auth.currentUser.uid) // adding a doc with the the id of the users uid
//         .set({
//             displayName: user.displayName,
//             email: user.email,
//             userUID: user.uid,
//             profileImage: user.photoUrl,
//         }) // setting its info
// }
export default app
