import React from 'react'
import type { NextPage } from 'next'
import ClassNavbar from '@/components/classes/ClassNavbar'
import StudentsTable from '@/components/classes/StudentsTable'
import Head from 'next/head'
import useClassData from '@/hooks/useClassData'
import { useRouter } from 'next/router'
import PaddingContainer from '@/components/classes/PaddingContainer'

const Students: NextPage = () => {
	const router = useRouter()
	const classId = router.query.classId

	const [classData, loadingClassData] = useClassData(classId)

	return (
		<PaddingContainer>
			<Head>
				<title>{classData?.name} | Students</title>
				<meta property="og:title" content={`${classData?.name} | Students`} key="title" />
			</Head>
			<ClassNavbar />
			<StudentsTable />
			{/* <h2 className="text-2xl"> {JSON.stringify(classData)}</h2> */}
		</PaddingContainer>
	)
}

export default Students
