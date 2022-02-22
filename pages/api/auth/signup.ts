import type { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'
import { run } from '@/utils/mongodb'
import { User, UserInterface } from '@models/User'
import bcrypt from 'bcrypt'
import cookie from 'cookie'
import Cookies from 'cookies'
import { Data } from '@/returns/api/signup'

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	if (!process.env.JWT_SIGN_SALT) {
		res.status(500).json({ token: null, user: null, message: 'Internal server error' })
		return
	}

	// connect to mongo
	await run()
	try {
		const { password, name, email } = req.body
		const hashed = bcrypt.hashSync(password, 10) // hash password

		// value to be signed as jwt token
		const userData = {
			password: hashed,
			name,
			email
		}

		const user = await User.create(userData)

		if (!user || !user._id) {
			res.status(400).json({ token: null, user: null, message: 'Invalid user name' })

			return
		}

		const token = jwt.sign(JSON.stringify(user), process.env.JWT_SIGN_SALT)

		const cookies = new Cookies(req, res)
		// Set a cookie
		cookies.set('jwt', token, {
			maxAge: 1000 * 60 * 60 * 24 * 120, // 120 days
			httpOnly: true // true by default
		})

		res.status(200).json({ token, user, message: null })
	} catch (error) {
		console.log(error)
		res.status(400).json({ token: null, user: null, message: 'Could not create user' })
	}
}
