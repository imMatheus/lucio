import React from 'react'
import Navbar from '@/components/navbar'

import useDarkMode from '@/hooks/useDarkMode'

interface LayoutProps {
	children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
	// make sure that the code inside the function always runs to change theme
	const [] = useDarkMode()

	return (
		<div className="min-h-screen bg-clr-bg text-clr-text accent-clr-accent">
			<Navbar />
			{children}
		</div>
	)
}

export default Layout
