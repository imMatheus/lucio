import type { NextApiRequest, NextApiResponse } from 'next'
import { Data } from '@/types/returns/api/classes/access'
import { run } from '@/utils/mongodb'
import Cookies from 'cookies'
import jwt from 'jsonwebtoken'
import { ClassRoom } from '@models/ClassRoom'

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	if (!process.env.JWT_SIGN_SALT) {
		res.status(500).json({ access: false })
		return
	}

	try {
		await run()

		// get token from the users cookie
		const { token } = req.headers
		const { classId } = req.query

		if (!token || !classId) {
			res.status(400).json({ access: false })
			return
		}

		const cookie: any = jwt.verify(Array.isArray(token) ? token[0] : token, process.env.JWT_SIGN_SALT)

		const classRoom = await ClassRoom.findOne({ _id: classId, 'participants.userId': { $eq: cookie._id } })
		if (!classRoom) {
			res.status(400).json({ access: false })
			return
		}
		res.status(200).json({ access: true })
	} catch (error) {
		res.status(400).json({ access: false })
	}
}
