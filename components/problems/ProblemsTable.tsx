import React from 'react'
import styles from 'styles/Problems.module.scss'
import { ArrowDown } from 'react-feather'
import { problems as _problems } from '../../problems/Algorithms'
import { GetServerSideProps, GetStaticPropsResult } from 'next'
import AlgorithmProblem from '@/types/AlgorithmProblem'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Column from '@/components/table/TableColumn'
import ProblemRow from './ProblemRow'
import index from '../spinner'

interface ProblemsListProps {
	problems: AlgorithmProblem[]
	loading: boolean
}

const ProblemTable: React.FC<ProblemsListProps> = ({ problems, loading }) => {
	return (
		<div className="flex flex-col">
			<div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
				<div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
					<div className="shadow-md dark:shadow-gray-800 overflow-hidden border-b border-gray-200 dark:border-gray-700 sm:rounded-lg bg-gray-200 dark:bg-gray-700">
						<table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
							<thead className="bg-gray-50 dark:bg-gray-800">
								<tr>
									<Column>Status</Column>
									<Column>Name</Column>
									<Column>Acceptens</Column>
									<Column>Submitions</Column>
									<Column>Difficulty</Column>
								</tr>
							</thead>
							<tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-600">
								{problems.map(({ difficulty, name }, index) => (
									<ProblemRow
										key={name}
										difficulty={difficulty}
										name={name}
										loading={loading}
										index={index}
									/>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ProblemTable
