import React from 'react'
import type { Icon as IconType } from 'react-feather'
import { CLASS_PRIVACY } from '@/constants'
import classNames from 'classnames'

interface PrivacyOptionProps {
	privacy: CLASS_PRIVACY
	value: CLASS_PRIVACY
	setValue: React.Dispatch<React.SetStateAction<CLASS_PRIVACY>>
	label: string
	Icon: IconType
	children: React.ReactNode
}

const PrivacyOption: React.FC<PrivacyOptionProps> = ({ privacy, value, setValue, label, Icon, children }) => {
	const selected = privacy === value

	return (
		<div
			role="radio"
			aria-checked={selected}
			onClick={() => setValue(privacy)}
			className={classNames(
				'flex cursor-pointer items-baseline  gap-2 rounded border p-4 transition-all hover:shadow',
				{
					'border-clr-accent': selected
				}
			)}
		>
			<div
				className={classNames(
					'flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full border-4 transition-colors',
					{
						'border-clr-accent': selected
					}
				)}
			></div>
			<div className="space-y-1">
				<h2 className="flex items-center gap-1 font-bold ">
					<Icon className="h-4 w-4 text-clr-text" />
					{label}
				</h2>
				<p className="text-xs text-clr-text-grayed">{children}</p>
			</div>
		</div>
	)
}

export default PrivacyOption
