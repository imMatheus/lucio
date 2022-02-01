import type { NextApiRequest, NextApiResponse } from 'next'
import { run } from '@/utils/mongodb'
import { ClassRoom } from '@models/ClassRoom'
import { Data } from '@/types/returns/api/classes/index'

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	await run()
	console.log('hej pppp')
	const { classId } = req.query

	console.log(req.query)
	console.log('classId', classId)

	// no classId
	if (!classId || classId === 'undefined') {
		console.log(69)
		res.status(400).json({ class: null })
		return
	}

	const id = Array.isArray(classId) ? classId[0] : classId
	const response = await ClassRoom.findById(id).populate('participants.userId')

	console.log('response')
	console.log(response)

	if (!response) return res.status(400).json({ class: null })

	res.status(200).json({ class: response })
}
