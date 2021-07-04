import React, { useEffect, useState, useRef } from 'react'
import mj from './mj-crying.jpg'
import { fs } from '../../../firebase'
import { useAuth } from '../../../context/AuthContext'
//https://firebase.google.com/docs/firestore/query-data/queries

export default function MyClasses() {
    const { currentUser } = useAuth()
    const renderCount = useRef(0)
    console.log(renderCount.current++)
    const [userClasses, setUserClasses] = useState(null)
    const usersClassesRef = useRef([])
    const userUID = currentUser.uid
    console.log(userClasses)

    // firestore refs
    const classesRef = fs.collection('classes')
    const usersRef = fs.collection('users')

    useEffect(() => {
        const getClasses = async () => {
            usersClassesRef.current = [] // reset

            await usersRef // get users classes, will return an array with all the id's of the classes
                .doc(userUID)
                .collection('classes')
                .get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        usersClassesRef.current.push(doc.id)
                    })
                })
            console.log(usersClassesRef)

            let dummy = []

            let usersClassesQuery = classesRef.where('classID', 'in', usersClassesRef.current)
            await usersClassesQuery.get().then((querySnapshot) => {
                console.log(querySnapshot)
                querySnapshot.forEach((doc) => {
                    let classData = doc.data()
                    console.log(classData)
                    dummy.push(classData)
                })
            })
            setUserClasses(dummy)
        }
        getClasses()
    }, [])
    console.log(usersClassesRef)

    const joinClassHandler = async () => {
        const joinLink = prompt('What should your class name be?') // get the join link
        var classQuery = classesRef.where('classJoinLink', '==', joinLink)
        console.log(classQuery)
        let classID
        let isEmpty = false

        await classQuery.get().then((querySnapshot) => {
            if (querySnapshot.empty) return (isEmpty = true)
            querySnapshot.forEach((doc) => {
                let classData = doc.data()
                classID = classData.classID
            })
        })

        if (isEmpty) return alert('could not find your class')

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

        classesRef
            .doc(classID)
            .collection('students')
            .doc(userUID)
            .set({
                studentUid: userUID,
            })
            .catch((error) => {
                console.error('Error adding document: ', error)
            })
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
    function ClassCard({ title, students }) {
        return (
            <div className='class-card'>
                <div className='img-wrapper'>
                    <img src={mj} alt='mj crying' />
                </div>
                <h3>{title}</h3>
                <p>23 students</p>
            </div>
        )
    }
    return (
        <div className='myclasses-wrapper'>
            <button onClick={addClassHandler}>Add class</button>
            <button onClick={joinClassHandler}>join class</button>
            {/* <h1>{JSON.stringify(usersClassesRef.current)}</h1> */}
            <div className='class-card'>
                <div className='img-wrapper'></div>
                <h3>It intro</h3>
                <p>23 students</p>
            </div>
            {userClasses &&
                userClasses.map((classItem) => {
                    return <ClassCard title={classItem.className} />
                })}
        </div>
    )
}
