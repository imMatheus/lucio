import type { NextApiRequest, NextApiResponse } from 'next'
import { getCookieParser } from 'next/dist/server/api-utils'
import cookie from 'cookie'
import { User, UserInterface } from '@models/User'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import Cookies from 'cookies'

type Data = {}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const cookies = new Cookies(req, res)
	// Set a cookie
	const x = cookies.set('pp', 'tokensadasd', {
		maxAge: 60, // 1 min
		httpOnly: true // true by default
	})

	res.status(200).json({ shee: x })
}
// res.setHeader(
// 	'Set-Cookie',
// cookie.serialize('name', setCookie, {
// 	httpOnly: true,
// 	maxAge: 60 * 60 * 24 * 7 // 1 week
// })
// )

// res.status(200).json(cookie.parse(req.headers.cookie || 'hej=då'))
