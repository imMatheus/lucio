import { useEffect, useState } from 'react'
import { collection, query, getDocs, QueryConstraint } from 'firebase/firestore'
import { fs } from '@/firebase'
import { useAuth } from '@/context/AuthContext'

export function useDocs<T>(path: string, ...queryConstraints: QueryConstraint[]): [T[], boolean, string | null] {
	const [data, setData] = useState<T[]>([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)
	const { currentUser } = useAuth()

	useEffect(() => {
		async function getData() {
			setLoading(true)
			try {
				const q = query(collection(fs, path), ...queryConstraints)
				const querySnapshot = await getDocs(q)

				setData(querySnapshot.docs.map((doc) => doc.data() as T))
			} catch (error) {
				setError('Could not retrieve documents')
			} finally {
				setLoading(false)
			}
		}
		getData()
	}, [currentUser])

	return [data, loading, error]
}
