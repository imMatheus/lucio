import React, { useEffect } from 'react'
import { fs } from '../../../firebase'
import { useRouteMatch } from 'react-router-dom'

export default function Class() {
    // firestore refs
    const classesRef = fs.collection('classes')

    const { path, url } = useRouteMatch()
    const classLink = url.split('/')[url.split('/').length - 1]
    console.log(classLink)
    useEffect(() => {
        async function getClass() {
            let usersClassesQuery = classesRef.where('classJoinLink', '==', classLink)
            await usersClassesQuery.get().then((querySnapshot) => {
                // if (!querySnapshot.empty) {
                console.log(querySnapshot)
                querySnapshot.forEach((doc) => {
                    let classData = doc.data()
                    console.log(classData)
                })
                // }
            })
        }
        getClass()
    }, [])

    return (
        <div>
            <h3>{classLink}</h3>
            <h3>{url}</h3>
            <h3>{path}</h3>
        </div>
    )
}
