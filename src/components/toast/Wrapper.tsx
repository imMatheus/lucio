import React from 'react'

interface WrapperProps {
	children: React.ReactNode
}

const Wrapper: React.FC<WrapperProps> = ({ children }) => {
	return (
		<div className="mx-auto max-w-7xl py-3 px-3 sm:px-6 lg:px-8">
			<div className="flex flex-wrap items-center justify-between">{children}</div>
		</div>
	)
}

export default Wrapper
