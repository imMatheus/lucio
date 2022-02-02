import React from 'react'
import Navbar from '@/components/navbar'
import Toast from '@/components/toast'
import { useModal } from '@/context/ModalContext'
import MarkdownModal from '@/components/modals/MarkdownModal'

const Layout: React.FC = ({ children }) => {
	const { showModal, modal } = useModal()
	return (
		<main className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen accent-theme">
			{/* <section className="min-h-screen flex flex-col accent-theme dark:dark-mode"> */}

			<Toast />
			<Navbar />
			<div className="">{children}</div>
			{/* <div className="prose dark:prose-invert max-w-none">{children}</div> */}
			{showModal && modal}
		</main>
	)
}

export default Layout
