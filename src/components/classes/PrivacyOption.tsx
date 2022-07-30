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
		<div className="flex items-center accent-clr-accent">
			<input
				onClick={() => setPrivacy(value)}
				type="radio"
				id={id}
				name="privacy_value"
				value={value}
				checked={privacy === value}
				onChange={() => setPrivacy(value)}
				className="h-4 w-4 border border-clr-border text-clr-accent-600 shadow-md !outline-0 !ring-0 focus:ring-0 focus:ring-transparent lg:h-5 lg:w-5"
			/>

			<label htmlFor={id} className="ml-3 flex items-center" onClick={() => setPrivacy(value)}>
				<Icon className="h-5 w-5 flex-shrink-0 text-clr-text" />
				<p className="m-0 ml-2 break-words pt-0.5 text-sm text-clr-text lg:text-base">{children}</p>
			</label>
		</div>
	)
}

export default PrivacyOption
