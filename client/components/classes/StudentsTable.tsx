import React, { useState, useEffect } from 'react'
import StudentCard from './StudentCard'
import Button from '@/components/button'
import { useRouter } from 'next/router'

interface StudentsTableProps {}

const Column: React.FC = ({ children }) => {
	return (
		<th scope="col" className="px-6 py-3 text-left text-xs font-normal uppercase tracking-wider text-gray-800">
			{children}
		</th>
	)
}

const StudentsTable: React.FC<StudentsTableProps> = ({}) => {
	const [loading, setLoading] = useState(true)
	const [edit, setEdit] = useState(false)
	const router = useRouter()

	return (
		<section className="mt-6 mb-2">
			<div className="my-2 flex gap-2">
				<Button className="">Invite student</Button>
				<Button onClick={() => setEdit((c) => !c)}>Edit</Button>
				{edit + ''}
				<span className="rounded-md bg-teal-800 px-2">{loading + ''}</span>
			</div>
			<div className="inline-block w-full py-2 align-middle">
				<div className="overflow-hidden overflow-x-scroll rounded-lg border border-b border-gray-400/30">
					<table className="my-0 min-w-full divide-y divide-gray-200">
						<thead className="rounded-t-lg bg-gray-200">
							<tr>
								{edit && <Column>Edit</Column>}
								<Column>Name</Column>
								<Column>Completed homework</Column>
								<Column>Joined at</Column>
								<Column>Status</Column>
								<Column>Role</Column>
								<th scope="col" className="relative px-6 py-3">
									<span className="sr-only">Edit</span>
								</th>
							</tr>
						</thead>
						{/* {members.map(({ userId, role, joinedAt }) => {
							return (
								<StudentCard
									key={userId._id}
									user={userId}
									loading={loading}
									edit={edit}
									role={role}
									joinedAt={joinedAt}
								/>
							)
						})} */}
					</table>
				</div>
			</div>
		</section>
	)
}

export default StudentsTable
