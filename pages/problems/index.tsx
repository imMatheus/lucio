import React from 'react'
import type { NextPage } from 'next'
import ProblemsList from '@/components/problems/ProblemsTable'
import { GetServerSideProps } from 'next'
import AlgorithmProblem from '@/types/AlgorithmProblem'
import { problems as _problems } from '../../problems/Algorithms'
import getConfig from 'next/config'
const { serverRuntimeConfig } = getConfig()
import { readdir } from 'fs/promises'
import path from 'path'
import fs from 'fs'
import matter from 'gray-matter'

interface Props {
	problems: AlgorithmProblem[]
	// difficulty?: any
}

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
	console.log('req.headers')
	console.log(context.req.headers.authorization)
	const markdownFiles = await readdir(path.join(serverRuntimeConfig.PROJECT_ROOT, `markdown`))
	const diff = context.query?.difficulty
	console.log('markdownFiles')
	// console.log(markdownFiles)
	const markdown = fs.readFileSync(path.join(serverRuntimeConfig.PROJECT_ROOT, `markdown/simple-addition.md`), 'utf8')
	const all = matter(markdown)
	console.log(all)

	return {
		props: {
			problems: []
		}
	}
}

const Problems: NextPage<Props> = ({ problems, ...props }) => {
	console.log('props', props)

	return (
		<div className="w-maxed w-full mx-auto border border-red-500 p-2 sm:p-5">
			problems
			<ProblemsList problems={problems} loading={false} />
		</div>
	)
}

export default Problems
