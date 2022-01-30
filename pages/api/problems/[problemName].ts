import type { NextApiRequest, NextApiResponse } from 'next'
import { Problem } from '@models/Problem'
import { run } from '@/utils/mongodb'

type Data = {
	data: any
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	await run()

	const { problemName } = req.query

	const problem = await Problem.findOne({ name: problemName })

	res.status(200).json(problem)
}
