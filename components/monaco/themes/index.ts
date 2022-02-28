// types
import { Theme } from '@/context/EditorSettingsContext'
import { editor } from 'monaco-editor'

import dracula from './dracula'
import monokai from './monokai'
import hallowsEve from './HallowsEve'
import cobalt from './cobalt'

// 'light', 'vs-dark' and 'hc-black' dont need to be added as they come with monaco editor
type ExtraThemes = Exclude<Theme, 'light' | 'vs-dark' | 'hc-black'>

const themes: { [key in ExtraThemes]: editor.IStandaloneThemeData } = { dracula, monokai, hallowsEve, cobalt }

export default themes
