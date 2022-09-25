import React from 'react'
import type { NextPage } from 'next'
import { trpc } from '@/utils/trpc'
import ClassroomList from '@/components/classroom/ClassroomList'
import Navbar from '@/components/classroom/Navbar'

const Classroom: NextPage = () => {
	const { data: classrooms } = trpc.useQuery(['classrooms.getAll'])
	return (
		<div>
			<Navbar />
			{classrooms && <ClassroomList classrooms={classrooms} />}
			<pre className="mx-auto w-96 bg-green-100 text-sm">{JSON.stringify(classrooms, null, 2)}</pre>
		</div>
	)
}

export default Classroom
