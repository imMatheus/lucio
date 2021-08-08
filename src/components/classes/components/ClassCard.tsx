import React, { ReactElement, useEffect, useState } from 'react'
import { fs } from '../../../firebase'
import firebase from 'firebase/app'

import mj from './mj-crying.jpg'
import { useHistory, useRouteMatch } from 'react-router-dom'
interface Props {
    classData: {
        className: string
        students: string[]
        classJoinLink: string
    }
}

export default function ClassCard({ classData }: Props): ReactElement {
    const history = useHistory()
    const { url } = useRouteMatch()
    //TODO there seems to be a bug that couses students icons to re-render twice when i save vs code file
    const title = classData.className
    const studentsIDs = classData.students
    const joinLink = classData.classJoinLink
    const [students, setStudents] = useState<firebase.firestore.DocumentData[] | []>([])
    useEffect(() => {
        async function getStudents() {
            let studentDummyHolder = []
            for (const studentID of studentsIDs) {
                // getting the user from firestore and storing user details in
                const response = fs.collection('users').doc(studentID)
                const rawData = await response.get()
                const data = rawData.data()
                if (data) {
                    // pushing all the data we got of the user from firestore
                    studentDummyHolder.push(data)
                }
            }
            setStudents(studentDummyHolder)
        }
        if (studentsIDs) getStudents()
    }, [studentsIDs])

    const goToClassHandler = (joinLink: string) => {
        history.push(`${url}${joinLink}`)
    }
    return (
        <div className='class-card' onClick={() => goToClassHandler(joinLink)}>
            <div className='img-wrapper'>
                <img src={mj} alt='mj crying' />
            </div>
            <h3>{title}</h3>
            <p>{students.length} students</p>
            {students.length > 0 && (
                <span className='students-profiles-wrapper'>
                    {students.map((student, index) => {
                        //TODO change to uid
                        return (
                            <div className='profileImg-wrapper' key={index}>
                                <img src={student.profileImage} alt='profile img' />
                            </div>
                        )
                    })}
                </span>
            )}
        </div>
    )
}
