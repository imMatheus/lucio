import { useEffect, useState } from 'react'
import { collection, query, onSnapshot, QueryConstraint } from 'firebase/firestore'
import { fs } from '@/firebase'
import { useAuth } from '@/context/AuthContext'

interface WithId {
	id: string
}

export function useListenDocs<T>(
	path: string,
	...queryConstraints: QueryConstraint[]
): [Array<T & WithId>, boolean, string | null] {
	const [data, setData] = useState<(T & WithId)[]>([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)
	const { currentUser } = useAuth()

	useEffect(() => {
		setLoading(true)
		try {
			const q = query(collection(fs, path), ...queryConstraints)
			const unsubscribe = onSnapshot(q, (querySnapshot) => {
				setLoading(false)
				setData(querySnapshot.docs.map((doc) => ({ ...(doc.data() as T), id: doc.id })))
			})
			return unsubscribe
		} catch (error) {
			setLoading(false)
			setError('Could not retrieve documents')
		}
	}, [currentUser])

	return [data, loading, error]
}
