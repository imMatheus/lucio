import React from 'react'

interface NoClassesProps {}

const NoClasses: React.FC<NoClassesProps> = ({}) => {
	return (
		<div className="flex justify-center">
			<h2 className="text-xl font-bold">
				Seems like you dont have any classes yet, either join a already existing one or create one of your own
			</h2>
		</div>
	)
}

export default NoClasses
