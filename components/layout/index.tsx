import React from 'react'
import Navbar from '@/components/navbar'
import Toast from '@/components/toast'
import { useModal } from '@/context/ModalContext'
import useDarkMode from '@/hooks/useDarkMode'

const Layout: React.FC = ({ children }) => {
	const { showModal, modal } = useModal()
	useDarkMode()
	return (
		<div className="min-h-screen bg-gray-100 text-gray-900 accent-theme dark:bg-gray-900 dark:text-gray-100">
			<Toast />
			<Navbar />
			{children}
			{showModal && modal}
		</div>
	)
}

export default Layout
