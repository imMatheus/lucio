import React, { useEffect, useRef, useState } from 'react'
import { fs } from '../../../firebase'
import { useRouteMatch } from 'react-router-dom'
import { useAuth } from '../../../context/AuthContext'
export default function Class() {
    const renderCount = useRef(0)
    const { currentUser } = useAuth()
    console.log(++renderCount.current)
    // firestore refs
    const classesRef = fs.collection('classes')
    const [classData, setClassData] = useState({})
    const [students, setStudents] = useState([])
    const [emptyRoute, setEmptyRoute] = useState(false)
    const { path, url } = useRouteMatch()
    //TODO https://www.youtube.com/watch?v=HOM47v73yG8
    const classLink = url.split('/')[url.split('/').length - 1]
    useEffect(() => {
        async function getClass() {
            let isOwnerOfClass = false
            let dummyClass = {}
            let usersClassesQuery = classesRef.where('classJoinLink', '==', classLink)
            await usersClassesQuery.get().then((querySnapshot) => {
                if (querySnapshot.empty) setEmptyRoute(true)
                querySnapshot.forEach((doc) => {
                    let classData = doc.data()
                    dummyClass = classData
                    if (classData.ownerUid === currentUser.uid) isOwnerOfClass = true
                })
            })

            let students = await classesRef
                .doc(dummyClass.classID)
                .collection('students')
                .get()
                .then((querySnapshot) => {
                    let g = []
                    querySnapshot.forEach((doc) => {
                        g.push(doc.data())
                    })
                    return g
                })

            let t = students.map((s) => s.studentUid)
            if (!t.includes(currentUser.uid) && !isOwnerOfClass) {
                setEmptyRoute(true)
            }

            setClassData({ ...dummyClass, students })
            let dummyHolder = []
            for (let i = 0; i < students.length; i++) {
                // getting the user from firestore and storing user details in
                const response = fs.collection('users').doc(students[i].studentUid)
                const rawData = await response.get()
                const data = rawData.data()

                if (data) {
                    // pushing all the data we got of the user from firestore
                    // and then adding users score and targets
                    dummyHolder.push({
                        ...data,
                    })
                }
            }
            setStudents(dummyHolder)
        }
        getClass()
    }, [])

    return (
        <div>
            {emptyRoute ? (
                <h3>couldn't find the class</h3>
            ) : (
                <>
                    <h3>{classLink}</h3>
                    <h3>{url}</h3>
                    <h3>{path}</h3>
                    {console.log(classData.students)}
                    {students?.map((student, index) => {
                        //TODO change to uuid
                        return (
                            <div key={index}>
                                <h3>{JSON.stringify({ student })}</h3>
                                <img
                                    src={student.profileImage}
                                    alt='profileImg'
                                    width='300'
                                    height='300'
                                />
                            </div>
                        )
                    })}
                </>
            )}
        </div>
    )
}
