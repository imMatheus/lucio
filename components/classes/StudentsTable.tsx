import React, { useState, useEffect } from 'react'
import StudentCard from './StudentCard'
import Button from '@/components/button'
import { useRouter } from 'next/router'
import axios from 'axios'
import { Data, Participants } from '@/types/returns/api/classes/participants'

interface StudentsTableProps {}

const Column: React.FC = ({ children }) => {
	return (
		<th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
			{children}
		</th>
	)
}

const StudentsTable: React.FC<StudentsTableProps> = ({}) => {
	const [students, setStudents] = useState<Participants>([])
	const [loading, setLoading] = useState(true)
	const [edit, setEdit] = useState(false)
	const router = useRouter()

	useEffect(() => {
		const { classId } = router.query
		if (classId) {
			const getParticipants = async () => {
				const id = Array.isArray(classId) ? classId[0] : classId
				setLoading(true)
				const { data }: { data: Data } = await axios.get(`/api/classes/${id}/participants`)
				console.log('rrrr')
				console.log(router)
				console.log('res')
				console.log(data.participants)
				if (data?.participants && data?.participants[0]) {
					console.log(';;;;;;;;;;;;;;;;;;;;')

					console.log(data.participants[0].userId.email)
					setStudents(data.participants)
				}
				setLoading(false)
			}
			getParticipants()
		}
	}, [router])

	return (
		<div>
			<div className="flex my-2 gap-2">
				<Button className="">Invite student</Button>
				<Button onClick={() => setEdit((c) => !c)}>Edit</Button>
				{edit + ''}
				<span className="bg-teal-800 px-2 rounded-md">{loading + ''}</span>
			</div>
			<div className="">
				<div className="py-2 align-middle inline-block w-full">
					<div className="shadow overflow-hidden border-b overflow-x-scroll border-gray-200 dark:border-gray-800 rounded-t-lg">
						<table className="min-w-full divide-y my-0 divide-gray-200 dark:divide-gray-800">
							<thead className="bg-gray-100 dark:bg-gray-800">
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
							{students.map(({ userId, role, joinedAt }) => {
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
			</div>
		</div>
	)
}

export default StudentsTable
