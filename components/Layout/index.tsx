import React from 'react'
import Navbar from '@/components/Navbar'
import Toast from '@/components/Toast'
import Head from 'next/head'

const Layout: React.FC = ({ children }) => {
	return (
		<section className="bg-bg min-h-screen flex flex-col accent-theme dark:dark-mode">
			<Head>
				<body className="bg-bg" />
			</Head>
			<Toast />
			<Navbar />
			{children}
		</section>
	)
}

export default Layout
