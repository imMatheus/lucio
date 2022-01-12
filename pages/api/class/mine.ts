import type { NextApiRequest, NextApiResponse } from 'next'
import { run } from '@/utils/mongodb'
import { ClassRoom } from '@models/ClassRoom'
import Cookies from 'cookies'
import jwt from 'jsonwebtoken'

type Data = {}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	console.log(1)

	if (!process.env.JWT_SIGN_SALT) {
		res.status(500).json({ message: 'Internal server error' })
		return
	}

	await run()

	try {
		const token: any = req.headers.token

		if (!token) {
			res.status(400).json({ classRooms: null })
			return
		}

		// decode the jwt
		const cookie: any = jwt.verify(token, process.env.JWT_SIGN_SALT)

		const userId = cookie._id

		if (!userId) {
			res.status(400).json({ message: 'The user is not loged in' })
			return
		}
		const classRooms = await ClassRoom.find({
			'participants._id': userId
		}).populate('participants')

		console.log('horaaaa')
		console.log(classRooms)

		res.status(200).json(classRooms)
	} catch (error) {
		res.status(400).json({ message: 'Could not find classes or the user is not loged in' })
	}
}
