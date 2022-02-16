import React, { useEffect } from 'react'
import useLocalStorage from './useLocalStorage'
import useMedia from './useMedia'

export type themes = 'dark' | 'light' | 'system'

export default function useDarkMode() {
	// Use our useLocalStorage hook to persist state through a page refresh.
	// Read the recipe for this hook to learn more: usehooks.com/useLocalStorage
	const [state, setState] = useLocalStorage<themes>('dark-mode-enabled', 'dark')
	// See if user has set a browser or OS preference for dark mode.
	// The usePrefersDarkMode hook composes a useMedia hook (see code below).
	const prefersDarkMode = usePrefersDarkMode()

	// This allows user to override OS level setting on our website.
	// Fire off effect that add/removes dark mode class
	useEffect(
		() => {
			if (!window) return
			const enabled = state === 'system' ? (prefersDarkMode ? 'dark' : 'light') : state

			const className = 'dark'
			const element = window!.document?.body
			if (enabled === 'dark') {
				element.classList.add(className)
			} else {
				element.classList.remove(className)
			}
		},
		[prefersDarkMode, state] // Only re-call effect when value changes
	)
	// Return enabled state and setter
	return [state, setState] as [themes, (value: themes | ((val: themes) => themes)) => void]
}

function usePrefersDarkMode() {
	return useMedia<boolean>(['(prefers-color-scheme: dark)'], [true], false)
}
