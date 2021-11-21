import { collection, query, where, getDocs, limit } from 'firebase/firestore'
import { fs } from '../index'
import { getAuth } from 'firebase/auth'
import ClassType from '@/types/ClassType'
import { useAuth } from '@/context/AuthContext'

export default async function getClass(id: string): Promise<ClassType | null> {
    const auth = getAuth()
    const user = auth.currentUser
    // const {currentUser} = useAuth()
    console.log('user----------- fro getClass')
    console.log(user)

    if (!user) return null
    console.log('id: ', id)

    const q = query(
        collection(fs, 'classes'),
        where('participantsIds', 'array-contains', user.uid),
        where('code', '!=', 'asas')
    )

    console.log('middleware')
    let querySnapshot = await getDocs(q)

    // try {
    // } catch (error) {
    //     console.log('error')
    //     console.log(error)
    // }

    console.log('got shiit from got class function')
    console.log(querySnapshot)
    console.log(querySnapshot?.docs)

    querySnapshot?.forEach((doc) => {
        console.log(doc)

        console.log(doc.id, ' => ', doc.data())
    })

    return (
        ({
            ...querySnapshot?.docs[0]?.data(),
            id: querySnapshot?.docs[0]?.id,
        } as ClassType) || null
    )
}
