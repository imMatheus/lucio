import React from 'react'

interface TextProps {
	smallText?: string
	text?: string
}

const Text: React.FC<TextProps> = ({ text, smallText, children }) => {
	return (
		<p className="ml-3 truncate font-medium text-white">
			<span className="md:hidden">{smallText || text || children}</span>
			<span className="hidden md:inline">{text || children}</span>
		</p>
	)
}

export default Text
