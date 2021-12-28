import { collection, query, orderBy, getDocs } from 'firebase/firestore'
import { fs } from '../index'

export default async function getUser() {
	const q = query(collection(fs, 'users'), orderBy('displayName', 'asc'))

	const querySnapshot = await getDocs(q)
}
