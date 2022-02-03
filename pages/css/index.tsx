import React from 'react'
import type { NextPage } from 'next'
import Circle from '@/components/loaders/Circle'

const index: NextPage = () => {
	return (
		<div className="bg-red-100 p-10">
			<Circle />
		</div>
	)
}

export default index
