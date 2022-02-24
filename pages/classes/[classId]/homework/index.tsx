import React, { useState, useEffect } from 'react'
import type { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import useClassData from '@/hooks/useClassData'
import { useToast } from '@/context/ToastContext'
import Head from 'next/head'
import Button from '@/components/button'
import HomeworkCard from '@/components/classes/HomeworkCard'
import ClassNavbar from '@/components/classes/classnavbar/index'
import axios from 'axios'
import PaddingContainer from '@/components/classes/PaddingContainer'

const Index: NextPage = () => {
	const router = useRouter()
	const [loading, setLoading] = useState(false)
	const { classId } = router.query
	const [classData, loadingClassData] = useClassData(classId)
	const { setToast } = useToast()
	console.log(classData)
	console.log('pippiiii')
	console.log(router.query)
	console.log(router)

	async function createHomeworkHandler() {
		if (loading) return setToast({ message: 'could not add homework cuz it was loading', type: 'warning' })
		try {
			if (!classData) return setToast({ message: 'could not find class', type: 'warning' })
			setLoading(true)
			// const res = await axios.post('/api/classes/homework/create')
			// console.log(res)
			console.log('aappapaa')

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
			console.log(error)
			setLoading(false)

			setToast({
				message: 'Could not create new homework, please try again because something went wrong',
				type: 'error'
			})
		}
	}

	return (
		<PaddingContainer>
			<Head>
				<title>{classData?.name} | Homework</title>
				<meta property="og:title" content="My page title" key="title" />
			</Head>
			<ClassNavbar />
			homework
			{classData && (
				<Link href={`/classes/${classData._id}/homework/create`} passHref={true}>
					<a>
						<Button>Create new homework</Button>
					</a>
				</Link>
			)}
			<p>hello</p>
			{loadingClassData + ''}
			<h2>{JSON.stringify(classData?._id)}</h2>
			<div>{/* <HomeworkCard key={homework.id} homework={homework} /> */}</div>
		</PaddingContainer>
	)
}

export default Index
