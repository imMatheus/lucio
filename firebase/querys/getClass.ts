import { collection, query, where, getDocs, limit } from 'firebase/firestore';
import { fs, auth } from '@/firebase/index';
import { getAuth } from 'firebase/auth';
import ClassType from '@/types/ClassType';
import { useAuth } from '@/context/AuthContext';
import { onAuthStateChanged } from '@firebase/auth';
import User from '@/types/User';

export default async function getClass(user: User | null, id: string): Promise<ClassType | null> {
	if (!user || !id) return null;

	const q = query(
		collection(fs, 'classes'),
		where('participantsIds', 'array-contains', user?.uid),
		where('code', '==', id)
	);

	const querySnapshot = await getDocs(q);

	return (
		({
			...querySnapshot?.docs[0]?.data(),
			id: querySnapshot?.docs[0]?.id
		} as ClassType) || null
	);
	// };
}
