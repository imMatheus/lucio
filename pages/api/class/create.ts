import type { NextApiRequest, NextApiResponse } from 'next'
import { run } from '@/utils/mongodb'
import { ClassRoom } from '@models/ClassRoom'
import { generateNewLink } from 'utils/generateCode'
import { PrivacyEnum } from '@/types/ClassType'
import Cookie from 'cookie'
import jwt from 'jsonwebtoken'
import validateClassThemeColors from '@/utils/validateClassThemeColors'

type Data = {}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	if (!process.env.JWT_SIGN_SALT) {
		res.status(500).json({ message: 'Internal server error' })
		return
	}

	await run()
	const { name, privacy } = req.body
	console.log(1)
	console.log(req.body)

	// check that we have a good name
	if (!name || typeof name !== 'string') {
		console.log(2)
		res.status(400).json({ message: 'Incorrect value for name' })

		return
	}

	console.log(1, validateClassThemeColors(undefined))
	console.log(2, validateClassThemeColors(''))
	console.log(3, validateClassThemeColors('#445566'))
	console.log(4, validateClassThemeColors('445566'))
	console.log(5, validateClassThemeColors(['332244', '121212']))
	console.log(6, validateClassThemeColors('456'))
	console.log(6, validateClassThemeColors('#456'))

	let theme = validateClassThemeColors(req.body.theme)

	// check that privacy is a what we expect
	if (!privacy) {
		// || !(privacy in PrivacyEnum)
		console.log('privacy', privacy)

		res.status(400).json({ message: 'Incorrect value for privacy' })
		return
	}
	const token = Cookie.parse(req.headers.cookie || '')
	const cookie: any = jwt.verify(token.jwt, process.env.JWT_SIGN_SALT)

	let code = generateNewLink()
	let uniqueCode = false
	while (!uniqueCode) {
		const exist = await ClassRoom.exists({ code: code })
		if (!exist) uniqueCode = true
	}

	const classRoom = await ClassRoom.create({
		code,
		name,
		privacy,
		owner: cookie._id,
		theme,
		participants: [{ _id: cookie._id, role: 'admin', joinedAt: new Date() }]
		// {
		// 	_id: '61ddf68c447aa738270d7fdf',
		// 	joinedAt: new Date(),
		// 	role: 'admin'
		// }
		// _id:ObjectId("61ddf68c447aa738270d7fdf")
	})

	res.status(200).json({ classRoom })
}
