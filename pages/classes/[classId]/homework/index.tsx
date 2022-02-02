import React, { useState, useEffect } from 'react'
import type { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import useClassData from '@/hooks/useClassData'
import { useToast } from '@/context/ToastContext'
import Head from 'next/head'
import Button from '@/components/button'
import HomeworkCard from '@/components/classes/HomeworkCard'
import ClassNavbar from '@/components/classes/ClassNavbar'

const Index: NextPage = () => {
	const router = useRouter()
	const [loading, setLoading] = useState(false)
	const classId = router.query.classId
	const [classData, loadingClassData] = useClassData(classId)
	const { setToast } = useToast()

	async function addHomeworkHandler() {
		if (loading) return setToast({ message: 'could not add homework cuz it was loading', type: 'error' })
		try {
			if (!classData) return setToast({ message: 'could not find class', type: 'error' })
			setLoading(true)

			// const docRef = doc(collection(fs, `classes/${classId}/homework`))

			// createdAt: Timestamp.fromDate(new Date()),
			// lastlyUpdatedAt: Timestamp.fromDate(new Date()),
			// title: '',
			// description: '',
			// createdBy: currentUser.uid,
			// files: [],
			// draft: true

			setLoading(false)
			// if (docRef.id) {
			// 	return router.push(`/classes/${classData.id}/homework/add/${docRef.id}`)
			// }
			setToast({ message: 'Could not create new homework, please try again', type: 'error' })
		} catch (error) {
			setToast({
				message: 'Could not create new homework, please try again because something went wrong',
				type: 'error'
			})
		}
	}

	return (
		<section className="py-8 px-3 sm:px-6 lg:px-8">
			<Head>
				<title>{classData?.name} | Homework</title>
				<meta property="og:title" content="My page title" key="title" />
			</Head>
			{classId && <ClassNavbar />}
			homework
			<Button onClick={addHomeworkHandler}>Create new homework</Button>
			<p>hello</p>
			{loadingClassData + ''}
			<div>{/* <HomeworkCard key={homework.id} homework={homework} /> */}</div>
		</section>
	)
}

export default Index
