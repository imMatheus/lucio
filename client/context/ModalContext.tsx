import React, { createContext, useContext, useState } from 'react'
import SignInModal from '@/components/modals/SignInModal'
import MarkdownModal from '@/components/modals/MarkdownModal'
import EditorSettingsModal from '@/components/modals/EditorSettingsModal'

type Modals = 'sign-in' | 'markdown' | 'editor'
interface Context {
	showModal: boolean
	setShowModal: React.Dispatch<React.SetStateAction<boolean>>
	modal: JSX.Element
	setModal: React.Dispatch<React.SetStateAction<Modals>>
}

const ModalContext = createContext<Context>({
	showModal: false,
	setShowModal: () => null,
	modal: <SignInModal />,
	setModal: () => null
})

export function useModal() {
	return useContext(ModalContext)
}

export const ModalProvider: React.FC = ({ children }) => {
	const [_modal, setModal] = useState<Modals>('sign-in')
	const [showModal, setShowModal] = useState(false)

	const modals: { [key in Modals]: JSX.Element } = {
		markdown: <MarkdownModal />,
		'sign-in': <SignInModal />,
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
