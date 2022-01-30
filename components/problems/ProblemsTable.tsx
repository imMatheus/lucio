import React from 'react'
import styles from 'styles/Problems.module.scss'
import { ArrowDown } from 'react-feather'
import { problems as _problems } from '../../problems/Algorithms'
import { GetServerSideProps, GetStaticPropsResult } from 'next'
import AlgorithmProblem from '@/types/AlgorithmProblem'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Column from '@/components/tablea/TableColumn'
import ProblemRow from './ProblemRow'
import index from '../spinnera'

interface ProblemsListProps {
	problems: AlgorithmProblem[]
	loading: boolean
}

const ProblemTable: React.FC<ProblemsListProps> = ({ problems, loading }) => {
	return (
		<div className="flex flex-col">
			<div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
				<div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
					<div className="shadow-md dark:shadow-neutral-800 overflow-hidden border-b border-neutral-200 dark:border-neutral-700 sm:rounded-lg bg-neutral-200 dark:bg-neutral-700">
						<table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
							<thead className="bg-neutral-50 dark:bg-neutral-800">
								<tr>
									<Column>Status</Column>
									<Column>Name</Column>
									<Column>Acceptens</Column>
									<Column>Submitions</Column>
									<Column>Difficulty</Column>
								</tr>
							</thead>
							<tbody className="bg-white dark:bg-neutral-900 divide-y divide-gray-200 dark:divide-neutral-600">
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
