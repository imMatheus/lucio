import React, { useState, useEffect } from 'react'
import StudentCard from './StudentCard'
import Button from '@/components/button'
import { useRouter } from 'next/router'
import axios from 'axios'
import { Data, Members } from '@/types/returns/api/classes/members'

interface StudentsTableProps {}

const Column: React.FC = ({ children }) => {
	return (
		<th
			scope="col"
			className="px-6 py-3 text-left text-xs font-normal uppercase tracking-wider text-gray-800 dark:text-gray-100"
		>
			{children}
		</th>
	)
}

const StudentsTable: React.FC<StudentsTableProps> = ({}) => {
	const [members, setMembers] = useState<Members>([])
	const [loading, setLoading] = useState(true)
	const [edit, setEdit] = useState(false)
	const router = useRouter()

	useEffect(() => {
		const { classId } = router.query
		if (classId) {
			const getMembers = async () => {
				const id = Array.isArray(classId) ? classId[0] : classId
				setLoading(true)
				const { data }: { data: Data } = await axios.get(`/api/classes/${id}/members`)
				if (data?.members && data?.members[0]) {
					setMembers(data.members)
				}
				setLoading(false)
			}
			getMembers()
		}
	}, [router])

	return (
		<section className="mt-6 mb-2">
			<div className="my-2 flex gap-2">
				<Button className="">Invite student</Button>
				<Button onClick={() => setEdit((c) => !c)}>Edit</Button>
				{edit + ''}
				<span className="rounded-md bg-teal-800 px-2">{loading + ''}</span>
			</div>
			<div className="inline-block w-full py-2 align-middle">
				<div className="overflow-hidden overflow-x-scroll rounded-lg border border-b border-gray-400/30 dark:border-gray-800">
					<table className="my-0 min-w-full divide-y divide-gray-200 dark:divide-gray-800">
						<thead className="rounded-t-lg bg-gray-200 dark:bg-gray-800">
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
						{members.map(({ userId, role, joinedAt }) => {
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
						})}
					</table>
				</div>
			</div>
		</section>
	)
}

export default StudentsTable