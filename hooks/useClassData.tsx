import React, { useState, useEffect } from 'react'
import ClassType from '@/types/ClassType'

export default function useClassData(id: string | string[] | undefined): [ClassType | null, boolean] {
	const [state, setState] = useState<ClassType | null>(null)
	const [loading, setLoading] = useState(false)

	return [state, loading]
}
