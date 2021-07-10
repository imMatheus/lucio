import React, { useEffect, useRef, useState } from 'react'
import { fs } from '../../../firebase'
import { useRouteMatch, useHistory } from 'react-router-dom'
import { useAuth } from '../../../context/AuthContext'

export default function Class() {
    const { currentUser } = useAuth()
    const history = useHistory()

    const renderCount = useRef(0)
    console.log(++renderCount.current)

    // firestore refs
    const classesRef = fs.collection('classes')
    const usersRef = fs.collection('users')

    const [classData, setClassData] = useState({})
    const [userIsOwnerOfClass, setUserIsOwnerOfClass] = useState(false)
    const [students, setStudents] = useState([])
    const [emptyRoute, setEmptyRoute] = useState(false)
    const { path, url } = useRouteMatch()
    console.log(classData)
    console.log(students)
    //TODO https://www.youtube.com/watch?v=HOM47v73yG8
    const classLink = url.split('/')[url.split('/').length - 1] // splits at all '/' then takes the last one witch should be the link
    useEffect(() => {
        async function getClass() {
            let isOwnerOfClass = false
            let dummyClass = {}

            let usersClassesQuery = classesRef.where('classJoinLink', '==', classLink) // query class link
            await usersClassesQuery.get().then((querySnapshot) => {
                //find th class where the given classLink exist
                if (querySnapshot.empty) return setEmptyRoute(true) // means the class join link was not found, it does not exist
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

            const s = students.map((s) => s.studentUid) // s is an array of the students uid's
            if (!s.includes(currentUser.uid) && !isOwnerOfClass) {
                // if the currents uses uid doesnt exist in the array of students that means the user doesnt go to that class
                // then we check if it is th owner, if it isn't the owner it should not have access to the class
                setEmptyRoute(true)
            }

            let studentDummyHolder = []
            for (const student of students) {
                // getting the user from firestore and storing user details in
                const response = fs.collection('users').doc(student.studentUid)
                const rawData = await response.get()
                const data = rawData.data()

                if (data) {
                    // pushing all the data we got of the user from firestore
                    studentDummyHolder.push({
                        ...data,
                    })
                }
            }
            setUserIsOwnerOfClass(isOwnerOfClass)
            setClassData({ ...dummyClass, students })
            setStudents(studentDummyHolder)
        }
        getClass()
    }, [])

    // delete class handler
    const deleteClassHandler = async () => {
        if (!window.confirm('Are you sure you want to delete this class?')) return
        console.log(classData.students)
        for (const s of classData.students) {
            console.log(s)
            await usersRef
                .doc(s.studentUid) // go to the user in the users collection
                .collection('classes') // go in to the users classes
                .doc(classData.classID) // find the current class
                .delete() // delete the class from collection
                .then(() => console.log('deleted from users classes'))
                .catch(() => console.log('shit hit the fan'))
        }
        await classesRef
            .doc(classData.classID) // go to the class document
            .delete() // delete it from the collection
            .then(() => {
                console.log('Document successfully deleted!')
            })
            .catch((error) => {
                console.error('Error removing document: ', error)
            })

        // await usersRef
        //     .doc(currentUser.uid)
        //     .collection('classes')
        //     .doc(classData.classID)
        //     .delete()
        //     .then(() => console.log('deleted from users classes'))
        //     .catch(() => console.log('shit hit the fan'))
        history.push(path.replace(/[*]/g, ''))
    }

    // leave class handler
    const leaveClassHandler = async () => {
        if (!window.confirm('Are you sure you want to leave?')) return // ask user if they are sure they want to leave
        await classesRef
            .doc(classData.classID) // go to the class document
            .collection('students') // go to the students collection of this class
            .doc(currentUser.uid) // find the user in the collection
            .delete() // delete it from the collection
            .then(() => {
                console.log('Document successfully deleted!')
            })
            .catch((error) => {
                console.error('Error removing document: ', error)
            })

        await usersRef
            .doc(currentUser.uid) // go to the user in the users collection
            .collection('classes') // go in to the users classes
            .doc(classData.classID) // find the current class
            .delete() // delete the class from collection
            .then(() => console.log('deleted from users classes'))
            .catch(() => console.log('shit hit the fan'))
        history.push(path.replace(/[*]/g, ''))
    }

    return (
        <div>
            {emptyRoute ? (
                <h3>couldn't find the class</h3>
            ) : (
                <>
                    <h3>{classLink}</h3>
                    {userIsOwnerOfClass ? (
                        <button onClick={deleteClassHandler}>Delete class</button>
                    ) : (
                        <button onClick={leaveClassHandler}>Leave class</button>
                    )}
                    <h3>{url}</h3>
                    <h3>{path}</h3>
                    <h3>{JSON.stringify(classData)}</h3>
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
