import type { NextApiRequest, NextApiResponse } from 'next'
import { run } from '@/utils/mongodb'
import { UpdateUserProps } from '@/context/AuthContext'
import jwt from 'jsonwebtoken'
import { User } from '@models/User'
import Cookies from 'cookies'

export type Data = {
	errorType: 'name' | 'bio' | null
	message: string | null
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	if (!process.env.JWT_SIGN_SALT) {
		res.status(500).json({ message: 'Internal server error', errorType: null })
		return
	}

	if (req.method !== 'PUT') return res.status(400).send({ message: 'Invalid method', errorType: null })

	const { name, bio }: UpdateUserProps = req.body

	// checking for validite of the props
	if (name && (name.length < 2 || name.length > 50))
		return res.status(400).send({ message: 'Name must be between 2 and 50 characters', errorType: 'name' })

	if (bio && bio.length > 1000)
		return res.status(400).send({ message: 'Bio must be less then 1000 characters', errorType: 'bio' })

	try {
		// connect to mongo
		await run()

		// get token from the users cookie
		const cookies = new Cookies(req, res)
		const token = cookies.get('jwt')

		if (!token) {
			res.status(400).json({ message: 'User is not signed in', errorType: null })
			return
		}

		const cookie: any = jwt.verify(token, process.env.JWT_SIGN_SALT)
		const user = await User.findById(cookie._id)

		if (user) {
			if (name) user.name = name
			if (bio) user.bio = bio

			await user.save()
			res.status(200).json({ message: null, errorType: null })
			return
		}

		res.status(400).json({ message: 'Could not find user', errorType: null })
	} catch (error) {
		res.status(400).json({ message: 'Could not find user', errorType: null })
	}

	return res.status(400).send({ message: 'Invalid method', errorType: null })
}
