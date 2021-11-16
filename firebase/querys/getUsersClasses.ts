import {
    collection,
    query,
    onSnapshot,
    where,
    getDocs,
    orderBy,
} from 'firebase/firestore'
import { fs } from '../index'
import { getAuth } from 'firebase/auth'
import ClassType from '@/types/ClassType'
import { useEffect, useState } from 'react'

export default async function getUsersClasses(): Promise<Array<ClassType>> {
    const auth = getAuth()
    const user = auth.currentUser
    if (!user) return []

    const querySnapshot = await getDocs(
        query(
            collection(fs, 'classes'),
            where('participantsIds', 'array-contains', user.uid)
        )
    )
    console.log('got shiit')

    const userClasses = querySnapshot.docs.map((doc) => doc.data() as ClassType)
    console.log('rteurn value:', userClasses || [])

    return userClasses || []
}

export function useUsersClasses() {
    const auth = getAuth()
    const user = auth.currentUser
    const [usersClasses, setUsersClasses] = useState<ClassType[] | null>([])
    useEffect(() => {
        let unsubscribe
        if (user) {
            const q = query(
                collection(fs, 'classes'),
                where('participantsIds', 'array-contains', user?.uid) //TODO fix orderby
            )
            unsubscribe = onSnapshot(q, (querySnapshot) => {
                console.log('querySnapshot')
                console.log(querySnapshot)

                setUsersClasses(
                    querySnapshot.docs.map((doc) => doc.data() as ClassType)
                )
            })
        }
        return unsubscribe
    }, [user])
    if (!user) return []

    console.log('userrrrrrr')
    console.log(usersClasses)

    return usersClasses
}
