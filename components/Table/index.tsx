import React from 'react'
import styles from 'styles/Problems.module.scss'
import { ArrowDown } from 'react-feather'
import { problems as _problems } from '../../problems/Algorithms'
import { fs } from '@/firebase/index'
import { doc, setDoc, getDocs, query } from 'firebase/firestore'
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
				<div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
					<div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
						<table className="min-w-full divide-y divide-gray-200">
							<thead className="bg-gray-50">
								<tr>
									<Column>Name</Column>
									<Column>Title</Column>
									<Column>Status</Column>
									<Column>Role</Column>
								</tr>
							</thead>
							<tbody className="bg-white divide-y divide-gray-200">
								<tr>
									<td className="px-6 py-4 whitespace-nowrap">
										<div className="text-sm text-gray-900">Regional Paradigm Technician</div>
										<div className="text-sm text-gray-500">Optimization</div>
									</td>
									<td className="px-6 py-4 whitespace-nowrap">
										<span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
											Active
										</span>
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Admin</td>
									<td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
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
