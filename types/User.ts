import { User as FirebaseUser } from 'firebase/auth'
import { DocumentSnapshot, DocumentData } from 'firebase/firestore'

export type FirestoreUser = {
	displayName: string
	email: string
	profileImage: string
	userUID: string
}

type User = FirestoreUser & FirebaseUser

export default User
