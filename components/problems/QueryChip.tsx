import React from 'react'
import { X } from 'react-feather'

interface QueryChipProps {
	title: string
	onClick: () => any
}

const QueryChip: React.FC<QueryChipProps> = ({ title, onClick }) => {
	return (
		<div className="px-2 py-1.5 text-xs md:px-3 md:text-base  bg-neutral-200 text-neutral-800 dark:bg-neutral-700 dark:text-neutral-100 rounded-md flex items-center">
			<span>{title}</span>
			<div
				className="cursor-pointer rounded-full bg-neutral-400/70 hover:bg-neutral-400 dark:bg-neutral-500/70 dark:hover:bg-neutral-500 w-4 h-4 2xl:w-5 2xl:h-5 ml-1.5 flex justify-center items-center transition-colors"
				onClick={onClick}
			>
				<X className="w-3" />
			</div>
		</div>
	)
}

export default QueryChip
