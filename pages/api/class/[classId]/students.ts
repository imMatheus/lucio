import type { NextApiRequest, NextApiResponse } from 'next'
import { run } from '@/utils/mongodb'
import { ClassRoom } from '@models/ClassRoom'
type Data = {}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	await run()
	console.log(req.query)
	const { classId } = req.query
	if (!classId || classId === 'undefined') {
		console.log(69)

		res.status(400).json({ hje: 'bad request' })
		return
	}
	const id = Array.isArray(classId) ? classId[0] : classId
	const response = await ClassRoom.find({ _id: id })

	res.status(200).json({ hje: 'på dig', response })
}
