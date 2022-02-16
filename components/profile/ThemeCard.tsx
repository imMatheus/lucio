import React from 'react'
interface ThemeCardProps {
	id: string
	label: string
	onClick: () => void
	checked: boolean
}

const ThemeCard: React.FC<ThemeCardProps> = ({ id, label, onClick, checked, children }) => {
	return (
		<div
			className={`rounded-md relative border bg-gray-200 dark:bg-gray-800 ${
				checked ? 'border-theme-400' : 'border-black dark:border-gray-700'
			} overflow-hidden`}
		>
			<div className="w-full lg:w-72 aspect-video p-2 relative">{children}</div>
			<div className="flex gap-2 items-center px-3 py-2 text-sm">
				<input type="radio" className="text-theme-500" name="theme" id={id} defaultChecked={checked} />
				{/* TODO add arial labels */}
				<label
					htmlFor={id}
					className="absolute inset-0 bg-transparent cursor-pointer"
					onClick={onClick}
				></label>
				{label}
			</div>
		</div>
	)
}

export default ThemeCard
