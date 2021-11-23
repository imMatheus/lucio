import React, { useState, useEffect } from 'react'
import { useToast } from '@/context/ToastContext'
import useTimeout from '@/hooks/useTimeout'

function useDebounce(callback: () => void, delay: number, dependency: any[]) {
	const { clear, reset } = useTimeout(callback, delay)
	useEffect(reset, [...dependency, reset])
	useEffect(clear, [])
}

export default function Toast() {
	const { toastMessage, setToastMessage } = useToast()
	useDebounce(() => setToastMessage(null), 3000, [toastMessage])
	if (!toastMessage) return <></>
	return <div className="p-3 bg-green-300 text-green-700">{toastMessage}</div>
}
