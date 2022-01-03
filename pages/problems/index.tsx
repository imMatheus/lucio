import React from 'react'
import type { NextPage } from 'next'
import ProblemsList from '@/components/problems/ProblemsTable'
import { GetServerSideProps } from 'next'
import AlgorithmProblem from '@/types/AlgorithmProblem'
import { problems as _problems } from '../../problems/Algorithms'
import getConfig from 'next/config'

interface Props {
	problems: AlgorithmProblem[]
	// difficulty?: any
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	const response = await fetch('http://localhost:3000/api/problems?difficulty=easy')
	const data = await response.json()
	const problems: AlgorithmProblem[] = data.map((prob: any) => prob as AlgorithmProblem)
	console.log(problems)

	return {
		props: {
			problems: problems
		}
	}
}

const Problems: NextPage<Props> = ({ problems, ...props }) => {
	console.log('props', props)
	console.log(problems)

	return (
		<div className="w-maxed w-full mx-auto border border-red-500 p-2 sm:p-5">
			problems
			<ProblemsList problems={problems} loading={false} />
			{JSON.stringify(problems)}
		</div>
	)
}

export default Problems
