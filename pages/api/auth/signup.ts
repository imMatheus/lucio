import type { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'
import { run } from '@/utils/mongodb'
import { User, UserInterface } from '@models/User'
import bcrypt from 'bcrypt'
import cookie from 'cookie'
import Cookies from 'cookies'

type Data = {}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	if (!process.env.JWT_SIGN_SALT) {
		res.status(500)
		return
	}

	// connect to mongo
	await run()

	const { password, username, email } = req.body
	const hashed = bcrypt.hashSync(password, 10) // hash password

	// value to be signed as jwt token
	const sign = {
		password: hashed,
		username,
		email
	}

	const token = jwt.sign(sign, process.env.JWT_SIGN_SALT)
	console.log('token: ', token)

	const cookies = new Cookies(req, res)
	// Set a cookie
	cookies.set('pp', 'tokensadasd', {
		maxAge: 60, // 1 min
		httpOnly: true // true by default
	})

	const user: UserInterface = await User.create(sign)

	res.status(200).json({ token, user })
}
