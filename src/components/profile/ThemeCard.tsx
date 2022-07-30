import React from 'react'
interface ThemeCardProps {
	id: string
	label: string
	onClick: () => void
	checked: boolean
	children: React.ReactNode
}

const ThemeCard: React.FC<ThemeCardProps> = ({ id, label, onClick, checked, children }) => {
	return (
		<div
			className={`relative rounded-md border bg-gray-200 ${
				checked ? 'border-clr-accent' : 'border-black'
			} overflow-hidden`}
		>
			<div className="relative aspect-video w-full p-2 lg:w-72">{children}</div>
			<div className="flex items-center gap-2 px-3 py-2 text-sm">
				<input type="radio" className="text-clr-accent" name="theme" id={id} defaultChecked={checked} />
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
