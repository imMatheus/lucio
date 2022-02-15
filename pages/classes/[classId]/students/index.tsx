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

	const [classData, loadingClassData] = useClassData(classId)

	return (
		<section className="py-8 px-3 sm:px-6 lg:px-8">
			<Head>
				<title>{classData?.name} | Students</title>
				<meta property="og:title" content={`${classData?.name} | Students`} key="title" />
			</Head>
			{classId && <ClassNavbar />}
			<StudentsTable />
			{/* <h2 className="text-2xl"> {JSON.stringify(classData)}</h2> */}
		</section>
	)
}

export default Students