import type { NextApiRequest, NextApiResponse } from 'next'
import { User } from '@models/User'
import jwt from 'jsonwebtoken'
import Cookies from 'cookies'
import { run } from '@/utils/mongodb'
import { Data } from '@/returns/api/me'

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	if (!process.env.JWT_SIGN_SALT) {
		res.status(500).json({ user: null, token: null, message: 'Internal server error' })
		return
	}

	try {
		// connect to mongo
		await run()

		const cookies = new Cookies(req, res)
		if (req.headers.token) {
			const _token = req.headers.token
			const token = Array.isArray(_token) ? _token[0] : _token
			const cookie: any = jwt.verify(token, process.env.JWT_SIGN_SALT)
			const user = await User.findById(cookie._id)
			res.status(200).json({ user, token, message: null })
			return
		}

		// get token from the users cookie
		const token = cookies.get('jwt')

		if (!token) {
			res.status(200).json({ user: null, token: null, message: 'User is not signed in' })
			return
		}

		const cookie: any = jwt.verify(token, process.env.JWT_SIGN_SALT)
		const user = await User.findById(cookie._id)
		res.status(200).json({ user, token, message: null })
	} catch (error) {
		console.log(error)
		res.status(400).json({ user: null, token: null, message: 'Could not find user' })
	}
}
