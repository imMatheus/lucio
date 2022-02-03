import React, { ReactElement, useEffect, useState } from 'react'
import styles from 'styles/Classes.module.scss'
import ClassType from '@/types/ClassType'
import { useRouter } from 'next/router'
import ClassNavbar from '@/components/classes/ClassNavbar'
import useClassData from '@/hooks/useClassData'
import Button from '@/components/button'
import Head from 'next/head'

export default function ClassScreen(): ReactElement {
	const router = useRouter()
	const { classId } = router.query
	const [classData, loading] = useClassData(classId)

	return (
		<section className="py-8 px-3 sm:px-6 lg:px-8">
			<Head>
				<title>{classData?.name}</title>
				<meta property="og:title" content="My page title" key="title" />
			</Head>
			<section className="w-maxed mx-auto">
				{classId && <ClassNavbar />}
				<h2>class data</h2>
				<div>{/* <h4>{classData && JSON.stringify(classData)}</h4> */}</div>
			</section>
		</section>
	)
}
