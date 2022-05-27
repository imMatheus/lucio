import { useEffect, useState } from 'react'
import { collection, query, onSnapshot, QueryConstraint } from 'firebase/firestore'
import { fs } from '@/firebase'
import { useAuth } from '@/context/AuthContext'

interface WithId {
	id: string
}

export function useListenDocs<T extends WithId>(
	path: string,
	...queryConstraints: QueryConstraint[]
): [Array<T>, boolean, string | null] {
	const [data, setData] = useState<T[]>([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)
	const { currentUser } = useAuth()

	useEffect(() => {
		setLoading(true)
		try {
			const q = query(collection(fs, path), ...queryConstraints)
			const unsubscribe = onSnapshot(q, (querySnapshot) => {
				setData(querySnapshot.docs.map((doc) => ({ ...(doc.data() as T), id: doc.id })))
			})
			return unsubscribe
		} catch (error) {
			setError('Could not retrieve documents')
		} finally {
			setLoading(false)
		}
	}, [currentUser])

	return [data, loading, error]
}
