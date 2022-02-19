import React from 'react'
import { useRouter } from 'next/router'
import ClassNavbarOption from './ClassNavbarOption'

const ClassNavbar: React.FC = () => {
	const router = useRouter()
	const { classId } = router.query

	return (
		<div className="flex border-b border-gray-300 dark:border-gray-800">
			<ClassNavbarOption link={`/classes/${classId}`}>Class</ClassNavbarOption>
			<ClassNavbarOption link={`/classes/${classId}/homework`}>Homework</ClassNavbarOption>
			<ClassNavbarOption link={`/classes/${classId}/students`}>Students</ClassNavbarOption>
			<div className="dark:hover:border-b-orange-500"></div>
		</div>
	)
}

export default ClassNavbar
