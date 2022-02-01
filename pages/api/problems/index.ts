import type { NextApiRequest, NextApiResponse } from 'next'
import { Problem } from '@models/Problem'
import { run } from '@/utils/mongodb'
import getConfig from 'next/config'
import { Data } from '@/types/returns/api/problems'

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	await run()
	console.log(req.query)
	if (!req.query) {
		const problems = await Problem.find()
		// console.log('problems')
		// console.log(problems)

		// const problems = await Problem.find({ ...req.query })

		res.status(200).json({ problems })
		return
	}
	const { difficulty } = req.query
	if (difficulty) {
		const problems = await Problem.find({ difficulty: difficulty })
		res.status(200).json({ problems })
		return
	}
	const problems = await Problem.find()
	res.status(200).json({ problems })
}
