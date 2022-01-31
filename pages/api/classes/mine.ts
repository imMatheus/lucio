import type { NextApiRequest, NextApiResponse } from 'next'
import { run } from '@/utils/mongodb'
import { ClassRoom, ClassRoomInterface } from '@models/ClassRoom'
import Cookies from 'cookies'
import jwt from 'jsonwebtoken'

type Data = {}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	console.log(10000000)

	if (!process.env.JWT_SIGN_SALT) {
		res.status(500).json({ message: 'Internal server error' })
		return
	}

	await run()
	console.log(20000)

	try {
		const token: any = req.headers.token

		console.log(300000)
		console.log(token)

		if (!token) {
			res.status(400).json({ classRooms: null })
			return
		}

		// decode the jwt
		const cookie: any = jwt.verify(token, process.env.JWT_SIGN_SALT)
		console.log(4000)
		console.log(cookie)

		const userId = cookie._id
		console.log(5000)
		console.log(userId)

		if (!userId) {
			res.status(400).json({ message: 'The user is not loged in' })
			return
		}

		console.log(6000)

		const classRooms: ClassRoomInterface[] = await ClassRoom.find({
			'participants._id': userId
		})
		console.log(7000)
		console.log(classRooms)

		console.log('horaaaa')
		// console.log(classRooms)

		// res.status(200).json([])
		res.status(200).json(classRooms)
	} catch (error) {
		console.log(8)
		console.log(error)

		res.status(400).json({ message: 'Could not find classes or the user is not signed in' })
	}
}
