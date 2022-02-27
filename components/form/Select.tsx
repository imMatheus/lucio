import React from 'react'
import type { Icon as IconType } from 'react-feather'

interface SelectProps {
	name: string
	id: string
	value: any
	onChange: React.ChangeEventHandler<HTMLSelectElement>
	Icon: IconType
}

const Select: React.FC<SelectProps> = ({ name, id, value, onChange, Icon, children }) => {
	return (
		<div className="relative">
			<select
				name={name}
				id={id}
				value={value}
				onChange={onChange}
				className="rounded-lg border-gray-500 bg-gray-100 py-1.5 pl-7 text-xs shadow-sm dark:bg-gray-800 md:text-sm"
			>
				{children}
			</select>
			<Icon className="absolute top-1/2 left-1.5 h-3 w-3 -translate-y-1/2 text-gray-700 dark:text-gray-300 xl:h-4 xl:w-4" />
		</div>
	)
}

export default Select
