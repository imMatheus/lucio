import { User as FirebaseUser } from 'firebase/Auth'

export interface FirestoreUser {
	email: string
	name: string
	location?: string
	school?: string
	bio?: string
}

export type User = FirestoreUser & FirebaseUser
