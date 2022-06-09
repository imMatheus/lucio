import { useEffect, useState } from 'react'
import { doc, getDoc } from 'firebase/firestore'
import { fs } from '@/firebase'
import { useAuth } from '@/context/AuthContext'

export function useDoc<T>(path: string): [T | null, boolean, string | null] {
	const [data, setData] = useState<T | null>(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)
	const { currentUser } = useAuth()

	useEffect(() => {
		async function getData() {
			setLoading(true)
			try {
				const q = doc(fs, path)
				const document = await getDoc(q)

				setData(document.data() as T)
				setLoading(false)
			} catch (error) {
				setData(null)
				setError('Could not retrieve document')
				setLoading(false)
			}
		}
		getData()
	}, [currentUser])

	return [data, loading, error]
}
