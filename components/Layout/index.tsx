import React from 'react'
import Navbar from '@/components/Navbar'
import Toast from '@/components/Toast'
import Head from 'next/head'

const Layout: React.FC = ({ children }) => {
	return (
		<section className="bg-bg min-h-screen flex flex-col accent-theme">
			{/* <section className="bg-bg min-h-screen flex flex-col accent-theme dark:dark-mode"> */}
			<Head>
				<body className="bg-bg" />
			</Head>
			<Toast />
			<Navbar />
			<div className="prose dark:prose-invert max-w-none">{children}</div>
		</section>
	)
}

export default Layout
