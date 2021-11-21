import React from 'react'
import Navbar from '@/components/Navbar'
import Toast from '@/components/Toast'

const Layout: React.FC = ({ children }) => {
	return (
		<section className="bg-bg800 min-h-screen flex flex-col">
			<Toast />
			<Navbar />
			{children}
		</section>
	)
}

export default Layout
