import React, { useState, useEffect } from 'react'
import ClassType from '@/types/ClassType'
import axios from 'axios'

export default function useClassData(id: string | string[] | undefined): [ClassType | null, boolean] {
	const [state, setState] = useState<ClassType | null>(null)
	const [loading, setLoading] = useState(false)
	useEffect(() => {
		console.log(1111)

		async function getStudents() {
			const res = await axios.get(`http://localhost:3000/classes/${id}/students`)
			console.log('fghjksdsdsdsd')
			console.log(res)
		}
		getStudents()
	}, [id])
	return [state, loading]
}
