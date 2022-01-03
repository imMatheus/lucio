// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Problem } from '@models/Problem'
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
	const markdownFiles = await readdir(path.join(serverRuntimeConfig.PROJECT_ROOT, `markdown`))
	const response: string[] = []

	markdownFiles.forEach(function (filename) {
		const res = fs.readFileSync(
			path.join(path.join(serverRuntimeConfig.PROJECT_ROOT, `markdown`), filename),
			'utf-8'
		)
		response.push(res)
	})

	const problems = response.map((res: any) => {
		const { content: markdown, data } = matter(res)
		return {
			...data,
			markdown
		}
	})

	// await Problem.insertMany(problems)
	res.status(200).json(problems)
}
