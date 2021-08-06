import React, { ReactElement, useEffect, useState, useRef } from 'react'
import { useAuth } from '../../../../context/AuthContext'
import { fs } from '../../../../firebase'
import { Switch, Route } from 'react-router-dom'
import { generateNewLink } from '../../../../utils/generateNewLink'
import firebase from 'firebase/app'

interface Props {
    classLink: string
    classId: string
}

export default function Homework({ classId, classLink }: Props): ReactElement {
    const { currentUser } = useAuth()
    const [homework, setHomework] = useState<firebase.firestore.DocumentData[]>([])
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
            .doc(classId)
            .collection('homework')
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    homework.push(doc.data())
                })
                setHomework(homework)
            })
        // return () => unsubscribe()
    }, [classId, currentUser])

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
            <Switch>
                <Route exact path='/'>
                    aa
                </Route>
            </Switch>
            <button onClick={addHomeworkHandler}>Add homework</button>
            <h2>{JSON.stringify(homework)}</h2>
            {/* <EditorView /> */}
        </div>
    )
}
