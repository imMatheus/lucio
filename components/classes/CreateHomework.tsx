import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useRouter } from 'next/router'
import ClassType from '@/types/ClassType'
import useClassData from '@/hooks/useClassData'
import HomeworkFile from './HomeworkFile'
import Input from '@/components/Input'
import Filezone from '@/components/Filezone'

interface CreateHomeworkProps {}

const CreateHomework: React.FC<CreateHomeworkProps> = ({}) => {
	const [title, setTitle] = useState('')
	const [description, setDescription] = useState('')
	const [dueDate, setDueDate] = useState(new Date())
	const router = useRouter()
	const { classId } = router.query
	const [classData, loading] = useClassData(classId)
	const id = Array.isArray(classId) ? classId[0] : classId
	const [files, setFiles] = useState<any[]>([])
	const [selectedFile, setSelectedFile] = useState<any>()
	const [isFilePicked, setIsFilePicked] = useState(false)

	const changeHandler = (event: any) => {
		setFiles((c) => c.concat(event.target?.files[0]))
		setSelectedFile(event.target?.files[0])
		setIsFilePicked(true)
	}

	return (
		<div className="text-blue-800">
			{/* <input type="file" name="file" onChange={changeHandler} />
			<div>
				<button onClick={handleSubmission}>Submit</button>
			</div> */}
			<Input state={title} setState={setTitle} />
			<Input state={description} setState={setDescription} />
			<div className="bg-yellow-500 p-2">
				<DatePicker selected={dueDate} showTimeSelect onChange={(date: Date) => setDueDate(date)} />
				{dueDate.toDateString()}
				<div></div>
				{dueDate.toLocaleDateString()}
			</div>

			<Filezone path={`classes/${id}/homework/${router.query.newHomeworkId}`} />
			{/* <HomeworkFile path="classes/9wBsqEkwM2XunXFK6q7I/bg.jpeg" />
			<HomeworkFile path="classes/9wBsqEkwM2XunXFK6q7I/tailwind.config.js_0.8j6zo06152g" />
			<HomeworkFile path="classes/9wBsqEkwM2XunXFK6q7I/Safety_Direct_PDF.pdf" /> */}
		</div>
	)
}

export default CreateHomework
