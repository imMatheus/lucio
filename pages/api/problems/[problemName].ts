import type { NextApiRequest, NextApiResponse } from 'next'
import { Problem } from '@/models/Problem'
import { run } from '@/utils/mongodb'
import AlgorithmProblem from '@/types/AlgorithmProblem'

export type Data =
	| (AlgorithmProblem & {
			_id: any
	  })
	| null

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	await run()

	const { problemName } = req.query

	const problem = await Problem.findOne({ name: problemName })

	res.status(200).json(problem)
}
