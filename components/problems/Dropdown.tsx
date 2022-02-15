import React, { useRef, useState } from 'react'
import { ArrowDown } from 'react-feather'
import useClickOutside from 'hooks/useClickOutside'
interface DropdownProps {
	title: string
}

const Dropdown: React.FC<DropdownProps> = ({ title, children }) => {
	const [open, setOpen] = useState(false)
	const divRef = useRef<HTMLDivElement>(null)

	useClickOutside(divRef, () => {
		setOpen(false)
	})

	return (
		<div
			ref={divRef}
			className="cursor-pointer relative px-3 py-1 bg-gray-200 text-gray-800 dark:text-gray-200 dark:bg-gray-800 rounded-md flex-shrink-0 flex items-center"
			onClick={() => {
				setOpen((c) => !c)
			}}
		>
			{/* Rotate the arrow 180deg if the dropdown is open */}
			{title} <ArrowDown className={`w-5 ml-1 transition-transform ${open ? 'rotate-180' : ''}`} />
			{open && (
				<div className="px-3 py-1.5 -ml-3 min-w-[155%] absolute mt-1 top-[100%] rounded-md bg-gray-200 dark:bg-gray-800 shadow-sm">
					{children}
				</div>
			)}
		</div>
	)
}

export default Dropdown