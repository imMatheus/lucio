import React, { useEffect, useRef, useState } from 'react'
import mj from './mj-crying.jpg'
import { fs } from '../../../firebase'
import { useRouteMatch, useHistory, Route, Link, Switch } from 'react-router-dom'
import { useAuth } from '../../../context/AuthContext'
import DeleteIcon from '@material-ui/icons/Delete'
import Page404 from '../../404page/Page_404'
import Homework from './homework/Homework'

export default function Class() {
    const { currentUser } = useAuth()
    const history = useHistory()

    const renderCount = useRef(0)
    console.log(++renderCount.current)

    // firestore refs
    const classesRef = fs.collection('classes')
    const usersRef = fs.collection('users')

    const [classData, setClassData] = useState({})
    const [userIsOwnerOfClass, setUserIsOwnerOfClass] = useState(false)
    const [students, setStudents] = useState([])
    const [emptyRoute, setEmptyRoute] = useState(false)
    const { path, url } = useRouteMatch()
    //TODO https://www.youtube.com/watch?v=HOM47v73yG8
    const classLink = url.split('/')[3] // splits at all '/' then takes the third one witch should be the link
    const baseRoute = `${path.replace(/[*]/g, '')}${classLink}`

    useEffect(() => {
        let unsubscribe
        async function getClass() {
            let isOwnerOfClass = false
            let dummyClass = {}

            let usersClassesQuery = classesRef.where('classJoinLink', '==', classLink) // query class link
            unsubscribe = usersClassesQuery.onSnapshot(async (doc) => {
                //find th class where the given classLink exist
                if (doc.empty) return setEmptyRoute(true) // means the class join link was not found, it does not exist
                doc.forEach((d) => {
                    dummyClass = d.data() // set the data we got to the dummyClass object
                    if (dummyClass.ownerUid === currentUser.uid) isOwnerOfClass = true
                })

                /**
                 * @return {Array(String)} students - a list of all the students uid
                 */
                await classesRef
                    .doc(dummyClass.classID)
                    .collection('students')
                    .onSnapshot(async (snapshot) => {
                        let students = []
                        snapshot.forEach((doc) => {
                            students.push(doc.data())
                        })

                        const s = students.map((s) => s.studentUid) // s is an array of the students uid's
                        if (!s.includes(currentUser.uid) && !isOwnerOfClass) {
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
                        setUserIsOwnerOfClass(isOwnerOfClass)
                        setClassData({ ...dummyClass, students })
                        setStudents(studentDummyHolder)
                    })
            })
        }
        getClass()

        return () => unsubscribe()
    }, [])

    // delete class handler
    const deleteClassHandler = async () => {
        if (!window.confirm('Are you sure you want to delete this class?')) return
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
    }

    // leave class handler
    const leaveClassHandler = async () => {
        if (!window.confirm('Are you sure you want to leave?')) return // ask user if they are sure they want to leave
        await classesRef
            .doc(classData.classID) // go to the class document
            .collection('students') // go to the students collection of this class
            .doc(currentUser.uid) // find the user in the collection
            .delete() // delete it from the collection
            .then(() => {
                console.log('Document successfully deleted!')
            })
            .catch((error) => {
                console.error('Error removing document: ', error)
            })

        await usersRef
            .doc(currentUser.uid) // go to the user in the users collection
            .collection('classes') // go in to the users classes
            .doc(classData.classID) // find the current class
            .delete() // delete the class from collection
            .then(() => console.log('deleted from users classes'))
            .catch(() => console.log('shit hit the fan'))
        history.push(path.replace(/[*]/g, ''))
    }

    function StudentCard({ profileImage, name, email, studentUid, joinedAt }) {
        const removeStudentHandler = async () => {
            if (!window.confirm(`Are you sure you want to kick ${name}?`)) return // ask user if they are sure they want to leave
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
                    <Route exact path={`${baseRoute}/homework`}>
                        <Link to={`${baseRoute}`}>to base</Link>
                        <Homework classLink={classLink} classID={classData.classID} />
                    </Route>
                    <Route exact path={baseRoute}>
                        <h3>{classLink}</h3>
                        <h3>{url}</h3>
                        <h3>{path}</h3>
                        {userIsOwnerOfClass ? (
                            <button onClick={deleteClassHandler}>Delete class</button>
                        ) : (
                            <button onClick={leaveClassHandler}>Leave class</button>
                        )}
                        <Link to={`${baseRoute}/homework`}>to homework</Link>
                        base
                        <div className='students-wrapper'>
                            {students?.map((student, index) => {
                                //TODO change to uuid
                                return (
                                    <StudentCard
                                        key={index}
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
