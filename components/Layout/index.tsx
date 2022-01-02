import React from 'react'
import Navbar from '@/components/Navbar'
import Toast from '@/components/Toast'
import Head from 'next/head'
import { useModal } from '@/context/ModalContext'
import MarkdownModal from '@/components/modals/MarkdownModal'
const Layout: React.FC = ({ children }) => {
	const { showModal, modal } = useModal()
	return (
		<section className="bg-bg min-h-screen flex flex-col accent-theme">
			{/* <section className="bg-bg min-h-screen flex flex-col accent-theme dark:dark-mode"> */}
			<Head>
				<body className="bg-bg" />
			</Head>
			<Toast />
			<Navbar />
			<div className="prose dark:prose-invert max-w-none">{children}</div>
			{showModal && modal}
		</section>
	)
}

export default Layout
