import type { NextApiRequest, NextApiResponse } from 'next'
import { User, UserInterface } from '@models/User'
import jwt from 'jsonwebtoken'
import Cookies from 'cookies'
import { run } from '@/utils/mongodb'

type Data = {}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (!process.env.JWT_SIGN_SALT) {
		res.status(500).json({ user: null, message: 'Internal server error' })
		return
	}

	// connect to mongo
	await run()

	const cookies = new Cookies(req, res)

	// get token from the users cookie
	const token = cookies.get('jwt')
	if (!token) {
		res.status(200).json({ user: null })
		return
	}

	try {
		const cookie: any = jwt.verify(token, process.env.JWT_SIGN_SALT)
		const user = await User.findById(cookie._id)
		res.status(200).json({ user, token })
	} catch (error) {
		res.status(400).json({ message: 'Could not find user' })
	}
}
// res.setHeader(
// 	'Set-Cookie',
// cookie.serialize('name', setCookie, {
// 	httpOnly: true,
// 	maxAge: 60 * 60 * 24 * 7 // 1 week
// })
// )

// res.status(200).json(cookie.parse(req.headers.cookie || 'hej=då'))
