import type { NextApiRequest, NextApiResponse } from 'next'
import { Data } from '@/returns/api/logout'
import Cookies from 'cookies'

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	try {
		const cookies = new Cookies(req, res)
		cookies.set('jwt', null)
		res.status(200).json({ success: false })
	} catch (error) {
		res.status(400).json({ success: false })
	}
}
