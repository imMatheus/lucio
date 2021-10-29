import React, { createContext, useContext, useState, useEffect } from 'react'
import firebase from 'firebase/app'
import {
    where,
    query,
    getDocs,
    doc,
    getDoc,
    setDoc,
    collection,
    limit,
    DocumentData,
    DocumentSnapshot,
    QueryDocumentSnapshot,
} from 'firebase/firestore'
import {
    createUserWithEmailAndPassword,
    User as FirebaseUser,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    UserCredential,
} from 'firebase/auth'
import { auth, fs } from '@/firebase/index'
import User, { FirestoreUser } from '@/types/User'

async function signup(
    email: string,
    password: string,
    displayName: string,
    imageUrl: string | ArrayBuffer
) {
    const usersNamesRef = query(
        collection(fs, 'users'),
        where('displayName', '==', displayName),
        limit(1)
    )
    const document: DocumentData = await getDocs(usersNamesRef)
    if (document.exists) {
        // checking if the display name already exist
        const error = { message: 'Display name already exist' }
        return error
    }
    try {
        await createUserWithEmailAndPassword(auth, email, password)
        if (!auth.currentUser) return
        setDoc(doc(fs, 'users', auth.currentUser.uid), {
            displayName: displayName,
            email: email,
            userUID: auth.currentUser?.uid,
            profileImage: imageUrl,
        })
    } catch (error) {
        return error
    }
}

function login(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(auth, email, password)
}

function logout() {
    sessionStorage.clear()
    return auth.signOut()
}

async function resetPassword(email: string) {
    try {
        await sendPasswordResetEmail(auth, email)
    } catch (error: any) {
        return error.message
    }
}

interface Context {
    currentUser: User | null
    logout: () => Promise<void>
    login: (email: string, password: string) => Promise<UserCredential>
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
            const fetchUser = async (user: FirebaseUser | null) => {
                if (!user) return null
                // getting the users data from firestore
                const response = await getDoc(
                    doc(fs, 'users', user.uid).withConverter({
                        toFirestore: (data: FirestoreUser) => data,
                        fromFirestore: (snap: QueryDocumentSnapshot) =>
                            snap.data() as FirestoreUser,
                    })
                )
                const data = response.data()
                return { email: '', profileImage: '', displayName: '', ...data, ...user }
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
