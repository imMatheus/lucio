import type { NextApiRequest, NextApiResponse } from 'next'
import { User, UserInterface } from '@models/User'
import jwt from 'jsonwebtoken'
import Cookies from 'cookies'
import { run } from '@/utils/mongodb'
import { Data } from '@/returns/api/me'

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	console.log(1)

	if (!process.env.JWT_SIGN_SALT) {
		res.status(500).json({ user: null, token: null, message: 'Internal server error' })
		return
	}
	console.log(2)

	// connect to mongo
	await run()
	console.log(3)

	const cookies = new Cookies(req, res)

	// get token from the users cookie
	const token = cookies.get('jwt')
	console.log(token)

	console.log(4)
	if (!token) {
		res.status(200).json({ user: null, token: null, message: 'User is not signed in' })
		return
	}
	console.log(5)

	try {
		console.log(6)

		const cookie: any = jwt.verify(token, process.env.JWT_SIGN_SALT)
		console.log(7)
		console.log(cookie)
		const user = await User.findById(cookie._id)
		res.status(200).json({ user, token, message: null })
	} catch (error) {
		console.log(8)

		res.status(400).json({ user: null, token: null, message: 'Could not find user' })
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
