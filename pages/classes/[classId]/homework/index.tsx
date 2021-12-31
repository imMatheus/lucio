import React, { useState, useEffect } from 'react'
import type { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import useClassData from '@/hooks/useClassData'
import { useToast } from '@/context/ToastContext'
import Head from 'next/head'
import Homework from '@/types/Homework'
import Button from '@/components/button'
import HomeworkCard from '@/components/classes/HomeworkCard'

const Index: NextPage = () => {
	const router = useRouter()
	const [loading, setLoading] = useState(false)
	const classId = router.query.classId
	const [classData, loadingClassData] = useClassData(classId)
	const { setToastMessage } = useToast()
	const [homeworks, setHomeworks] = useState<Homework[]>([])

	async function addHomeworkHandler() {
		if (loading) return setToastMessage('could not add homework cuz it was loading')
		try {
			if (!classData) return setToastMessage('Could not find class')
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
			setToastMessage('Could not create new homework, please try again')
		} catch (error) {
			setToastMessage('Could not create new homework, please try again because something went wrong')
		}
	}

	return (
		<section className="px-6 py-3">
			<Head>
				<title>{classData?.name} | Homework</title>
				<meta property="og:title" content="My page title" key="title" />
			</Head>
			homework
			<div>
				<Button onClick={addHomeworkHandler}>Create new homework</Button>
			</div>
			<p>hello</p>
			{loadingClassData + ''}
			<div>
				{homeworks.map((homework) => {
					return <HomeworkCard key={homework.id} homework={homework} />
				})}
			</div>
		</section>
	)
}

export default Index
