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
                //find th class where the classLink is
                if (querySnapshot.empty) setEmptyRoute(true) // means the class join link was not found, it does not exist
                querySnapshot.forEach((doc) => {
                    dummyClass = doc.data() // set the data we got to the dummyClass object
                    if (dummyClass.ownerUid === currentUser.uid) isOwnerOfClass = true
                })
            })

            /**
             * @return {Array(String)} students - a list of all the students uid
             */
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

            let s = students.map((s) => s.studentUid) // s is an array of the students uid's
            if (!s.includes(currentUser.uid) && !isOwnerOfClass) {
                // if the currents uses uid doesnt exist in the array of students that means the user doesnt go to that class
                // then we check if it is th owner, if it isn't the owner it should not have access to the class
                setEmptyRoute(true)
            }

            setClassData({ ...dummyClass, students })
            let studentDummyHolder = []
            for (let i = 0; i < students.length; i++) {
                // getting the user from firestore and storing user details in
                const response = fs.collection('users').doc(students[i].studentUid)
                const rawData = await response.get()
                const data = rawData.data()

                if (data) {
                    // pushing all the data we got of the user from firestore
                    studentDummyHolder.push({
                        ...data,
                    })
                }
            }
            setStudents(studentDummyHolder)
        }
        getClass()
    }, [classLink, classesRef, currentUser.uid])

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
