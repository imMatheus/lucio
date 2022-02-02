import axios from 'axios'
import { Data } from '@/types/returns/api/classes/access'

/**
 * @param {string} str - the class id
 * @return {boolean} if user has access to a class
 */
export async function userHasAccessToClass(
	str: string | string[] | undefined,
	token: string | undefined
): Promise<boolean> {
	if (!str || !token) return false

	try {
		const id = Array.isArray(str) ? str[0] : str

		const { data }: { data: Data } = await axios.get(`http://localhost:3000/api/classes/${id}/access`, {
			headers: { token }
		})
		return data.access
	} catch (error) {
		return false
	}
}
