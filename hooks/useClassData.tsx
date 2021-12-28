import React, { useState, useEffect } from 'react'
import getClass from '@/firebase/querys/getClass'
import ClassType from '@/types/ClassType'
import { useAuth } from '@/context/AuthContext'
import getClassById from '@/firebase/querys/getClassById'

export default function useClassData(id: string | string[] | undefined): [ClassType | null, boolean] {
	const { currentUser } = useAuth()
	const [state, setState] = useState<ClassType | null>(null)
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		async function dummy() {
			setLoading(true)
			// if (!id) return alert('line 28 failed');
			if (!id) return console.log('failed on line 15')
			let response = await getClassById(Array.isArray(id) ? id[0] : id)

			setState(response)
			setLoading(false)
		}
		dummy()
	}, [id, currentUser])
	return [state, loading]
}
