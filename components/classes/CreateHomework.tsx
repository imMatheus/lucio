import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import { fs, storage } from '@/firebase/index'
import useCreateHomework from '@/firebase/handlers/useCreateHomework'
import 'react-datepicker/dist/react-datepicker.css'
import { useRouter } from 'next/router'
import getClass from '@/firebase/querys/getClass'

interface CreateHomeworkProps {}

const CreateHomework: React.FC<CreateHomeworkProps> = ({}) => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [dueDate, setDueDate] = useState(new Date())
    const createHomework = useCreateHomework()
    const router = useRouter()
    const { id: classId } = router.query
    const id = Array.isArray(classId) ? classId[0] : classId
    console.log('dueDate')
    console.log(dueDate)

    const createHomeworkHandler = async () => {
        if (id) {
            console.log('class data 24')
            console.log(id)
            const classData = await getClass(id)
            console.log(classData)

            if (classData) {
                await createHomework({
                    classId: classData.id,
                    title,
                    description,
                })
            }
        } else {
            console.log('faaaaaillleeeed')
        }
    }

    return (
        <div className='text-red-500'>
            homework
            <div className='p-2 bg-blue-500 m-2'>
                <input
                    type='text'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div className='p-2 bg-blue-500'>
                <input
                    type='text'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <div className='p-2 bg-yellow-500'>
                <DatePicker
                    selected={dueDate}
                    showTimeSelect
                    onChange={(date: Date) => setDueDate(date)}
                />
                {dueDate.toDateString()}
                <div></div>
                {dueDate.toLocaleDateString()}
            </div>
            <button
                onClick={createHomeworkHandler}
                className='rounded-xl bg-green-500 py-1 px-4 mb-3'
            >
                create homework
            </button>
        </div>
    )
}

export default CreateHomework
