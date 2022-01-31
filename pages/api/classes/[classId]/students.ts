import type { NextApiRequest, NextApiResponse } from 'next'
import { run } from '@/utils/mongodb'
import { ClassRoom } from '@models/ClassRoom'
type Data = {}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	await run()
	console.log('hej pppp')
	const { classId } = req.query

	console.log(req.query)
	console.log('classId', classId)

	// no classId
	if (!classId || classId === 'undefined') {
		console.log(69)
		res.status(400).json({ hje: 'bad request' })
		return
	}
	const id = Array.isArray(classId) ? classId[0] : classId
	const response = await ClassRoom.findById(id, { participants: 1 }).populate('participants')
	console.log('response')
	console.log(response)

	res.status(200).json({ hje: 'på dig', response })
}
