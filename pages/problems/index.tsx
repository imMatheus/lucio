import React from 'react'
import type { NextPage } from 'next'
import ProblemsList from '@/components/problems/ProblemsList'
import { GetServerSideProps, GetStaticPropsResult, GetStaticProps } from 'next'
import { fs } from '@/firebase/index'
import { getDocs, collection, query, where } from 'firebase/firestore'
import AlgorithmProblem from '@/types/AlgorithmProblem'
interface Props {
	problems: AlgorithmProblem[]
	// difficulty?: any
}

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
	// collection(db, "cities"),
	const diff = context.query?.difficulty
	const response = await getDocs(query(collection(fs, 'problems'))) //, where('difficulty', '==', diff)))
	console.log('context', context)

	return {
		props: {
			problems: response.docs.map((doc) => doc.data() as AlgorithmProblem)
			// difficulty: diff ?? 'no diff'
		}
	}
}

const index: NextPage<Props> = ({ problems, ...props }) => {
	console.log('props', props)

	return (
		<div className="w-maxed w-full mx-auto">
			problems
			<ProblemsList problems={problems} />
		</div>
	)
}

export default index
