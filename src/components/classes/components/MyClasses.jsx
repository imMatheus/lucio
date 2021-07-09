import React, { useEffect, useState, useRef } from 'react'
import mj from './mj-crying.jpg'
import { fs } from '../../../firebase'
import { useAuth } from '../../../context/AuthContext'
import { useHistory, useRouteMatch } from 'react-router-dom'
//https://firebase.google.com/docs/firestore/query-data/queries

export default function MyClasses() {
    const { currentUser } = useAuth()

    const history = useHistory()
    const { url } = useRouteMatch()

    const renderCount = useRef(0)
    console.log(++renderCount.current)

    const [loading, setLoading] = useState(false)
    const [userClasses, setUserClasses] = useState(null)
    const userUID = currentUser.uid

    // firestore refs
    const classesRef = fs.collection('classes')
    const usersRef = fs.collection('users')

    useEffect(() => {
        setLoading(true)
        let s = usersRef // get users classes, will push all id's to usersClassesRef
            .doc(userUID)
            .collection('classes')
            .onSnapshot(async (doc) => {
                let usersClassesIds = []
                doc.docs.forEach((doc) => usersClassesIds.push(doc.id)) // returns a array of the current users classes ids

                let dummy = []
                if (usersClassesIds.length > 0) {
                    for (const classIDE of usersClassesIds) {
                        let classData = await classesRef
                            .doc(classIDE)
                            .get()
                            .then((doc) => doc.data())
                        if (classData !== undefined) {
                            let studentsIds = await classesRef
                                .doc(classIDE)
                                .collection('students')
                                .get()
                                .then((querySnapshot) => {
                                    let g = []
                                    querySnapshot.forEach((doc) => {
                                        g.push(doc.data().studentUid)
                                    })
                                    return g
                                })
                            dummy.push({ ...classData, students: studentsIds })
                        }
                    }

                    setUserClasses(dummy)
                    setLoading(false)
                }
            })
        return () => {
            console.log('unsub')
            s()
        }
    }, [])

    const joinClassHandler = async () => {
        const joinLink = prompt('Please fill in your class link') // get the join link
        const classQuery = classesRef.where('classJoinLink', '==', joinLink)
        if (joinLink === null) return
        let classID
        let isEmpty = false
        let isOwnerOfClass = false

        await classQuery.get().then((querySnapshot) => {
            if (querySnapshot.empty) return (isEmpty = true)
            querySnapshot.forEach((doc) => {
                let classData = doc.data()
                classID = classData.classID
                if (classData.ownerUid === userUID) isOwnerOfClass = true
            })
        })

        if (isOwnerOfClass)
            return alert('You cant join as a students because you are the owner of this class')
        if (isEmpty) return alert('could not find your class')

        await usersRef
            .doc(userUID)
            .collection('classes')
            .doc(classID)
            .set({
                classID: classID,
            })
            .catch((error) => {
                console.error('Error adding document: ', error)
            })

        await classesRef
            .doc(classID)
            .collection('students')
            .doc(userUID)
            .set({
                studentUid: userUID,
            })
            .catch((error) => {
                console.error('Error adding document: ', error)
            })
        history.push(url + '/' + joinLink)
    }

    const addClassHandler = async () => {
        const className = prompt('What should your class name be?', 'matu') // get the classname
        if (!className) return alert('please pick a class name')
        const classID = classesRef.doc().id // get a new id from firestore

        /**
         * @return {string} class link - a random generated string of 6 characters, exempla 'djA1k8'
         */
        const getNewClassLink = () => {
            const LINK_LENGTH = 6
            const alphabet = 'abcdefghijklmnopqrstuvwxyz'
            const upperCaseAlphabet = alphabet // converts it into uppercase
                .split('')
                .map((c) => c.toUpperCase())
                .join('')
            const numbers = '0123456789'
            const characters = alphabet + upperCaseAlphabet + numbers // combine all of them into one string
            let link = ''
            for (let i = 0; i < LINK_LENGTH; i++) {
                const n = Math.floor(Math.random() * characters.length)
                link += characters[n]
            }
            console.log(link)
            return link
        }

        classesRef
            .doc(classID)
            .set({
                className: className,
                ownerUid: userUID,
                classID: classID,
                classJoinLink: getNewClassLink(),
            })
            .catch((error) => {
                console.error('Error adding document: ', error)
            })

        usersRef
            .doc(userUID)
            .collection('classes')
            .doc(classID)
            .set({
                classID: classID,
            })
            .catch((error) => {
                console.error('Error adding document: ', error)
            })
    }

    function ClassCard({ classData }) {
        //TODO there seems to be a bug that couses students icons to re-render twice when i save vs code file
        const title = classData.className
        const studentsIDs = classData.students
        const joinLink = classData.classJoinLink
        const [students, setStudents] = useState([])
        useEffect(() => {
            async function getStudents() {
                let studentDummyHolder = []
                for (let i = 0; i < studentsIDs.length; i++) {
                    // getting the user from firestore and storing user details in
                    const response = fs.collection('users').doc(studentsIDs[i])
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
        const goToClassHandler = (joinLink) => {
            history.push(url + '/' + joinLink)
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
    return (
        <div className='myclasses-wrapper'>
            <p>{loading + ''}</p>

            <button onClick={addClassHandler}>Add class</button>
            <button onClick={joinClassHandler}>join class</button>
            {userClasses ? (
                userClasses.map((classItem, index) => {
                    return (
                        <ClassCard
                            key={index} //TODO change index to uuid
                            classData={classItem}
                        />
                    )
                })
            ) : (
                <p>Looks like you don't have any classes</p>
            )}
        </div>
    )
}
