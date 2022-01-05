import { Difficulty } from '@/types/AlgorithmProblem'
import Link from 'next/link'
import React from 'react'
import { capitalizeFirstLetter } from '@/utils/capitalizeFirstLetter'
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
				} transition-shadow cursor-pointer group`}
			>
				<td className="px-6 py-4 whitespace-nowrap">
					<div className="text-base text-gray-900 dark:text-gray-100 font-semibold group-hover:text-theme transition-colors">
						{name}
					</div>
				</td>
				<td className="px-6 py-4 whitespace-nowrap">
					<div className="text-sm text-gray-900 dark:text-gray-100">47.5%</div>
				</td>
				<td className="px-6 py-4 whitespace-nowrap">
					<span className="inline-flex text-sm leading-5 font-semibold">
						{difficulty === 'easy' ? (
							<span className="text-olive">{capitalizeFirstLetter(difficulty)}</span>
						) : difficulty === 'medium' ? (
							<span className="text-mustard">{capitalizeFirstLetter(difficulty)}</span>
						) : (
							<span className="text-ketchup">{capitalizeFirstLetter(difficulty)}</span>
						)}
					</span>
				</td>
			</tr>
		</Link>
	)
}

export default TableRow
