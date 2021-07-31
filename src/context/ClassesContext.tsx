import React, { createContext, useContext, useState, useEffect } from 'react'
import firebase from 'firebase/app'
import { auth, fs } from '../firebase'
import Class from '../types/Class'
import { useAuth } from './AuthContext'
const ClassContext = createContext<Class[]>([])

export function useClasses() {
    return useContext(ClassContext)
}

export const ClassesProvider: React.FC = ({ children }) => {
    const { currentUser }: any = useAuth()
    const [userClasses, setUserClasses] = useState<any>([])
    console.log(currentUser)

    useEffect(() => {
        console.log(currentUser)

        if (!currentUser) return
        const classesRef = fs.collection('classes')
        let unsubscribe = fs
            .collection('users') // get users classes, will push all id's to usersClassesRef
            // get users classes, will push all id's to usersClassesRef
            .doc(currentUser.uid)
            .collection('classes')
            .onSnapshot(async (doc) => {
                let usersClassesIds: string[] = []
                doc.docs.forEach((doc) => usersClassesIds.push(doc.id)) // returns a array of the current users classes ids
                if (usersClassesIds.length > 0) {
                    let dummy = []
                    for (const classIDE of usersClassesIds) {
                        let classData = await classesRef
                            .doc(classIDE)
                            .get()
                            .then((doc) => doc.data())
                        if (classData !== undefined) {
                            let studentsIds = await classesRef
                                .doc(classIDE)
                                .collection('students')
                                .get()
                                .then((querySnapshot) => {
                                    let g: string[] = []

                                    querySnapshot.forEach((doc) => {
                                        g.push(doc.data().studentUid)
                                    })
                                    return g
                                })
                            dummy.push({ ...classData, students: studentsIds })
                        }
                    }
                    setUserClasses(dummy)
                }
            })
        return () => unsubscribe()
    }, [currentUser])

    const value: any = {
        userClasses,
    }
    return <ClassContext.Provider value={value}>{children}</ClassContext.Provider>
}
