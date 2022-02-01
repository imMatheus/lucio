import React, { useState, useEffect } from 'react'
import StudentCard from './StudentCard'
import Button from '@/components/button'
import { useRouter } from 'next/router'
import axios from 'axios'
import { Data, Participants } from '@/types/returns/api/classes/participants'

interface StudentsTableProps {}

const Column: React.FC = ({ children }) => {
	return (
		<th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
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
			</div>
			<div className="">
				<div className="py-2 align-middle inline-block w-full">
					<div className="shadow overflow-hidden border-b border-neutral-200 sm:rounded-lg">
						<table className="min-w-full divide-y divide-neutral-200">
							<thead className="bg-neutral-100">
								<tr>
									{edit && <Column>Edit</Column>}
									<Column>Name</Column>
									<Column>Completed homework</Column>
									<Column>Status</Column>
									<Column>Role</Column>
									<th scope="col" className="relative px-6 py-3">
										<span className="sr-only">Edit</span>
									</th>
								</tr>
							</thead>
							{students.map(({ userId: { email, username } }) => {
								return (
									<StudentCard
										key={username}
										name={username}
										email={email}
										loading={loading}
										edit={edit}
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
