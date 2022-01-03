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
			className="relative px-2 py-1 bg-neutral-200 text-neutral-700 dark:text-neutral-100 dark:bg-neutral-700 rounded-md flex-shrink-0 flex items-center"
			onClick={() => {
				setOpen((c) => !c)
			}}
		>
			{title} <ArrowDown className={`w-5 ml-1 transition-transform ${open ? 'rotate-180' : ''}`} />
			{open && (
				<div className="px-3 py-1.5 -ml-2 min-w-[155%] absolute mt-1 top-[100%] rounded-md bg-neutral-200 dark:bg-neutral-700 shadow-2xl">
					{children}
				</div>
			)}
		</div>
	)
}

export default Dropdown
