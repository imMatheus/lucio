import { User as FirebaseUser } from 'firebase/Auth'

export interface FirestoreUser {
	email: string
	name: string
}

export type User = FirestoreUser & FirebaseUser
