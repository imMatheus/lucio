import type { NextApiRequest, NextApiResponse } from 'next'
import { run } from '@/utils/mongodb'
import { ClassRoom } from '@/models/ClassRoom'
import { generateNewLink } from 'utils/generateCode'
import { PrivacyEnum } from '@/types/ClassType'
import Cookie from 'cookie'
import jwt from 'jsonwebtoken'
import { validateThemeColors } from '@/utils/validateThemeColors'
import { Data } from '@/types/returns/api/classes/create'

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	if (!process.env.JWT_SIGN_SALT) {
		res.status(500).json({ message: 'Internal server error', class: null })
		return
	}

	await run()
	const { name, privacy } = req.body

	// check that we have a good name
	if (!name || typeof name !== 'string') {
		res.status(400).json({ message: 'Incorrect value for name', class: null })

		return
	}

	let theme = validateThemeColors(req.body.theme)

	// check that privacy is a what we expect
	if (!privacy) {
		res.status(400).json({ message: 'Incorrect value for privacy', class: null })
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
		members: [{ userId: cookie._id, role: 'admin', joinedAt: new Date() }]
	})

	res.status(200).json({ class: classRoom, message: null })
}
