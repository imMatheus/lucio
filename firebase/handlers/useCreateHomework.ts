import { fs } from '@/firebase/index'
import { useAuth } from '@/context/AuthContext'
import { addDoc, collection, Timestamp } from 'firebase/firestore'

interface Props {
    classId: string
    title: string
    description: string
}

export default function useCreateHomework() {
    const { currentUser } = useAuth()
    console.log(currentUser)

    return async ({ classId, title, description }: Props) => {
        console.log('wweeeee')
        console.log(currentUser)
        console.log(classId)

        if (!currentUser)
            return alert('You need to log in before you can create homework')

        await addDoc(collection(fs, `classes/${classId}/homework`), {
            createdAt: Timestamp.fromDate(new Date()),
            title,
            description,
            createdBy: currentUser.uid,
        })
    }
}
