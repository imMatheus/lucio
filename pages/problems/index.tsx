import React from 'react'
import type { NextPage } from 'next'
import ProblemsList from '@/components/problems/ProblemsList'
import { GetServerSideProps, GetStaticPropsResult } from 'next'
import { fs } from '@/firebase/index'
import { getDocs, collection } from 'firebase/firestore'

export const getServerSideProps: GetServerSideProps = async (context) => {
	// collection(db, "cities"),
	const response = await getDocs(collection(fs, 'problems'))
	console.log('context', context)

	return {
		props: {
			preview: 45,
			context: response.docs.map((doc) => doc.data())
		}
	}
}

const index: NextPage = (props) => {
	return (
		<div className="max-w-6xl w-full mx-auto">
			problems
			<ProblemsList />
		</div>
	)
}

export default index
