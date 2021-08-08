import React, { useEffect, useState, useRef } from 'react'
import { useAuth } from '../../../../context/AuthContext'
import { fs } from '../../../../firebase'
import { Switch, Link, useRouteMatch, useHistory, Route, useParams } from 'react-router-dom'
import { generateNewLink } from '../../../../utils/generateNewLink'
import firebase from 'firebase/app'

export default function Homework() {
    const { currentUser } = useAuth()
    const history = useHistory()
    const [homework, setHomework] = useState<firebase.firestore.DocumentData[]>([])
    const [classData, setClassData] = useState<any>([])
    const { path, url } = useRouteMatch()
    const { classLink }: { classLink: string } = useParams()

    // generateNewLink()
    const renderCount = useRef(0)
    console.log('homework:', ++renderCount.current)
    // firestore refs
    const classesRef = fs.collection('classes')
    const usersRef = fs.collection('users')

    useEffect(() => {
        if (!currentUser) return

        classesRef
            .where('classJoinLink', '==', classLink)
            .get()
            .then((querySnapshot) => {
                console.log(querySnapshot)

                let g: any[] = []
                querySnapshot.forEach((doc) => {
                    g.push(doc.data())
                })
                setClassData(g[0])
            })
    }, [])
    useEffect(() => {
        console.log(classData)
        if (!classData) return
        classesRef
            .doc(classData.classID)
            .collection('homework')
            .get()
            .then((querySnapshot) => {
                console.log(querySnapshot)

                let g: firebase.firestore.DocumentData[] = []
                querySnapshot.forEach((doc) => {
                    g.push(doc.data())
                })
                console.log(g)
                setHomework(g)
            })
    }, [classData])

    const addHomeworkHandler = async () => {
        const homeworkName = prompt('What should your class name be?', 'matu') // get the classname
        if (!homeworkName) return alert('please pick a class name')
        const homeworkID = classesRef.doc().id // get a new id from firestore

        classesRef
            .doc(classData.classID)
            .collection('homework')
            .doc(homeworkID)
            .set({
                homeworkName,
                homeworkID,
                homeworkLink: await generateNewLink(
                    classesRef.doc(classData.classID).collection('homework')
                ),
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

    const newAddHomeworkHandler = async () => {
        let homeworkLink = await generateNewLink(
            classesRef.doc(classData.classID).collection('homework')
        )
        console.log(homeworkLink)
        const homeworkID = classesRef.doc().id // get a new id from firestore

        classesRef
            .doc(classData.classID)
            .collection('homework')
            .doc()
            .set({
                homeworkLink: homeworkLink,
                createdAt: new Date(),
                y: 'hej',
            })
            .catch((error) => {
                alert('could not add homework')
                console.error('Error adding document: ', error)
            })
        history.push(path + '/' + homeworkLink)
    }

    return (
        <div>
            homewworkkk
            <div>class link = {classLink}</div>
            <div>classId = {classData.classID}</div>
            <h3>url = {url}</h3>
            <h3>path = {path}</h3>
            <Switch>
                <Route path={`${path}/*`}>hej ?</Route>
                <Route>
                    <button onClick={addHomeworkHandler}>Add homework</button>
                    <div></div>
                    <button onClick={newAddHomeworkHandler}>newer</button>
                    <h2>{JSON.stringify(homework)}</h2>
                    {/* <EditorView /> */}
                </Route>
            </Switch>
        </div>
    )
}
