import React from 'react'
import styles from 'styles/Problems.module.scss'
import { ArrowDown } from 'react-feather'
import { problems as _problems } from '../../problems/Algorithms'
import { GetServerSideProps, GetStaticPropsResult } from 'next'
import AlgorithmProblem from '@/types/AlgorithmProblem'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Column from './TableColumn'
interface ProblemsListProps {
	problems: AlgorithmProblem[]
}

const Table: React.FC<ProblemsListProps> = ({ problems }) => {
	return (
		<div className="flex flex-col">
			<div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
				<div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
					<div className="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
						<table className="min-w-full divide-y divide-gray-200">
							<thead className="bg-clr-text">
								<tr>
									<Column>Name</Column>
									<Column>Title</Column>
									<Column>Status</Column>
									<Column>Role</Column>
								</tr>
							</thead>
							<tbody className="divide-y divide-gray-200 bg-white">
								<tr>
									<td className="whitespace-nowrap px-6 py-4">
										<div className="text-sm text-clr-text">Regional Paradigm Technician</div>
										<div className="text-sm text-clr-bg-grayed">Optimization</div>
									</td>
									<td className="whitespace-nowrap px-6 py-4">
										<span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
											Active
										</span>
									</td>
									<td className="whitespace-nowrap px-6 py-4 text-sm text-clr-bg-grayed">Admin</td>
									<td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
										<a href="#" className="text-indigo-600 hover:text-indigo-900">
											Edit
										</a>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Table
