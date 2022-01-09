// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { User } from '@models/User'
import { run } from '@/utils/mongodb'
import { Difficulty } from '@/types/AlgorithmProblem'
import jwt from 'jsonwebtoken'

type Data = {
	token: any
	decode: any
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	console.log('req')
	console.log(req)
	console.log('res')
	console.log(res)

	const t1 =
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZW5kZXMiOiJtYXRoZXVzIiwiaWF0IjoxNjQxNjkyMTQ2fQ.fjtNwo2qY9sJILp4CLbuPSiXzotj18hpr7KBgIPWAsc'
	const t2 =
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZW5kZXMiOiJtYXRoZXVzIiwiaWF0IjoxNjQxNjkyMjM2fQ.nh_i9dWGqn_VGFMnE8mPfbq7mZLroQwYESx_KiAWVbU'
	var token = jwt.sign({ mendes: 'matheus' }, 'shhhhh')
	res.status(200).json({
		token,
		decode: jwt.decode(t2)
	})
}
