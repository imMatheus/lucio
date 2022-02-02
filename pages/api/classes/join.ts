import type { NextApiRequest, NextApiResponse } from 'next'
import { run } from '@/utils/mongodb'
import { ClassRoom } from '@models/ClassRoom'
import jwt from 'jsonwebtoken'
import Cookies from 'cookies'
import { Data } from '@/types/returns/api/classes/join'

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	if (!process.env.JWT_SIGN_SALT) {
		res.status(500).json({ message: 'Internal server error', classRoom: null })
		return
	}

	await run()
	const { code } = req.body
	try {
		const cookies = new Cookies(req, res)

		// get token from the users cookie
		const token = cookies.get('jwt')
		if (!token) {
			res.status(401).json({ message: 'The user is not signed in', classRoom: null })
			return
		}

		// decode the jwt
		const cookie: any = jwt.verify(token, process.env.JWT_SIGN_SALT)
		const userId = cookie._id

		if (!userId) {
			res.status(401).json({ message: 'The user is not signed in', classRoom: null })
			return
		}

		const classRoom = await ClassRoom.findOne({
			code,
			// make sure user is not already in class
			'participants.userId': { $ne: userId }
		})

		if (!classRoom) {
			res.status(400).json({ message: 'Could not find class or the user is not signed in', classRoom: null })
			return
		}

		// update and save
		await classRoom.updateOne({ $push: { participants: { userId: userId } } })
		await classRoom.save()

		res.status(200).json({ message: null, classRoom })
	} catch (error) {
		res.status(400).json({ message: 'Could not find class or the user is not signed in', classRoom: null })
	}
}
