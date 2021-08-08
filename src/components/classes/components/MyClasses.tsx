import React, { useEffect, useRef, useState, ReactElement } from 'react'
import { useClasses } from '../../../context/ClassesContext'
import { fs } from '../../../firebase'
import ClassCard from './ClassCard'
import Class from '../../../types/Class'
import { useAuth } from '../../../context/AuthContext'
import { v4 as uuidv4 } from 'uuid'
import { useHistory, useRouteMatch } from 'react-router-dom'
import { generateNewLink } from '../../../utils/generateNewLink'
import { firestore } from 'firebase-admin'
export default function MyClasses(): ReactElement {
    const { userClasses } = useClasses()
    const { currentUser } = useAuth()
    const history = useHistory()
    const { url } = useRouteMatch()

    const renderCount = useRef(0)
    console.log('counts: ', ++renderCount.current)

    const [loading, setLoading] = useState(true)
    const userUID = currentUser?.uid

    // firestore refs
    const classesRef = fs.collection('classes')
    const usersRef = fs.collection('users')

    useEffect(() => {
        if (userClasses) setLoading(false)
        else setLoading(true)
    }, [userClasses])

    const joinClassHandler = async () => {
        const joinLink = prompt('Please fill in your class link') // get the join link
        const classQuery = classesRef.where('classJoinLink', '==', joinLink)
        if (joinLink === null) return
        let classID: string = 'sdfsdf'
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
        if (!classID) return alert('some went wrong')
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
                joinedAt: new Date(),
            })
            .catch((error) => {
                console.error('Error adding document: ', error)
            })
        history.push(url + joinLink)
    }

    const addClassHandler = async () => {
        const className = prompt('What should your class name be?', 'matu') // get the classname
        if (!className) return alert('please pick a class name')
        const classID = classesRef.doc().id // get a new id from firestore

        await classesRef
            .doc(classID)
            .set({
                className: className,
                ownerUid: userUID,
                classID: classID,
                classJoinLink: await generateNewLink(classesRef),
            })
            .catch((error) => {
                console.error('Error adding document: ', error)
            })

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
    }
    return (
        <div className='myclasses-wrapper'>
            <button onClick={addClassHandler}>Add class</button>
            <button onClick={joinClassHandler}>join class</button>
            {userClasses ? (
                userClasses.map((classItem: Class, index: number) => {
                    // console.log(classItem)

                    return (
                        <ClassCard
                            key={uuidv4()} //TODO change index to uuid
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
