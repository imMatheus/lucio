import React from 'react'
import type { NextPage } from 'next'
import ClassNavbar from '@/components/classes/classnavbar/index'
import StudentsTable from '@/components/classes/StudentsTable'
import Head from 'next/head'
import { useRouter } from 'next/router'
import PaddingContainer from '@/components/classes/PaddingContainer'

const Members: NextPage = () => {
	const router = useRouter()
	const classId = router.query.classId

	return (
		<PaddingContainer>
			<Head>
				{/* <title>{classData?.name} | Members</title> */}
				{/* <meta property="og:title" content={`${classData?.name} | Students`} key="title" /> */}
			</Head>
			<ClassNavbar />
			<StudentsTable />
			{/* <h2 className="text-2xl"> {JSON.stringify(classData)}</h2> */}
		</PaddingContainer>
	)
}

export default Members
