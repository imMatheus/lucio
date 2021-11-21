import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import { storage } from '@/firebase/index'
import useCreateHomework from '@/firebase/handlers/useCreateHomework'
import 'react-datepicker/dist/react-datepicker.css'
import { useRouter } from 'next/router'
import useGetClass from '@/firebase/querys/getClass'
import ClassType from '@/types/ClassType'
import { useAuth } from '@/context/AuthContext'
import { ref, uploadBytes } from 'firebase/storage'
import useClassData from '@/hooks/useClassData'
import HomeworkFile from './HomeworkFile'
import Input from '@/components/Input'
import Filezone from '@/components/Filezone'

interface CreateHomeworkProps {}

const CreateHomework: React.FC<CreateHomeworkProps> = ({}) => {
	const [title, setTitle] = useState('')
	const [description, setDescription] = useState('')
	const [dueDate, setDueDate] = useState(new Date())
	const createHomework = useCreateHomework()
	const router = useRouter()
	const { id: classId } = router.query
	const { currentUser } = useAuth()
	const classData = useClassData(currentUser, classId)
	const id = Array.isArray(classId) ? classId[0] : classId
	const [files, setFiles] = useState<any[]>([])
	const [selectedFile, setSelectedFile] = useState<any>()
	const [isFilePicked, setIsFilePicked] = useState(false)
	console.log('class data')
	console.log(classData)
	console.log('selectedFile')
	console.log(selectedFile)
	console.log('files: ', files)

	const changeHandler = (event: any) => {
		setFiles((c) => c.concat(event.target?.files[0]))
		setSelectedFile(event.target?.files[0])
		setIsFilePicked(true)
	}

	const handleSubmission = () => {
		// 'file' comes from the Blob or File API
		console.log('selectedFile')
		console.log(selectedFile)

		const storageRef = ref(storage, `classes/${classData?.id}/${Math.random().toString(36)}_${selectedFile.name}`)

		uploadBytes(storageRef, selectedFile).then((snapshot) => {
			console.log('snapshot')
			console.log(snapshot)

			console.log('Uploaded a blob or file!')
		})
	}

	const createHomeworkHandler = async () => {
		if (id) {
			if (classData) {
				await createHomework({
					classId: classData.id,
					title,
					description,
					files
				})
			}
		} else {
			console.log('faaaaaillleeeed')
		}
	}

	return (
		<div className="text-blue-800">
			<input type="file" name="file" onChange={changeHandler} />
			<div>
				<button onClick={handleSubmission}>Submit</button>
			</div>
			<Input state={title} setState={setTitle} />
			<Input state={description} setState={setDescription} />
			<div className="p-2 bg-yellow-500">
				<DatePicker selected={dueDate} showTimeSelect onChange={(date: Date) => setDueDate(date)} />
				{dueDate.toDateString()}
				<div></div>
				{dueDate.toLocaleDateString()}
			</div>

			<button onClick={createHomeworkHandler} className="rounded-xl bg-green-500 py-1 px-4 mb-3">
				create homework
			</button>
			<Filezone />
			<HomeworkFile path="classes/9wBsqEkwM2XunXFK6q7I/bg.jpeg" />
			<HomeworkFile path="classes/9wBsqEkwM2XunXFK6q7I/tailwind.config.js_0.8j6zo06152g" />
			<HomeworkFile path="classes/9wBsqEkwM2XunXFK6q7I/Safety_Direct_PDF.pdf" />
		</div>
	)
}

export default CreateHomework

// useEffect(() => {
// 	// const storageRef = ref(storage, 'classes/9wBsqEkwM2XunXFK6q7I/bg.jpeg')
// 	// const storageRef = ref(storage, 'classes/9wBsqEkwM2XunXFK6q7I/tailwind.config.js_0.8j6zo06152g')
// 	const storageRef = ref(storage, 'classes/9wBsqEkwM2XunXFK6q7I/Safety_Direct_PDF.pdf')
// 	getDownloadURL(storageRef)
// 		.then((url) => {
// 			// `url` is the download URL for 'images/stars.jpg'

// 			// This can be downloaded directly:
// 			const xhr = new XMLHttpRequest()
// 			xhr.responseType = 'blob'
// 			xhr.onload = async (event) => {
// 				console.log('event: ', event)

// 				const blob = xhr.response
// 				console.log('bloooob: ', blob)
// 				console.log(await blob.text())
// 				console.log(blob.stream())
// 			}
// 			xhr.open('GET', url)
// 			xhr.send()
// 			console.log('url: ', url)

// 			// Or inserted into an <img> element
// 			// const img = document.getElementById('myimg')
// 			imgRef.current?.setAttribute('src', url)
// 			// img!.setAttribute('src', url)
// 		})
// 		.catch((error) => {
// 			// Handle any errors
// 			console.log('error: ', error)
// 		})
// 	list(storageRef).then((res) => {
// 		console.log(res)

// 		console.log('fghsjdkfkjdhsnxkfgjdsamkdfgjnkfj')
// 	})
// }, [])
