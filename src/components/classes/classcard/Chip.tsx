import React from 'react'
import { Icon as IconsType } from 'react-feather'

interface Props {
	Icon?: IconsType
}

const Chip: React.FC<Props> = ({ Icon, children }) => {
	return (
		<span className="m-0 flex w-max items-center rounded-lg bg-gray-800/30 py-1 px-2 text-xs font-normal text-white">
			{Icon && <Icon className="mr-1 h-3 w-3 flex-shrink-0" />}
			{children}
		</span>
	)
}

export default Chip
