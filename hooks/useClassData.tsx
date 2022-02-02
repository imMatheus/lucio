import React, { useState, useEffect } from 'react'
import ClassType from '@/types/ClassType'
import axios from 'axios'
import { Data } from 'types/returns/api/classes/index'
import { ClassRoomInterface } from '@models/ClassRoom'

export default function useClassData(id: string | string[] | undefined): [ClassRoomInterface | null, boolean] {
	const [state, setState] = useState<ClassRoomInterface | null>(null)
	const [loading, setLoading] = useState(false)
	const classId = Array.isArray(id) ? id[0] : id

	useEffect(() => {
		async function getStudents() {
			if (!classId) return setState(null)
			const { data }: { data: Data } = await axios.get(`http://localhost:3000/api/classes/${classId}`)
			setState(data.class)
		}
		getStudents()
	}, [id])
	return [state, loading]
}
