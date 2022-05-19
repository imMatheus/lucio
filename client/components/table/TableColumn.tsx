import React from 'react'

const Column: React.FC = ({ children }) => {
	return (
		<th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-clr-bg-grayed">
			{children}
		</th>
	)
}

export default Column
