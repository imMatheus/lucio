import type { NextApiRequest, NextApiResponse } from 'next'
import { Problem } from '@models/Problem'
import { run } from '@/utils/mongodb'
import getConfig from 'next/config'

type Data = {
	data: any
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	await run()
	console.log(req.query)

	const problems = await Problem.find()
	// console.log('problems')
	// console.log(problems)

	// const problems = await Problem.find({ ...req.query })

	res.status(200).json(problems)
}
