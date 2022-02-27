import React, { createContext, useContext, useState } from 'react'
import useLocalStorage from '@/hooks/useLocalStorage'

export type FontSize = 10 | 12 | 14 | 16 | 18 | 20
export type CursorStyle = 'line' | 'block' | 'underline' | 'line-thin' | 'block-outline' | 'underline-thin'
export type Language = 'javascript' | 'typescript' | 'python' | 'cpp'
export type Theme = 'light' | 'vs-dark' | 'hc-black'

export interface Settings {
	fontSize: FontSize
	showLineNumber: boolean
	minimap: boolean
	cursorStyle: CursorStyle
	language: Language
	theme: Theme
}

const defaultSettings: Settings = {
	fontSize: 16,
	showLineNumber: true,
	minimap: false,
	cursorStyle: 'line',
	language: 'javascript',
	theme: 'light'
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

export const EditorSettingsProvider: React.FC = ({ children }) => {
	const [settings, setSettings] = useLocalStorage('editor-settings', defaultSettings)

	const value = {
		editorSettings: settings,
		setEditorSettings: setSettings
	}

	return <EditorSettingsContext.Provider value={value}>{children}</EditorSettingsContext.Provider>
}
