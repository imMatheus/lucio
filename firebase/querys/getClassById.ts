import { doc, getDoc, getDocs } from 'firebase/firestore'
import { fs, auth } from '@/firebase/index'
import { getAuth } from 'firebase/auth'
import ClassType from '@/types/ClassType'
import { useAuth } from '@/context/AuthContext'
import { onAuthStateChanged } from '@firebase/auth'
import User from '@/types/User'

export default async function getClassById(id: string): Promise<ClassType | null> {
	if (!id) return null

	const docRef = doc(fs, 'classes', id)
	const docSnap = await getDoc(docRef)

	if (docSnap.exists()) {
		return {
			...docSnap.data(),
			id: docSnap.id
		} as ClassType
	}

	return null
}
