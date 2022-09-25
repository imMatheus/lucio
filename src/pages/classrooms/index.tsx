import React from 'react'
import type { NextPage } from 'next'
import { trpc } from '@/utils/trpc'
import ClassroomList from '@/components/classroom/ClassroomList'

const Classroom: NextPage = () => {
	const { data: classrooms } = trpc.useQuery(['classrooms.getAll'])
	return (
		<div>
			{classrooms && <ClassroomList classrooms={classrooms} />}
			<pre className="mx-auto w-96 bg-green-100 text-sm">{JSON.stringify(classrooms, null, 2)}</pre>
		</div>
	)
}

export default Classroom
