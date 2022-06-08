import { useAuth } from '@/context/AuthContext'
import type { ClassType } from '@/types/ClassType'
import { useState } from 'react'
import { addDoc, collection } from 'firebase/firestore'
import type { DocumentReference } from 'firebase/firestore'
import { fs } from '@/firebase'
import { useToast } from '@/context/ToastContext'
import { useRouter } from 'next/router'

// all keys from ClassType except code
interface Data extends Omit<ClassType, 'code' | 'members' | 'ownerUid'> {}

export function useCreateClassroom() {
	const [loading, setLoading] = useState(false)
	const router = useRouter()
	const { currentUser } = useAuth()
	const { setToast } = useToast()

	async function createClassroom(data: Data) {
		if (!currentUser) return null
		try {
			setLoading(true)
			const doc = await addDoc(collection(fs, 'classes'), {
				...data,
				members: [currentUser.uid],
				ownerUid: currentUser.uid
			})
			setLoading(false)
			router.push('/classes/' + doc.id)
		} catch (error) {
			setToast({ message: 'Classroom not found', type: 'warning' })
			return null
		}
	}

	return [createClassroom, loading] as const
}
