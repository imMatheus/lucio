import { fs } from '@/firebase/index'
import { useAuth } from '@/context/AuthContext'
import { addDoc, collection, Timestamp } from 'firebase/firestore'
import { generateNewLink } from '@/utils/generateCode'

export default function useCreateClass() {
    const { currentUser } = useAuth()
    return async () => {
        if (!currentUser)
            return alert('You need to log in before you can create classes')
        const className = prompt('What should the name be for your new class?')

        if (!className) return alert('Please provide a class name')

        await addDoc(collection(fs, 'classes'), {
            name: className,
            ownerId: currentUser.uid,
            participantsIds: [currentUser.uid],
            code: generateNewLink(),
            createdAt: Timestamp.fromDate(new Date()),
        })
    }
}
