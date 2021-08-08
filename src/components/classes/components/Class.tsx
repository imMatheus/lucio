import React, { useEffect, useRef, useState } from 'react'
import mj from './mj-crying.jpg'
import { fs } from '../../../firebase'
import { useRouteMatch, useHistory, Route, Link, Switch } from 'react-router-dom'
import { useAuth } from '../../../context/AuthContext'
import DeleteIcon from '@material-ui/icons/Delete'
import Page404 from '../../page404/Page404'
import { default as ClassType } from '../../../types/Class'
import { v4 as uuidv4 } from 'uuid'
import Student from '../../../types/Student'
import Homework from './homework/Homework'
import HomeworkCard from './HomeworkCard'
import firebase from 'firebase/app'

export default function Class() {
    const { currentUser } = useAuth()
    const history = useHistory()
    const { path, url } = useRouteMatch()

    const renderCount = useRef(0)
    console.log(++renderCount.current)

    // firestore refs
    const classesRef = fs.collection('classes')
    const usersRef = fs.collection('users')

    const [classData, setClassData] = useState<any>({})
    const [homework, setHomework] = useState<firebase.firestore.DocumentData[]>([])

    console.log(classData)

    const [userIsOwnerOfClass, setUserIsOwnerOfClass] = useState(false)
    const [students, setStudents] = useState<any[]>([])
    const [emptyRoute, setEmptyRoute] = useState(false)

    const classLink = url.split('/')[2] // splits at all '/' then takes the third one witch should be the link
    const baseRoute = `${path.replace(/[*]/g, '')}${classLink}`
    let date = new Date()

    useEffect(() => {
        if (!currentUser) return

        // get users classes, will push all id's to usersClassesRef
        classesRef
            .doc(classData.classID)
            .collection('homework')
            .get()
            .then((querySnapshot) => {
                let g: firebase.firestore.DocumentData[] = []
                querySnapshot.forEach((doc) => {
                    g.push(doc.data())
                })
                setHomework(g)
            })
    }, [currentUser, classData.classID])
    console.log(homework)

    useEffect(() => {
        let unsubscribe: any
        async function getClass() {
            let isOwnerOfClass = false
            let dummyClass: any = {}

            const usersClassesQuery = classesRef.where('classJoinLink', '==', classLink) // query class link
            unsubscribe = usersClassesQuery.onSnapshot(async (doc) => {
                // subscribes to db for realtime updates
                // find th class where the given classLink exist
                if (doc.empty) return setEmptyRoute(true) // means the class join link was not found, it does not exist
                doc.forEach((d) => {
                    dummyClass = d.data() // set the data we got to the dummyClass object
                    if (dummyClass.ownerUid === currentUser?.uid) isOwnerOfClass = true
                })

                await classesRef
                    .doc(dummyClass.classID)
                    .collection('students')
                    .onSnapshot(async (snapshot) => {
                        let students: any[] = []
                        snapshot.forEach((doc) => {
                            students.push(doc.data())
                        })

                        // console.log('students', students)

                        const s = students.map((s) => s.studentUid) // s is an array of the students uid's
                        if (!s.includes(currentUser?.uid) && !isOwnerOfClass) {
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
                                    ...student,
                                    ...data,
                                })
                            }
                        }
                        // console.log('studentDummyHolder', studentDummyHolder)

                        setUserIsOwnerOfClass(isOwnerOfClass)
                        setClassData({ ...dummyClass, students })
                        setStudents(studentDummyHolder)
                    })
            })
        }
        getClass()

        return () => unsubscribe && unsubscribe()
    }, [])

    // delete class handler
    const deleteClassHandler = async () => {
        if (!window.confirm('Are you sure you want to delete this class?')) return
        fs.runTransaction(async (transaction) => {
            console.log(transaction)

            for (const s of classData.students) {
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

            history.push(path.replace(/[*]/g, ''))
        })
    }

    // leave class handler
    const leaveClassHandler = async () => {
        if (!window.confirm('Are you sure you want to leave?')) return // ask user if they are sure they want to leave
        fs.runTransaction(async (transaction) => {
            console.log(transaction)

            await classesRef
                .doc(classData.classID) // go to the class document
                .collection('students') // go to the students collection of this class
                .doc(currentUser?.uid) // find the user in the collection
                .delete() // delete it from the collection
                .then(() => {
                    console.log('Document successfully deleted!')
                })
                .catch((error) => {
                    console.error('Error removing document: ', error)
                })

            await usersRef
                .doc(currentUser?.uid) // go to the user in the users collection
                .collection('classes') // go in to the users classes
                .doc(classData.classID) // find the current class
                .delete() // delete the class from collection
                .then(() => console.log('deleted from users classes'))
                .catch(() => console.log('shit hit the fan'))
            history.push(path.replace(/[*]/g, ''))
        })
    }

    function StudentCard({ profileImage, name, email, studentUid, joinedAt }: any) {
        //TODO change to use transactions
        const removeStudentHandler = async () => {
            if (!window.confirm(`Are you sure you want to kick ${name}?`)) return // ask user if they are sure they want to leave
            fs.runTransaction(async (transaction) => {
                await classesRef
                    .doc(classData.classID) // go to the class document
                    .collection('students') // go to the students collection of this class
                    .doc(studentUid) // find the user in the collection
                    .delete() // delete it from the collection
                    .then(() => {
                        console.log('Document successfully deleted!')
                    })
                    .catch((error) => {
                        console.error('Error removing document: ', error)
                    })

                await usersRef
                    .doc(studentUid) // go to the user in the users collection
                    .collection('classes') // go in to the users classes
                    .doc(classData.classID) // find the current class
                    .delete() // delete the class from collection
                    .then(() => console.log('deleted from users classes'))
                    .catch(() => console.log('shit hit the fan'))
            })
        }
        return (
            <div className='student-card-container'>
                <div className='img-wrapper'>
                    <img src={profileImage || mj} alt='' />
                </div>
                <div className='name-wrapper'>
                    <p>{name}</p>
                    <p className='email'>{email}</p>
                </div>
                {joinedAt && (
                    <>
                        <div>
                            {new Date(joinedAt.seconds * 1000).toISOString().substring(0, 10)}
                        </div>
                        {' - - - '}
                        <div>
                            {new Date(joinedAt.seconds * 1000).toISOString().substring(11, 19)}
                        </div>
                        {'-------'}
                        <div>{new Date(joinedAt.seconds * 1000).toISOString()}</div>
                    </>
                )}
                {userIsOwnerOfClass && (
                    <div className='delete-wrapper' onClick={removeStudentHandler}>
                        <DeleteIcon />
                    </div>
                )}
            </div>
        )
    }
    return (
        <div className='class-wrapper'>
            {emptyRoute ? (
                <h3>couldn't find the class</h3>
            ) : (
                <Switch>
                    {console.log('path', path)}
                    <Route exact path={`${baseRoute}/homework`}>
                        <Link to={path}>to base</Link>
                        <Homework classLink={classLink} classId={classData.classID} />
                    </Route>
                    <Route exact path={baseRoute}>
                        <h3>{classLink}</h3>
                        hej
                        <h3>url = {url}</h3>
                        <h3>path = {path}</h3>
                        <h3>className = {classData.className}</h3>
                        {userIsOwnerOfClass ? (
                            <button onClick={deleteClassHandler}>Delete class</button>
                        ) : (
                            <button onClick={leaveClassHandler}>Leave class</button>
                        )}
                        <Link
                            to={`${history.location.pathname + history.location.search}/homework`}
                        >
                            to homework
                        </Link>
                        <div className='homework-cards-container'>
                            {homework?.map((home) => {
                                return (
                                    <HomeworkCard
                                        name={home.homeworkName}
                                        createdAt={home.createdAt}
                                    />
                                )
                            })}
                        </div>
                        <div className='students-wrapper'>
                            {students?.map((student: any, index: number) => {
                                //TODO change to uuid
                                return (
                                    <StudentCard
                                        key={uuidv4()}
                                        name={student.displayName}
                                        studentUid={student.userUID}
                                        email={student.email}
                                        joinedAt={student.joinedAt}
                                        profileImage={student.profileImage}
                                    />
                                )
                            })}
                        </div>
                    </Route>
                    <Route>
                        <Page404 />
                    </Route>
                </Switch>
            )}
        </div>
    )
}
