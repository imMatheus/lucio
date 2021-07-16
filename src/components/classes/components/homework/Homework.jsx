import React, { useEffect, useState, useRef } from 'react'
import { useAuth } from '../../../../context/AuthContext'
import { fs } from '../../../../firebase'
import EditorView from './editorview/EditorView'
import { generateNewLink } from '@utils/generateNewLink'

export default function Homework({ classLink, classID }) {
    const { currentUser } = useAuth()
    const [homework, setHomework] = useState(() => [])
    // generateNewLink()
    const renderCount = useRef(0)
    console.log('homework:', ++renderCount.current)

    // firestore refs
    const classesRef = fs.collection('classes')
    const usersRef = fs.collection('users')
    useEffect(() => {
        if (!currentUser) return

        let unsubscribe = classesRef
            // get users classes, will push all id's to usersClassesRef
            .doc(classID)
            .collection('homework')
            .get()
            .then((querySnapshot) => {
                let h = []
                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    console.log(doc.id, ' => ', doc.data())
                    h.push(doc.data())
                })
                setHomework(h)
            })
        // return () => unsubscribe()
    }, [classID, currentUser])
    console.log(classID)
    const addHomeworkHandler = async () => {
        const homeworkName = prompt('What should your class name be?', 'matu') // get the classname
        if (!homeworkName) return alert('please pick a class name')
        const homeworkID = classesRef.doc().id // get a new id from firestore

        classesRef
            .doc(classID)
            .collection('homework')
            .doc(homeworkID)
            .set({
                homeworkName,
                homeworkID,
                homeworkLink: await generateNewLink(classesRef.doc(classID).collection('homework')),
                testCases: [
                    { input: '2 2', output: '4' },
                    { input: '6 6', output: '12' },
                ],
                question: 'Add to numbers',
                starterCode: 'const add = (a,b) => ?',
            })
            .catch((error) => {
                console.error('Error adding document: ', error)
            })
    }

    return (
        <div>
            homewwork
            <div>{classLink}</div>
            <button onClick={addHomeworkHandler}>Add homework</button>
            <h2>{JSON.stringify(homework)}</h2>
            {/* <EditorView /> */}
        </div>
    )
}
