import React, { ReactElement, useEffect, useState } from 'react'
import ClassType from '@/types/ClassType'
import { useRouter } from 'next/router'
import ClassNavbar from '@/components/classes/ClassNavbar'
import useClassData from '@/hooks/useClassData'
import Button from '@/components/button'
import Head from 'next/head'
import Welcome from '@/components/classes/WelcomeCard'
import PaddingContainer from '@/components/classes/PaddingContainer'

export default function ClassScreen(): ReactElement {
	const router = useRouter()
	const { classId } = router.query
	const [classData, loading] = useClassData(classId)

	return (
		<PaddingContainer>
			<Head>
				<title>{classData?.name}</title>
				<meta property="og:title" content="My page title" key="title" />
			</Head>
			<section className="w-maxed mx-auto">
				<ClassNavbar />

				{classData && <Welcome colors={classData.theme} />}
				{/* <div>
					<h4>{classData && JSON.stringify(classData)}</h4>
				</div> */}
			</section>
		</PaddingContainer>
	)
}
