import React, { createContext, useContext, useState, useEffect, useRef } from 'react'
import firebase from 'firebase/app'
import { auth, fs } from '../firebase'
import User from '../types/User'
const AuthContext = createContext(null)

export function useAuth() {
    return useContext(AuthContext)
}

export const AuthProvider: React.FC = ({ children }) => {
    const renders = useRef(0)
    console.log(++renders.current)
    const [currentUser, setCurrentUser] = useState<User | null>(null)

    async function signup(email: string, password: string, displayName: string, imageUrl: string) {
        const usersNamesRef = fs.collection('users').where('displayName', '==', displayName)
        const doc: firebase.firestore.DocumentData | any = await usersNamesRef.get()
        if (doc.exists) {
            // checking if the display name already exist
            const error = { message: 'Display name already exist' }
            return error
        }
        try {
            await auth.createUserWithEmailAndPassword(email, password)

            await fs // firestore
                .collection('users')
                .doc(auth.currentUser?.uid) // adding a doc with the the id of the users uid
                .set({
                    displayName: displayName,
                    email: email,
                    userUID: auth.currentUser?.uid,
                    profileImage: imageUrl,
                }) // setting its info
        } catch (error) {
            return error
        }
    }
    function login(email: string, password: string): Promise<firebase.auth.UserCredential> {
        return auth.signInWithEmailAndPassword(email, password)
    }
    function logout() {
        sessionStorage.clear()
        return auth.signOut()
    }
    async function resetPassword(email: string) {
        try {
            await auth.sendPasswordResetEmail(email)
        } catch (error) {
            return error
        }
    }
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            const fetchUser = async (user: firebase.User | any) => {
                if (!user) return
                // getting the users data from firestore
                const response = fs.collection('users').doc(user.uid)
                const data = await response.get()
                return { ...user, ...data.data() }
            }
            const response = await fetchUser(user)

            setCurrentUser(response)
        })
        return unsubscribe
    }, [])

    const value: any = {
        currentUser,
        logout,
        login,
        signup,
        resetPassword,
    }
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
