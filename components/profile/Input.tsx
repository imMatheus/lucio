import React from 'react'

interface InputProps {
	id: string
	label: string
	placeholder: string
	type: React.HTMLInputTypeAttribute
	autoComplete: string
}

const Input: React.FC<InputProps> = ({ id, label, placeholder, type, autoComplete }) => {
	return (
		<div className="mb-3">
			<label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-200">
				{label}
			</label>
			<input
				type={type}
				name="name"
				placeholder={placeholder}
				id={id}
				autoComplete={autoComplete}
				className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-theme-500 focus:ring-theme-500 dark:border-gray-700 dark:bg-black sm:text-sm"
			/>
		</div>
	)
}

export default Input
