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
	SnapshotOptions,
	QueryDocumentSnapshot
} from 'firebase/firestore'

import {
	createUserWithEmailAndPassword,
	User as FirebaseUser,
	signInWithEmailAndPassword,
	sendPasswordResetEmail,
	UserCredential,
	onAuthStateChanged
} from 'firebase/auth'

import { auth, fs } from '../firebase'
import { User, FirestoreUser } from '@/types/User'

async function signup(email: string, password: string, displayName: string, imageUrl: string | ArrayBuffer) {
	const usersNamesRef = query(collection(fs, 'users'), where('displayName', '==', displayName), limit(1))
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
			profileImage: imageUrl
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

async function resetPassword(email: string): Promise<string | void> {
	try {
		await sendPasswordResetEmail(auth, email)
	} catch (error: any) {
		return error.message
	}
}

interface Context {
	currentUser: User | null
	fetchingUser: boolean
	logout: () => Promise<void>
	login: (email: string, password: string) => Promise<UserCredential>
	signup: (email: string, password: string, displayName: string, imageUrl: string | ArrayBuffer) => Promise<unknown>
	resetPassword: (email: string) => Promise<string | void>
}

const AuthContext = createContext<Context>({
	currentUser: null,
	logout,
	fetchingUser: false,
	login,
	signup,
	resetPassword
})

export function useAuth() {
	return useContext(AuthContext)
}

export const AuthProvider: React.FC = ({ children }) => {
	const [currentUser, setCurrentUser] = useState<User | null>(null)
	const [fetchingUser, setFetchingUser] = useState(true)

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, async (user) => {
			if (!user) {
				setCurrentUser(null)
				setFetchingUser(false)
				return
			}

			// getting the users data from firestore
			const response = await getDoc(
				doc(fs, 'users', user.uid).withConverter({
					toFirestore: (data: FirestoreUser) => data,
					fromFirestore: (snap: QueryDocumentSnapshot<FirestoreUser>, options: SnapshotOptions) =>
						snap.data(options)
				})
			)

			console.log('response')

			console.log(response.data())
			console.log(user)

			const data: User = { ...user, ...(response.data() as FirestoreUser) }

			//TODO dix dis
			setCurrentUser(data)
			setFetchingUser(false)
		})
		return unsubscribe
	}, [])
	console.log('final user is here ~~~~')

	console.log(currentUser)

	const value = {
		currentUser,
		logout,
		fetchingUser,
		login,
		signup,
		resetPassword
	}
	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
