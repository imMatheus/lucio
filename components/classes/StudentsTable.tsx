import React, { useState, useEffect } from 'react'
import StudentCard from './StudentCard'
import Button from '@/components/button'
import { createAvatar } from '@dicebear/avatars'
import * as style from '@dicebear/adventurer-neutral'

interface StudentsTableProps {}

const Column: React.FC = ({ children }) => {
	return (
		<th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
			{children}
		</th>
	)
}

const StudentsTable: React.FC<StudentsTableProps> = ({ children }) => {
	const [students, setStudents] = useState<any[]>([])
	const [loading, setLoading] = useState(true)
	const [edit, setEdit] = useState(false)

	return (
		<div className="flex flex-col">
			<div className="flex my-2">
				<Button className="mr-2">Invite student</Button>
				<Button onClick={() => setEdit((c) => !c)}>Edit</Button>
				{edit + ''}
			</div>
			<div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
				<div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
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
							{students.map(({ name, email, image }) => {
								return (
									<StudentCard
										key={name}
										name={name}
										email={email}
										image={image}
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
