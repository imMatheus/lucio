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
			className={`relative rounded-md border bg-gray-200 dark:bg-gray-800 ${
				checked ? 'border-clr-accent-400' : 'border-black dark:border-gray-700'
			} overflow-hidden`}
		>
			<div className="relative aspect-video w-full p-2 lg:w-72">{children}</div>
			<div className="flex items-center gap-2 px-3 py-2 text-sm">
				<input type="radio" className="text-clr-accent-500" name="theme" id={id} defaultChecked={checked} />
				{/* TODO add arial labels */}
				<label
					htmlFor={id}
					className="absolute inset-0 cursor-pointer bg-transparent"
					onClick={onClick}
				></label>
				{label}
			</div>
		</div>
	)
}

export default ThemeCard
