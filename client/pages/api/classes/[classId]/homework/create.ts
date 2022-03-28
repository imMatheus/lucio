import type { NextApiRequest, NextApiResponse } from 'next'
import { Data } from '@/types/returns/api/classes/homework/create'
import { run } from '@/utils/mongodb'

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	res.status(200).json({
		success: false,
		id: 'sss'
	})
}
