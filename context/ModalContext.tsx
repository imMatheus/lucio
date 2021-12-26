import React, { createContext, useContext, useState } from 'react'

interface Context {
	showModal: boolean
	setShowModal: React.Dispatch<React.SetStateAction<boolean>>
}

const ModalContext = createContext<Context>({
	showModal: false,
	setShowModal: () => null
})

export function useModal() {
	return useContext(ModalContext)
}

export const ModalProvider: React.FC = ({ children }) => {
	const [showModal, setShowModal] = useState(false)

	const value = {
		showModal,
		setShowModal
	}
	return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
}
