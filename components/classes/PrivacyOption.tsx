import React from 'react'
import { PrivacyEnum } from '@/types/ClassType'
import type { Icon } from 'react-feather'

interface PrivacyOptionProps {
	Icon: Icon
	id: string
	value: PrivacyEnum
	setPrivacy: React.Dispatch<React.SetStateAction<PrivacyEnum>>
	privacy: PrivacyEnum
}

const PrivacyOption: React.FC<PrivacyOptionProps> = ({ Icon, id, value, privacy, setPrivacy, children }) => {
	return (
		<div className="flex items-center accent-theme">
			<input
				onClick={() => setPrivacy(value)}
				type="radio"
				id={id}
				name="privacy_value"
				value={value}
				checked={privacy === value}
				onChange={() => setPrivacy(value)}
				className="w-4 h-4 lg:w-5 lg:h-5 shadow-md border border-neutral-500/60 focus:ring-0 !ring-0 focus:ring-transparent !outline-0 text-theme-600"
			/>

			<label htmlFor={id} className="ml-3 flex items-center" onClick={() => setPrivacy(value)}>
				<Icon className="w-5 h-5 flex-shrink-0 text-neutral-900 dark:text-neutral-200/80" />
				<p className="break-words m-0 ml-2 text-sm lg:text-base text-neutral-900 dark:text-neutral-200/80 pt-0.5">
					{children}
				</p>
			</label>
		</div>
	)
}

export default PrivacyOption
