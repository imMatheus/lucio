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
	console.log('name: ', name)

	return (
		<Link passHref={true} href={`/problems/${name.toLowerCase().split(' ').join('-')}`}>
			<tr
				className={`${
					!(index % 2) ? 'bg-gray-200 dark:bg-gray-700' : 'bg-transparent'
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
							<span className="text-green-800 bg-green-100 border-green-700 border px-2 py-0.5 rounded-lg">
								{difficulty}
							</span>
						) : difficulty === 'medium' ? (
							<span className="text-yellow-800 bg-yellow-100 border-yellow-700 border px-2 py-0.5 rounded-lg">
								{difficulty}
							</span>
						) : (
							<span className="text-red-800 bg-red-100 border-red-700 border px-2 py-0.5 rounded-lg">
								{difficulty}
							</span>
						)}
					</span>
				</td>
			</tr>
		</Link>
	)
}

export default TableRow
