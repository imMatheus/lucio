import React from 'react'
import type { NextPage } from 'next'
import ClassNavbar from '@/components/classes/ClassNavbar'
import StudentsTable from '@/components/classes/StudentsTable'
const index: NextPage = () => {
	return (
		<div className="px-6 py-3">
			<ClassNavbar />
			students
			<StudentsTable />
		</div>
	)
}

export default index
