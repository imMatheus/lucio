import { storage } from '@/firebase/index'
import { ref, getDownloadURL, list } from '@firebase/storage'
import React, { useEffect, useState } from 'react'
import { useToast } from '@/context/ToastContext'
interface HomeworkFileProps {
	path: string
}

const HomeworkFile: React.FC<HomeworkFileProps> = ({ path }) => {
	const [link, setLink] = useState('')
	const { setToastMessage } = useToast()
	useEffect(() => {
		const storageRef = ref(storage, path)
		getDownloadURL(storageRef)
			.then((url) => {
				const xhr = new XMLHttpRequest()
				xhr.responseType = 'blob'
				xhr.onload = async (event) => {
					const blob = xhr.response
				}
				setLink(url)

				xhr.open('GET', url)
				xhr.send()
			})
			.catch((error) => {
				// Handle any errors
				setToastMessage('Somethin whent wrong' + error)
			})
	}, [])
	return (
		<a href={link}>
			<div className="p-4 bg-red-300 rounded-2xl">{path}</div>
		</a>
	)
}

export default HomeworkFile
