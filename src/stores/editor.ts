import create from 'zustand'

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

const defaultSettings: Settings = {
	fontSize: 16,
	showLineNumber: true,
	minimap: true,
	cursorStyle: 'line',
	language: 'javascript',
	theme: 'light',
	zenMode: false
}

const useEditorStore = create<Settings>((set) => ({
	...defaultSettings
}))
