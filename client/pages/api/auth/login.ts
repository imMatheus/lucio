import type { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'
import { Data } from '@/types/returns/api/login'
import bcrypt from 'bcrypt'
import EmailValidator from 'email-validator'
import { User } from '@/models/User'
import Cookies from 'cookies'

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	if (!process.env.JWT_SIGN_SALT) {
		res.status(500).json({ success: false })
		return
	}
	const body = req.body
	const { email, password } = body

	// verify password type
	if (!password || typeof password !== 'string')
		return res.status(400).json({
			success: false
		})

	// verify email type
	if (!email || typeof email !== 'string' || !EmailValidator.validate(email))
		return res.status(400).json({
			success: false
		})

	const user = await User.findOne({ email })

	// could not find user by the given email
	if (!user)
		return res.status(400).json({
			success: false
		})

	// checking if the given password matches
	const passwordMatches = await bcrypt.compare(user.password, password)
	if (!passwordMatches)
		return res.status(400).json({
			success: false
		})

	const token = jwt.sign(user, process.env.JWT_SIGN_SALT)

	const cookies = new Cookies(req, res)
	// Set a cookie
	cookies.set('jwt', token, {
		maxAge: 1000 * 60 * 60 * 24 * 120, // 120 days
		httpOnly: true // true by default
	})

	res.status(200).json({
		success: true
	})
}
