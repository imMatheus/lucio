import React, { useState } from 'react'
import type { NextPage } from 'next'
import ClassNavbar from '@/components/classes/ClassNavbar'
import { ref, uploadBytes } from 'firebase/storage'
import { storage } from '@/firebase/index'
import CreateHomework from '@/components/classes/CreateHomework'

const Index: NextPage = () => {
    const [selectedFile, setSelectedFile] = useState<any>()
    const [isFilePicked, setIsFilePicked] = useState(false)

    const storageRef = ref(storage, 'some-child')

    const changeHandler = (event: any) => {
        setSelectedFile(event.target?.files[0])
        setIsFilePicked(true)
    }

    const handleSubmission = () => {
        // 'file' comes from the Blob or File API
        uploadBytes(storageRef, selectedFile).then((snapshot) => {
            console.log('snapshot')
            console.log(snapshot)

            console.log('Uploaded a blob or file!')
        })
    }
    return (
        <div>
            <ClassNavbar />
            <input type='file' name='file' onChange={changeHandler} />
            <div>
                <button onClick={handleSubmission}>Submit</button>
            </div>
            homework
            <CreateHomework />
        </div>
    )
}

export default Index
