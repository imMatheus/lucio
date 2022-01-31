import React, { useState, useEffect } from 'react'
import ClassType from '@/types/ClassType'
import axios from 'axios'

export default function useClassData(id: string | string[] | undefined): [ClassType | null, boolean] {
	const [state, setState] = useState<ClassType | null>(null)
	const [loading, setLoading] = useState(false)
	const classId = Array.isArray(id) ? id[0] : id
	useEffect(() => {
		console.log('pippi')

		async function getStudents() {
			console.log('inne nu ', classId)

			if (!classId) return setState(null)
			const res = await axios.get(`http://localhost:3000/api/classes/${classId}`)
			console.log('fghjksdsdsdsd')
			console.log(res)
		}
		getStudents()
	}, [id])
	return [state, loading]
}
