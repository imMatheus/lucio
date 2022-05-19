import React from 'react'
import Navbar from '@/components/navbar'
import Toast from '@/components/toast'
import { useModal } from '@/context/ModalContext'
import useDarkMode from '@/hooks/useDarkMode'

const Layout: React.FC = ({ children }) => {
	const { showModal, modal } = useModal()

	// make sure that the code inside the function always runs to change theme
	const [] = useDarkMode()

	return (
		<div className="min-h-screen bg-gray-100 text-gray-900 accent-clr-accent">
			<Toast />
			<Navbar />
			{children}
			{showModal && modal}
		</div>
	)
}

export default Layout
