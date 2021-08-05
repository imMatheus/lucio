import React, { createContext, useContext, useState, useEffect } from 'react'
import firebase from 'firebase/app'
import { auth, fs } from '../firebase'
import User from '../types/User'

async function signup(
    email: string,
    password: string,
    displayName: string,
    imageUrl: string | ArrayBuffer
) {
    const usersNamesRef = fs.collection('users').where('displayName', '==', displayName)
    const doc: firebase.firestore.DocumentData = await usersNamesRef.get()
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
    } catch (error: any) {
        return error.message
    }
}
interface Context {
    currentUser: User | null
    logout: () => Promise<void>
    login: (email: string, password: string) => Promise<firebase.auth.UserCredential>
    signup: (
        email: string,
        password: string,
        displayName: string,
        imageUrl: string | ArrayBuffer
    ) => Promise<unknown>
    resetPassword: (email: string) => Promise<unknown>
}

const AuthContext = createContext<Context>({
    currentUser: null,
    logout,
    login,
    signup,
    resetPassword,
})

export function useAuth() {
    return useContext(AuthContext)
}

export const AuthProvider: React.FC = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null)

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            const fetchUser = async (user: firebase.User | any) => {
                if (!user) return null
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

    const value = {
        currentUser,
        logout,
        login,
        signup,
        resetPassword,
    }
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
