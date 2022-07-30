import React from 'react'

interface PaddingContainerProps {
	children: React.ReactNode
}

const PaddingContainer: React.FC<PaddingContainerProps> = ({ children }) => {
	return <section className="py-8 px-3 sm:px-6 lg:px-8">{children}</section>
}

export default PaddingContainer
