import { Difficulty } from '@/types/AlgorithmProblem'
import Link from 'next/link'
import React from 'react'

interface TableRowProps {
	name: string
	loading: boolean
	difficulty: Difficulty
	index: number
}

const TableRow: React.FC<TableRowProps> = ({ name, loading, difficulty, index }) => {
	return (
		<Link passHref={true} href={`/problems/${name}`}>
			<tr
				className={`${
					!(index % 2) ? 'bg-neutral-200/80 dark:bg-neutral-800' : 'bg-transparent'
				} hover:shadow-inner transition-shadow cursor-pointer`}
			>
				<td className="px-6 py-4 whitespace-nowrap">
					<div className="text-base text-gray-900 dark:text-gray-100 font-semibold">{name}</div>
				</td>
				<td className="px-6 py-4 whitespace-nowrap">
					<div className="text-sm text-gray-900 dark:text-gray-100">47.5%</div>
				</td>
				<td className="px-6 py-4 whitespace-nowrap">
					<span className="inline-flex text-sm leading-5 font-semibold">
						{difficulty === 'easy' ? (
							<span className="text-green-700">{difficulty}</span>
						) : difficulty === 'medium' ? (
							<span className="text-yellow-700">{difficulty}</span>
						) : (
							<span className="text-red-700">{difficulty}</span>
						)}
					</span>
				</td>
			</tr>
		</Link>
	)
}

export default TableRow
