import React, { useRef, useState } from 'react'
import { ArrowDown } from 'react-feather'
import useClickOutside from '@/hooks/useClickOutside'
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
			className="relative flex flex-shrink-0 cursor-pointer items-center rounded-md bg-gray-200 px-3 py-1 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
			onClick={() => {
				setOpen((c) => !c)
			}}
		>
			{/* Rotate the arrow 180deg if the dropdown is open */}
			{title} <ArrowDown className={`ml-1 w-5 transition-transform ${open ? 'rotate-180' : ''}`} />
			{open && (
				<div className="absolute top-[100%] -ml-3 mt-1 min-w-[155%] rounded-md bg-gray-200 px-3 py-1.5 shadow-sm dark:bg-gray-800">
					{children}
				</div>
			)}
		</div>
	)
}

export default Dropdown
