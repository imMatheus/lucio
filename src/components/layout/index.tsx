import React from 'react'
import Navbar from '@/components/navbar'
import Toast from '@/components/toast'
import { useModal } from '@/context/ModalContext'
import useDarkMode from '@/hooks/useDarkMode'

interface LayoutProps {
	children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
	const { showModal, modal } = useModal()

	// make sure that the code inside the function always runs to change theme
	const [] = useDarkMode()

	return (
		<div className="accent-clr-accent min-h-screen bg-clr-bg text-clr-text">
			<Toast />
			<Navbar />
			{children}
			{showModal && modal}
		</div>
	)
}

export default Layout
