import React, { createContext, useContext, useEffect, useState } from 'react'
import useLocalStorage from '@/hooks/useLocalStorage'

export type FontSize = 10 | 12 | 14 | 16 | 18 | 20
export type CursorStyle = 'line' | 'block' | 'underline' | 'line-thin' | 'block-outline' | 'underline-thin'
export type Language = 'javascript' | 'typescript' | 'python' | 'cpp' | 'java' | 'go'
export type Theme = 'light' | 'vs-dark' | 'hc-black' | 'dracula' | 'monokai' | 'hallowsEve' | 'cobalt' | 'pastel'

export interface Settings {
	fontSize: FontSize
	showLineNumber: boolean
	minimap: boolean
	cursorStyle: CursorStyle
	language: Language
	theme: Theme
	zenMode: boolean
}

// if no settings have been changed by the user, this will be their settings
const defaultSettings: Settings = {
	fontSize: 16,
	showLineNumber: true,
	minimap: true,
	cursorStyle: 'line',
	language: 'javascript',
	theme: 'light',
	zenMode: false
}

interface Context {
	editorSettings: Settings
	setEditorSettings: React.Dispatch<React.SetStateAction<Settings>>
}

const EditorSettingsContext = createContext<Context>({
	editorSettings: defaultSettings,
	setEditorSettings: () => null
})

export function useEditorSettings() {
	return useContext(EditorSettingsContext)
}

interface EditorProps {
	children: React.ReactNode
}

export const EditorSettingsProvider: React.FC<EditorProps> = ({ children }) => {
	// works just like useState, but will be cached in local storage
	const [settings, setSettings] = useLocalStorage('editor-settings', defaultSettings)

	useEffect(() => {
		setSettings({ ...settings, zenMode: false })
	}, [])

	const value = {
		editorSettings: settings,
		setEditorSettings: setSettings
	}

	return <EditorSettingsContext.Provider value={value}>{children}</EditorSettingsContext.Provider>
}
