import { Difficulty } from '@/types/AlgorithmProblem'
import Link from 'next/link'
import React from 'react'
import { capitalizeFirstLetter } from '@/utils/capitalizeFirstLetter'
import { Check, Activity } from 'react-feather'
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
					!!(index % 2) ? 'bg-gray-200/80' : 'bg-transparent'
				} group cursor-pointer transition-shadow`}
			>
				<td className="relative w-10 whitespace-nowrap">
					<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-sm text-clr-text">
						<div className="h-[3px] w-5 bg-gray-400" />
						{/* <Activity className="w-5 h-5 text-mustard" /> */}
						{/* <Check className="w-5 h-5 text-olive" /> */}
					</div>
				</td>
				<td className="whitespace-nowrap px-6 py-4">
					<div className="text-base font-semibold text-clr-text transition-colors group-hover:text-clr-accent">
						{name}
					</div>
				</td>
				<td className="whitespace-nowrap px-6 py-4">
					<div className="text-sm text-clr-text">47.5%</div>
				</td>
				<td className="whitespace-nowrap px-6 py-4">
					<div className="text-sm text-clr-text">34.6k</div>
				</td>
				<td className="whitespace-nowrap px-6 py-4">
					<span className="inline-flex text-sm font-semibold leading-5">
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
