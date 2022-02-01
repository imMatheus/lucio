import React, { useState, useEffect } from 'react'
import { useToast, ToastType } from '@/context/ToastContext'
import useTimeout from '@/hooks/useTimeout'
import Wrapper from './Wrapper'
import Text from './Text'
import ErrorToast from './Error'
import WarningToast from './Warning'
import SuccessToast from './Success'
import InfoToast from './Info'

function useDebounce(callback: () => void, delay: number, dependency: any[]) {
	const { clear, reset } = useTimeout(callback, delay)
	useEffect(reset, [...dependency, reset])
	useEffect(clear, [])
}

export default function Toast() {
	const { toast, setToast } = useToast()
	const type = toast.type
	// useDebounce(() => setToast({ message: null, type: 'info' }), 30000, [toast])

	if (!toast.message) return <></>
	if (type === 'error') return <ErrorToast />
	if (type === 'warning') return <WarningToast />
	if (type === 'success') return <SuccessToast />
	if (type === 'info') return <InfoToast />

	// if none of the following where true, something is wrong so  we show warning
	return <WarningToast />
}
