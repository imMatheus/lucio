import React, { createContext, useContext, useState } from 'react'
import EditorSettingsModal from '@/components/modals/EditorSettingsModal'

type Modals = 'editor'
interface Context {
	showModal: boolean
	setShowModal: React.Dispatch<React.SetStateAction<boolean>>
	modal: JSX.Element
	setModal: React.Dispatch<React.SetStateAction<Modals>>
}

const ModalContext = createContext<Context>({
	showModal: false,
	setShowModal: () => null,
	modal: <EditorSettingsModal />,
	setModal: () => null
})

export function useModal() {
	return useContext(ModalContext)
}

interface ModalProps {
	children: React.ReactNode
}

export const ModalProvider: React.FC<ModalProps> = ({ children }) => {
	const [_modal, setModal] = useState<Modals>('editor')
	const [showModal, setShowModal] = useState(false)

	const modals: { [key in Modals]: JSX.Element } = {
		editor: <EditorSettingsModal />
	}

	const value = {
		showModal,
		setShowModal,
		modal: modals[_modal],
		setModal
	}
	return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
}
