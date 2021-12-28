import { fs, storage } from '@/firebase/index'
import { useAuth } from '@/context/AuthContext'
import { addDoc, collection, Timestamp, doc, setDoc } from 'firebase/firestore'
import { ref, uploadBytes, list, getDownloadURL } from 'firebase/storage'

interface Props {
	classId: string
	title: string
	description: string
	files: any[]
}

const handleSubmission = async (path: string, file: any) => {
	const storageRef = ref(storage, path)

	await uploadBytes(storageRef, file).then((snapshot) => {})
}

export default function useCreateHomework() {
	const { currentUser } = useAuth()

	return async ({ classId, title, description, files }: Props) => {
		if (!currentUser) return alert('You need to log in before you can create homework')
		const collectionRef = collection(fs, `classes/${classId}/homework`)
		const docRef = doc(collection(fs, `classes/${classId}/homework`))

		const filePaths: string[] = files.map(
			(file) => `classes/${classId}/homework/${docRef.id}/${Math.random().toString(36)}_${file.name}`
		)

		await setDoc(docRef, {
			createdAt: Timestamp.fromDate(new Date()),
			title,
			description,
			createdBy: currentUser.uid,
			files: filePaths
		})

		for (let i = 0; i < files.length; i++) {
			await handleSubmission(filePaths[i], files[i])
		}
	}
}
