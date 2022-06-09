import { useAuth } from '@/context/AuthContext'
import { where } from 'firebase/firestore'
import { useDocs } from '@/firebase'
import { ClassType } from '@/types/ClassType'

export function useMyClassrooms() {
	const { currentUser } = useAuth()

	try {
		const [classes, loading, error] = useDocs<ClassType>(
			'classes',
			where('members', 'array-contains', currentUser?.uid)
		)
		return [classes, loading, error] as const
	} catch (error) {
		console.log('in catch')

		console.log(error)

		return [[], false, 'Could not retrieve your classrooms'] as const
	}
}
