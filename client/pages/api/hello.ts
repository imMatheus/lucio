// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { User } from '@/models/User'
import { run } from '@/utils/mongodb'
import { Difficulty } from '@/types/AlgorithmProblem'

type Data = {
	data: any
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	await run()
	// const doc = new User({
	// 	name: 'First hello world that should work',
	// 	age: 35
	// })
	// await doc.save()
	res.status(200).json({
		data: 'hej'
	})
}
