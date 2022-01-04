// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { User } from '@models/User'
import { run } from '@/utils/mongodb'
import getConfig from 'next/config'
const { serverRuntimeConfig } = getConfig()
import { readdir } from 'fs/promises'
import path from 'path'
import fs from 'fs'
import matter from 'gray-matter'
import ProblemInterface from '@/types/AlgorithmProblem'

type Data = {
	data: any
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	await run()

	const response = await User.find()
	res.status(200).json({ response })
}
