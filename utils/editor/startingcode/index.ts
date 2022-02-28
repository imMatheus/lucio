import { Language } from '@/context/EditorSettingsContext'

import { cppStartedCode } from './cpp'
import { goStartedCode } from './go'
import { javaStartedCode } from './java'
import { javascriptStartedCode } from './javascript'
import { pythonStartedCode } from './python'
import { typescriptStartedCode } from './typescript'

const generator: {
	[key in Language]: (name: string) => string
} = {
	cpp: cppStartedCode,
	go: goStartedCode,
	javascript: javascriptStartedCode,
	java: javaStartedCode,
	python: pythonStartedCode,
	typescript: typescriptStartedCode
}

export {
	generator,
	cppStartedCode,
	goStartedCode,
	javaStartedCode,
	javascriptStartedCode,
	pythonStartedCode,
	typescriptStartedCode
}
