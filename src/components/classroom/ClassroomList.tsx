import React from 'react'
import { inferQueryOutput } from '@/utils/trpc'
import ClassroomCard from './ClassroomCard'

interface ClassroomListProps {
	classrooms: inferQueryOutput<'classrooms.getAll'>
}

const ClassroomList: React.FC<ClassroomListProps> = ({ classrooms }) => {
	return (
		<div className="grid grid-cols-1 gap-3 p-8 sm:grid-cols-2 md:gap-4 lg:grid-cols-3 lg:gap-6 xl:grid-cols-4 2xl:grid-cols-5">
			{classrooms.map((classroom) => (
				<ClassroomCard key={classroom.id} classroom={classroom} />
			))}
		</div>
	)
}

export default ClassroomList
