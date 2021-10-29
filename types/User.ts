import { User as FirebaseUser } from 'firebase/Auth'
import { DocumentSnapshot, DocumentData } from 'firebase/firestore'

export type FirestoreUser = {
    displayName: string | null
    email: string | null
    profileImage: string | null
}
// } & DocumentSnapshot<DocumentData>

type User = FirestoreUser & FirebaseUser

export default User