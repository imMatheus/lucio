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
		<div className="py-2 align-middle inline-block w-full">
			<div className="shadow overflow-hidden border-b overflow-x-scroll border-gray-200 dark:border-gray-800 rounded-t-lg">
				<table className="min-w-full divide-y my-0 divide-gray-200 dark:divide-gray-800">
					<thead className="bg-gray-100 dark:bg-gray-800">
						<tr>
							<Column>Status</Column>
							<Column>Name</Column>
							<Column>Acceptens</Column>
							<Column>Submitions</Column>
							<Column>Difficulty</Column>
						</tr>
					</thead>
					{problems.map(({ difficulty, name }, index) => (
						<ProblemRow key={name} difficulty={difficulty} name={name} loading={loading} index={index} />
					))}
				</table>
			</div>
		</div>
	)
}

export default ProblemTable
