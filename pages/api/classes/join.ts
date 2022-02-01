import type { NextApiRequest, NextApiResponse } from 'next'
import { run } from '@/utils/mongodb'
import { ClassRoom } from '@models/ClassRoom'
import jwt from 'jsonwebtoken'
import Cookies from 'cookies'

type Data = {}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	if (!process.env.JWT_SIGN_SALT) {
		res.status(500).json({ message: 'Internal server error' })
		return
	}

	await run()
	const { code } = req.body
	try {
		const cookies = new Cookies(req, res)

		// get token from the users cookie
		const token = cookies.get('jwt')
		if (!token) {
			res.status(401).json({ message: 'The user is not loged in' })
			return
		}

		// decode the jwt
		const cookie: any = jwt.verify(token, process.env.JWT_SIGN_SALT)
		const userId = cookie._id
		if (!userId) {
			res.status(401).json({ message: 'The user is not loged in' })
			return
		}
		const classRoom = await ClassRoom.updateOne(
			{
				code,
				// make sure the user does not try to join a class they are already in
				'participants.userId': { $ne: userId }
			},
			{ $push: { participants: { userId: userId } } }
		)
		console.log('classrom')
		console.log(classRoom)

		if (!classRoom) {
			res.status(400).json({ message: 'Could not find class or the user is not loged in' })
			return
		}

		res.status(200).json({ cookie: cookie._id, token, classRoom })
	} catch (error) {
		res.status(400).json({ message: 'Could not find class or the user is not loged in' })
	}
}
