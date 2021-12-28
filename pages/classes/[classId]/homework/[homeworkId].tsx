import React, { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import { fs, storage } from '@/firebase/index'
import Homework from 'types/Homework'
import { useRouter } from 'next/router'
import { doc, getDoc } from 'firebase/firestore'
import { ref, listAll, getDownloadURL } from 'firebase/storage'

const HomeworkId: NextPage = () => {
	const router = useRouter()
	const { homeworkId } = router.query
	const [homework, setHomework] = useState<Homework>()

	useEffect(() => {
		const docRef = doc(fs, router.asPath)
		getDoc(docRef).then((res) => {
			if (res.exists()) {
				setHomework(res.data() as Homework)
			}
		})
		const pathReference = ref(storage, router.asPath)
		listAll(pathReference)
			.then((res) => {
				res.items.forEach(async (itemRef) => {
					// All the items under listRef.
					const f = await getDownloadURL(itemRef)
				})
				setHomework((c) => ({
					...(c as Homework),
					files: res.items.map((item) => ({ ...item, downloadUrl: 'fff' }))
				}))
			})
			.catch((error) => {
				// Uh-oh, an error occurred!
			})

		// gs://lluciocode.appspot.com/classes/YsYWnCeYlyhfAbAaWYS5/homework/582oiQLazUlmTNQjQp8m
	}, [homeworkId])
	return <section className="px-6 py-3">hh homeworkId:{homeworkId}</section>
}

export default HomeworkId
