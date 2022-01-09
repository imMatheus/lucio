import type { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'
import { run } from '@/utils/mongodb'
import { User } from '@models/User'
import bcrypt from 'bcrypt'

type Data = {}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	console.log(req)
	await run()

	const { password, username, email } = req.body
	const hashed = bcrypt.hashSync(password, 10)

	const sign = {
		password: hashed,
		username,
		email
	}

	const token = jwt.sign(sign, 'I1NiIsInR5cCI6IkpXVCJ9')
	const user = await User.create(sign)
	console.log(user)

	res.status(200).json({ token, user })
}
