import React from 'react'
import type { NextPage } from 'next'
import ClassNavbar from '@/components/classes/ClassNavbar'
import StudentsTable from '@/components/classes/StudentsTable'
import Head from 'next/head'
import useClassData from '@/hooks/useClassData'
import { useRouter } from 'next/router'

const Students: NextPage = () => {
	const router = useRouter()
	const classId = router.query.classId
	console.log(444444)

	const [classData, loadingClassData] = useClassData(classId)
	console.log(classData)

	return (
		<div className="px-6 py-3">
			<Head>
				<title>{classData?.name} | Students</title>
				<meta property="og:title" content={`${classData?.name} | Students`} key="title" />
			</Head>
			<ClassNavbar />
			students
			<StudentsTable />
			<h2 className="text-2xl"> {JSON.stringify(classData)}</h2>
		</div>
	)
}

export default Students
