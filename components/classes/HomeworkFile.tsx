import { storage } from '@/firebase/index'
import { ref, getDownloadURL, list } from '@firebase/storage'
import React, { useEffect, useState } from 'react'

interface HomeworkFileProps {
	path: string
}

const HomeworkFile: React.FC<HomeworkFileProps> = ({ path }) => {
	const [link, setLink] = useState('')
	useEffect(() => {
		const storageRef = ref(storage, path)
		getDownloadURL(storageRef)
			.then((url) => {
				const xhr = new XMLHttpRequest()
				xhr.responseType = 'blob'
				xhr.onload = async (event) => {
					console.log('event: ', event)
					const blob = xhr.response
					console.log('bloooob: ', blob)
					console.log(await blob.text())
					console.log(blob.stream())
				}
				setLink(url)

				xhr.open('GET', url)
				xhr.send()
				console.log('url: ', url)
			})
			.catch((error) => {
				// Handle any errors
				console.log('error: ', error)
			})
	}, [])
	return (
		<a href={link}>
			<div className="p-4 bg-red-300 rounded-2xl">{path}</div>
		</a>
	)
}

export default HomeworkFile
