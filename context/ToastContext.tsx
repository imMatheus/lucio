import React, { createContext, useContext, useState } from 'react'

interface Context {
    toastMessage: string | null
    setToastMessage: React.Dispatch<React.SetStateAction<string | null>>
}

const ToastContext = createContext<Context>({
    toastMessage: null,
    setToastMessage: () => null,
})

export function useToast() {
    return useContext(ToastContext)
}

export const ToastProvider: React.FC = ({ children }) => {
    const [toastMessage, setToastMessage] = useState<string | null>(null)

    const value = {
        toastMessage,
        setToastMessage,
    }
    return (
        <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
    )
}
