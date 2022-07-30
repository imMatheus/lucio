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
		<div className="inline-block w-full py-2 align-middle">
			<div className="overflow-hidden overflow-x-scroll rounded-t-lg border-b border-gray-200 shadow">
				<table className="my-0 min-w-full divide-y divide-gray-200">
					<thead className="bg-clr-bg">
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
