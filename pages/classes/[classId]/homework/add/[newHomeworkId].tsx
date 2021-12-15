import React from 'react'
import type { NextPage } from 'next'
import ClassNavbar from '@/components/classes/ClassNavbar'
import CreateHomework from '@/components/classes/CreateHomework'

const Add: NextPage = () => {
	return (
		<div className="px-6 py-3">
			<ClassNavbar />
			homework
			<CreateHomework />
		</div>
	)
}

export default Add
