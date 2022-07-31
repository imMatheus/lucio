import React from 'react'
import Navbar from '@/components/navbar'
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
		<div className="min-h-screen bg-clr-bg text-clr-text accent-clr-accent">
			<Navbar />
			{children}
			{showModal && modal}
		</div>
	)
}

export default Layout
