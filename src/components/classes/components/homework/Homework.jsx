import React from 'react'
import { useAuth } from '../../../../context/AuthContext'
import { fs } from '../../../../firebase'
import EditorView from './editorview/EditorView'

export default function Homework({ classLink, classID }) {
    const { currentUser } = useAuth()
    // firestore refs
    const classesRef = fs.collection('classes')
    const usersRef = fs.collection('users')
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
            <EditorView />
        </div>
    )
}
