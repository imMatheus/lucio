import React from 'react'

const Wrapper: React.FC = ({ children }) => {
	return (
		<div className="max-w-7xl mx-auto py-3 px-3 sm:px-6 lg:px-8">
			<div className="flex items-center justify-between flex-wrap">{children}</div>
		</div>
	)
}

export default Wrapper
