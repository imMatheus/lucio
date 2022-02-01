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
	console.log(classId)

	const [classData, loadingClassData] = useClassData(classId)
	console.log('asasasasasassa------classData')
	console.log(classData?.participants[0])

	return (
		<section className="py-8 px-6">
			<Head>
				<title>{classData?.name} | Students</title>
				<meta property="og:title" content={`${classData?.name} | Students`} key="title" />
			</Head>
			<ClassNavbar />
			students
			<StudentsTable />
			<h2 className="text-2xl"> {JSON.stringify(classData)}</h2>
		</section>
	)
}

export default Students
