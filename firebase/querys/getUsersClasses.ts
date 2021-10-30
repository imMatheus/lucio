import { collection, query, where, getDocs } from 'firebase/firestore'
import { fs } from '../index'
import { getAuth } from 'firebase/auth'
import ClassType from '@/types/ClassType'
import { useEffect, useState } from 'react'

export default async function getUsersClasses(): Promise<ClassType[] | null> {
    const auth = getAuth()
    const user = auth.currentUser
    console.log('~~~~~~~~')
    console.log(auth)
    console.log(user)

    // if (!user) return null
    const querySnapshot = await getDocs(collection(fs, 'classes'))
    console.log('got shiit')

    const userClasses = querySnapshot.docs.map((doc) => doc.data() as ClassType)
    return userClasses || null
}

export function useUsersClasses() {
    const [usersClasses, setUsersClasses] = useState<ClassType[] | null>(null)
    useEffect(() => {
        const _set = async () => setUsersClasses(await getUsersClasses())
        _set()
    }, [])

    return usersClasses
}
