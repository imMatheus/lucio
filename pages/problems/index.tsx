import React from 'react'
import type { NextPage } from 'next'
import ProblemsList from '@/components/problems/ProblemsTable'
import { GetServerSideProps, GetStaticPropsResult, GetStaticProps } from 'next'
import { fs } from '@/firebase/index'
import { getDocs, doc, collection, query, setDoc, where } from 'firebase/firestore'
import AlgorithmProblem from '@/types/AlgorithmProblem'
import { problems as _problems } from '../../problems/Algorithms'
interface Props {
	problems: AlgorithmProblem[]
	// difficulty?: any
}

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
	const diff = context.query?.difficulty
	const response = await getDocs(query(collection(fs, 'problems'))) //, where('difficulty', '==', diff)))

	return {
		props: {
			problems: response.docs.map((doc) => doc.data() as AlgorithmProblem)
			// difficulty: diff ?? 'no diff'
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
