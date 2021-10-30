import { collection, query, where, getDocs } from 'firebase/firestore'
import { fs } from '../index'
import { getAuth } from 'firebase/auth'
import ClassType from '@/types/ClassType'
import { useAuth } from '@/context/AuthContext'
export default async function getClass(id: string): Promise<ClassType | null> {
    const auth = getAuth()
    const user = auth.currentUser
    // const {currentUser} = useAuth()
    console.log('user-----------')
    console.log(auth)
    console.log(user)

    if (!user) return null
    const q = query(collection(fs, 'classes'), where('classCode', '==', id))

    const querySnapshot = await getDocs(q)
    console.log('got shiit')

    querySnapshot.forEach((doc) => {
        console.log(doc.id, ' => ', doc.data())
    })
    return (querySnapshot.docs[0]?.data() as ClassType) || null
}
