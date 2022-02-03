import axios from 'axios'
import { Data } from '@/types/returns/api/classes/access'

/**
 * @param {string} str - the class id
 * @return {boolean} if user has access to a class
 * @description given a class id and a jwt token from cookies, determines if a user ca access a class
 */
export async function userHasAccessToClass(
	str: string | string[] | undefined,
	token: string | undefined
): Promise<boolean> {
	console.log(1)

	if (!str || !token) return false
	console.log(2)
	console.log(str, token)

	try {
		console.log(3)
		const id = Array.isArray(str) ? str[0] : str

		const { data }: { data: Data } = await axios.get(`http://localhost:3000/api/classes/${id}/access`, {
			headers: { token }
		})
		console.log(4)
		console.log(data)

		return data.access
	} catch (error) {
		console.log(5)
		console.log(error)

		return false
	}
}
