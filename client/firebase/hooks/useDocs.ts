import { useEffect, useState } from 'react'
import { collection, query, getDocs, QueryConstraint } from 'firebase/firestore'
import { fs } from '@/firebase'
import { useAuth } from '@/context/AuthContext'

interface WithId {
	id: string
}

export function useDocs<T>(
	path: string,
	...queryConstraints: QueryConstraint[]
): [(T & WithId)[], boolean, string | null] {
	const [data, setData] = useState<(T & WithId)[]>([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)
	const { currentUser } = useAuth()

	useEffect(() => {
		async function getData() {
			setLoading(true)
			try {
				const q = query(collection(fs, path), ...queryConstraints)
				const querySnapshot = await getDocs(q)

				setData(querySnapshot.docs.map((doc) => ({ ...(doc.data() as T), id: doc.id })))
				setLoading(false)
			} catch (error) {
				setError('Could not retrieve documents')
				setLoading(false)
			}
		}
		getData()
	}, [currentUser])

	return [data, loading, error]
}
