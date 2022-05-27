import React from 'react'
import { Frown } from 'react-feather'

interface NoRoomsProps {}

const NoRooms: React.FC<NoRoomsProps> = ({}) => {
	return (
		<div className="p-4">
			<h3 className="text-center text-lg font-semibold">
				Seems like you are not bart of any chat rooms <Frown className="inline h-6 w-6" />
			</h3>
		</div>
	)
}

export default NoRooms
