import React from 'react'

interface NoClassesProps {}

const NoClasses: React.FC<NoClassesProps> = ({}) => {
	return (
		<div className="p-3 md:p-16 text-center absolute top-1/2 -translate-y-1/2 left-0 right-0">
			<h1 className="text-2xl md:text-4xl lg:text-6xl mb-3">Seems like you dont have any classes :\</h1>
			<p className="text-sm md:text-base m-0">You can join a class or you can create a class</p>
		</div>
	)
}

export default NoClasses
