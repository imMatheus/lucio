import React from 'react'
import { Switch as HeadlessSwitch } from '@headlessui/react'

interface SwitchProps {
	checked: boolean
	onChange: (val: boolean) => any
	srText: string
}

const Switch: React.FC<SwitchProps> = ({ checked, onChange, srText }) => {
	return (
		<HeadlessSwitch
			checked={checked}
			onChange={onChange}
			className={`${
				checked ? 'bg-clr-accent-800' : 'bg-clr-accent-200'
			} relative inline-flex h-6 w-12 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
		>
			<span className="sr-only">{srText}</span>
			<span
				aria-hidden="true"
				className={`${checked ? 'translate-x-6' : 'translate-x-0'}
pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
			/>
		</HeadlessSwitch>
	)
}

export default Switch
