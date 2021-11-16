import { auth, fs } from '@/firebase/index'
import { useAuth } from '@/context/AuthContext'
import { doc, setDoc, collection } from 'firebase/firestore'
import { generateNewLink } from '@/utils/generateCode'

export default function useCreateClass() {
    const { currentUser } = useAuth()
    return async () => {
        if (!currentUser)
            return alert('You need to log in before you can create classes')
        const className = prompt('What should the name be for your new class?')
        console.log(className)

        console.log(currentUser)
        if (!className) return alert('Please provide a class name')
        await setDoc(doc(fs, 'classes', className), {
            name: className,
            ownerId: currentUser.uid,
            participantsIds: [currentUser.uid],
            code: await generateNewLink(collection(fs, 'classes'), 'code'),
        })
    }
}
