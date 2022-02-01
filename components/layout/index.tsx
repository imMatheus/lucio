import React from 'react'
import Navbar from '@/components/navbar'
import Toast from '@/components/toast'
import { useModal } from '@/context/ModalContext'
import MarkdownModal from '@/components/modals/MarkdownModal'
const Layout: React.FC = ({ children }) => {
	const { showModal, modal } = useModal()
	return (
		<section className="bg-neutral-100 dark:bg-neutral-900 min-h-screen flex flex-col accent-theme">
			{/* <section className="min-h-screen flex flex-col accent-theme dark:dark-mode"> */}

			<Toast />
			<Navbar />
			<div className="">{children}</div>
			{/* <div className="prose dark:prose-invert max-w-none">{children}</div> */}
			{showModal && modal}
		</section>
	)
}

export default Layout
