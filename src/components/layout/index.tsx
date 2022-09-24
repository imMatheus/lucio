import React from 'react'
import Navbar from '@/components/navbar'

interface LayoutProps {
	children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
	return (
		<>
			<Navbar />
			{children}
		</>
	)
}

export default Layout
