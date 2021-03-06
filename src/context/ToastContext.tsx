import React, { createContext, useContext, useState } from 'react'

export type ToastType = 'info' | 'warning' | 'success' | 'error'

interface Toast {
	message: string | null
	type: ToastType
}

interface Context {
	toast: Toast
	setToast: React.Dispatch<React.SetStateAction<Toast>>
}

const ToastContext = createContext<Context>({
	toast: { message: null, type: 'info' },
	setToast: () => null
})

export function useToast() {
	return useContext(ToastContext)
}

interface ToastProps {
	children: React.ReactNode
}

export const ToastProvider: React.FC<ToastProps> = ({ children }) => {
	const [toast, setToast] = useState<Toast>({
		message: '',
		type: 'info'
	})

	const value = {
		toast,
		setToast
	}
	return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
}
