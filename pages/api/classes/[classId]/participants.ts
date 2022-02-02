import type { NextApiRequest, NextApiResponse } from 'next'
import { run } from '@/utils/mongodb'
import { ClassRoom } from '@models/ClassRoom'
import { Data } from '@/types/returns/api/classes/participants'

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	await run()
	const { classId } = req.query

	// no classId
	if (!classId || classId === 'undefined') {
		res.status(400).json({ message: 'class id not specified', participants: null })
		return
	}
	const id = Array.isArray(classId) ? classId[0] : classId
	const response = await ClassRoom.findById(id, { participants: 1 }).populate<Data>('participants.userId')

	res.status(200).json({ message: 'på dig', participants: response.participants })
}
