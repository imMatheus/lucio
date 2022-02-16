import React from 'react'
import Navbar from '@/components/navbar'
import Toast from '@/components/toast'
import { useModal } from '@/context/ModalContext'
import MarkdownModal from '@/components/modals/MarkdownModal'

const Layout: React.FC = ({ children }) => {
	const { showModal, modal } = useModal()
	return (
		<div className="min-h-screen bg-gray-100 text-gray-900 accent-theme dark:bg-gray-900 dark:text-gray-100">
			{/* <section className="min-h-screen flex flex-col accent-theme dark:dark-mode"> */}

			<Toast />
			<Navbar />
			<div className="">{children}</div>
			{/* <div className="prose dark:prose-invert max-w-none">{children}</div> */}
			{showModal && modal}
		</div>
	)
}

export default Layout
