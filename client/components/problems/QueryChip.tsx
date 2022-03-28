import React from 'react'
import { X } from 'react-feather'

interface QueryChipProps {
	title: string
	onClick: () => any
}

const QueryChip: React.FC<QueryChipProps> = ({ title, onClick }) => {
	return (
		<div className="flex items-center rounded-md bg-gray-200 px-2  py-1.5 text-xs text-gray-800 dark:bg-gray-700 dark:text-gray-100 md:px-3 md:text-base">
			<span>{title}</span>
			<div
				className="ml-1.5 flex h-4 w-4 cursor-pointer items-center justify-center rounded-full bg-gray-400/70 transition-colors hover:bg-gray-400 dark:bg-gray-500/70 dark:hover:bg-gray-500 2xl:h-5 2xl:w-5"
				onClick={onClick}
			>
				<X className="w-3" />
			</div>
		</div>
	)
}

export default QueryChip
