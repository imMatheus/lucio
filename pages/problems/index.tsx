import React from 'react'
import type { NextPage } from 'next'
import ProblemsList from '@/components/problems/ProblemsList'

const index: NextPage = () => {
	return (
		<div className="max-w-6xl w-full mx-auto">
			problems
			<ProblemsList />
		</div>
	)
}

export default index
