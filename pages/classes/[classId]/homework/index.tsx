import React, { useState } from 'react'
import type { NextPage } from 'next'
import { storage } from '@/firebase/index'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { fs } from '@/firebase/index'
import { collection, doc, setDoc, Timestamp, addDoc } from 'firebase/firestore'
import { useAuth } from '@/context/AuthContext'
import useClassData from '@/hooks/useClassData'
import { useToast } from '@/context/ToastContext'

const Index: NextPage = () => {
	const router = useRouter()
	const [loading, setLoading] = useState(false)
	const { currentUser } = useAuth()
	const classId = router.query.id
	const classData = useClassData(currentUser, classId)
	const { setToastMessage } = useToast()
	console.log('router: ', router)

	async function addHomeworkHandler() {
		if (loading) return setToastMessage('pika')
		try {
			if (!classData) return setToastMessage('Could not find class')
			setLoading(true)
			console.log('currentUser: ', currentUser)

			if (!currentUser) return alert('You need to log in before you can create homework')
			// const docRef = doc(collection(fs, `classes/${classId}/homework`))
			// console.log('docRef.id: ', docRef.id)

			const docRef = await addDoc(collection(fs, `classes/${classData.id}/homework`), {
				createdAt: Timestamp.fromDate(new Date()),
				lastlyUpdatedAt: Timestamp.fromDate(new Date()),
				title: '',
				description: '',
				createdBy: currentUser.uid,
				files: []
			})

			// await setDoc(docRef, {
			// 	createdAt: Timestamp.fromDate(new Date()),
			// 	lastlyUpdatedAt: Timestamp.fromDate(new Date()),
			// 	title: '',
			// 	description: '',
			// 	createdBy: currentUser.uid,
			// 	files: []
			// })

			console.log('docRef: ', docRef)

			setLoading(false)
			if (docRef.id) {
				return router.push(`/classes/${classData.id}/homework/add/${docRef.id}`)
			}
			setToastMessage('Could not create new homework, please try again')
		} catch (error) {
			setToastMessage('Could not create new homework, please try again')
		}
	}

	return (
		<div className="px-6 py-3">
			homework
			<div>
				{/* <Link href={`/classes/${router.query.id}/homework/add`} passHref={true}> */}
				<button
					onClick={addHomeworkHandler}
					className="rounded-xl bg-green-200 text-green-700 border border-green-400 py-1 px-4"
				>
					Link
				</button>
				{/* </Link> */}
			</div>
		</div>
	)
}

export default Index
