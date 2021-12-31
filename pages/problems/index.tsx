import React from 'react'
import type { NextPage } from 'next'
import ProblemsList from '@/components/problems/ProblemsTable'
import { GetServerSideProps } from 'next'
import AlgorithmProblem from '@/types/AlgorithmProblem'
import { problems as _problems } from '../../problems/Algorithms'
interface Props {
	problems: AlgorithmProblem[]
	// difficulty?: any
}

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
	console.log('req.headers')
	console.log(context.req.headers.authorization)

	const diff = context.query?.difficulty

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
