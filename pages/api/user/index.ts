import type { NextApiRequest, NextApiResponse } from 'next'
import { run } from '@/utils/mongodb'

type Data = {}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	await run()

	res.status(200).json({})
}
