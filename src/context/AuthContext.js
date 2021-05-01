import React, { useContext, useState, useEffect } from 'react'
import { auth, fs } from '../firebase'
const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}
export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    async function signup(email, password, displayName, imageUrl) {
        try {
            await auth.createUserWithEmailAndPassword(email, password)
        } catch (error) {
            console.log('error', error)
            return error
        }
        console.log(auth.currentUser)

        console.log(auth.currentUser.uid)
        console.log(displayName)

        const snapshot = await fs.collection('users').get()
        snapshot.forEach((doc) => {
            console.log(doc.id, '=>', doc.data())
        })

        await fs // firestore
            .collection('users')
            .doc(auth.currentUser.uid) // adding a doc with the the id of the users uid
            .set({ displayName: displayName, email: email, userUID: auth.currentUser.uid }) // setting its info
        // .set({ displayName: displayName, profileImage: imageUrl }) // setting its info
    }
    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password)
    }
    function logout() {
        return auth.signOut()
    }
    function resetPassword(email) {
        return auth.sendPasswordResetEmail(email)
    }
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setCurrentUser(user)
            setLoading(false)
        })
        return unsubscribe
    }, [])
    const value = {
        currentUser,
        logout,
        login,
        signup,
        resetPassword,
    }
    return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>
}
