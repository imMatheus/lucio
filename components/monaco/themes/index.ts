// types
import { Theme } from '@/context/EditorSettingsContext'
import { editor } from 'monaco-editor'

import dracula from './dracula'
import monokai from './monokai'
import hallowsEve from './hallowsEve'
import cobalt from './cobalt'
import pastel from './pastel'

// 'light', 'vs-dark' and 'hc-black' dont need to be added as they come with monaco editor
type ExtraThemes = Exclude<Theme, 'light' | 'vs-dark' | 'hc-black'>

const themes: { [key in ExtraThemes]: editor.IStandaloneThemeData } = {
	dracula,
	monokai,
	hallowsEve,
	cobalt,
	pastel
} as const

export default themes
