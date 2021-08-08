import React, { ReactElement, useEffect, useState, useRef } from 'react'
import { useAuth } from '../../../../context/AuthContext'
import { fs } from '../../../../firebase'
import { Switch, Link, useRouteMatch } from 'react-router-dom'
import { generateNewLink } from '../../../../utils/generateNewLink'
import firebase from 'firebase/app'

interface Props {
    classLink: string
    classId: string
}

export default function Homework({ classId, classLink }: Props): ReactElement {
    const { currentUser } = useAuth()
    const [homework, setHomework] = useState<firebase.firestore.DocumentData[]>([])
    const { path, url } = useRouteMatch()

    // generateNewLink()
    const renderCount = useRef(0)
    console.log('homework:', ++renderCount.current)

    // firestore refs
    const classesRef = fs.collection('classes')
    const usersRef = fs.collection('users')
    useEffect(() => {
        if (!currentUser) return

        // get users classes, will push all id's to usersClassesRef
        classesRef
            .doc(classId)
            .collection('homework')
            .get()
            .then((querySnapshot) => {
                let g: firebase.firestore.DocumentData[] = []
                querySnapshot.forEach((doc) => {
                    g.push(doc.data())
                })
                setHomework(g)
            })
    }, [currentUser, classId])

    console.log(classId)

    const addHomeworkHandler = async () => {
        const homeworkName = prompt('What should your class name be?', 'matu') // get the classname
        if (!homeworkName) return alert('please pick a class name')
        const homeworkID = classesRef.doc().id // get a new id from firestore

        classesRef
            .doc(classId)
            .collection('homework')
            .doc(homeworkID)
            .set({
                homeworkName,
                homeworkID,
                homeworkLink: await generateNewLink(classesRef.doc(classId).collection('homework')),
                createdAt: new Date(),
                testCases: [
                    { input: '2 2', output: '4' },
                    { input: '6 6', output: '12' },
                ],
                question: 'Add to numbers',
                starterCode: 'const add = (a,b) => ?',
            })
            .catch((error) => {
                alert('could not add homework')
                console.error('Error adding document: ', error)
            })
    }

    return (
        <div>
            homewworkkk
            <div>{classLink}</div>
            <h3>url = {url}</h3>
            <h3>path = {path}</h3>
            <button onClick={addHomeworkHandler}>Add homework</button>
            <h2>{JSON.stringify(homework)}</h2>
            {/* <EditorView /> */}
        </div>
    )
}
