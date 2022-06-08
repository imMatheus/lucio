import { useAuth } from '@/context/AuthContext'
import { useState } from 'react'
import { getDocs, doc, updateDoc, collection, query, where, arrayUnion, limit } from 'firebase/firestore'
import { fs } from '@/firebase'
import { useToast } from '@/context/ToastContext'
import { useRouter } from 'next/router'

export function useJoinClassroom() {
	const [loading, setLoading] = useState(false)
	const router = useRouter()
	const { currentUser } = useAuth()
	const { setToast } = useToast()

	async function joinClassroom(code: string) {
		if (!currentUser) return

		setLoading(true)
		const q = query(
			collection(fs, 'classes'),
			where('code', '==', code),
			where('members', 'not-in', currentUser.uid),
			limit(1)
		)
		const docs = await getDocs(q)
		if (docs.empty) return setToast({ message: 'Classroom not found', type: 'warning' })
		const document = docs.docs[0]
		const documentId = document.id

		const documentRef = doc(fs, 'cities', documentId)

		await updateDoc(documentRef, {
			members: arrayUnion(currentUser.uid)
		})

		setLoading(false)
		return null
	}

	return [joinClassroom, loading] as const
}
