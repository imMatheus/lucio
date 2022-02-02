import type { NextApiRequest, NextApiResponse } from 'next'
import { run } from '@/utils/mongodb'
import { ClassRoom, ClassRoomInterface } from '@models/ClassRoom'
import Cookies from 'cookies'
import jwt from 'jsonwebtoken'

type Data = {}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
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
			res.status(400).json({ message: 'The user is not signed in' })
			return
		}

		const classRooms: ClassRoomInterface[] = await ClassRoom.find({
			'participants.userId': userId
		})

		// res.status(200).json([])
		res.status(200).json(classRooms)
	} catch (error) {
		console.log(error)

		res.status(400).json({ message: 'Could not find classes or the user is not signed in' })
	}
}
