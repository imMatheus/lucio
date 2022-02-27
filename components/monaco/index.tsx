import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import Editor from '@monaco-editor/react'
import { editor } from 'monaco-editor'
import Button from '@/components/button'
import Loader from './Loader'
import TestCases from './TestCases'
import { Italic, Sun } from 'react-feather'
import Options from './Options'
import useLocalStorage from '@/hooks/useLocalStorage'
import { useEditorSettings } from '@/context/EditorSettingsContext'

const MonacoEditor = React.forwardRef<HTMLDivElement>(({}, ref) => {
	const { editorSettings, setEditorSettings } = useEditorSettings()

	function handleEditorValidation(markers: any) {
		markers.forEach((marker: any) => console.log('onValidate:', marker.message))
	}

	return (
		<div className="max-h-full-wo-nav h-full-wo-nav relative w-full overflow-y-scroll">
			<div
				ref={ref}
				className="grid h-full w-full min-w-[max(30vw,_250px)] max-w-[65vw] grid-cols-1 grid-rows-[auto_1fr_auto] overflow-y-scroll lg:max-w-[80vw]"
			>
				<Options />

				<Editor
					height={'100%'}
					// defaultLanguage={language}
					language={editorSettings.language}
					theme={editorSettings.theme}
					options={{
						scrollBeyondLastLine: true,
						automaticLayout: true,
						minimap: {
							enabled: editorSettings.minimap
						},
						scrollbar: {
							alwaysConsumeMouseWheel: false
						},
						fontSize: editorSettings.fontSize,
						cursorStyle: editorSettings.cursorStyle,
						wordWrap: 'on',
						lineNumbers: editorSettings.showLineNumber ? 'on' : 'off',
						// wordWrap: 'wordWrapColumn',
						// wordWrapColumn: 90,

						// try "same", "indent" or "none"
						wrappingIndent: 'same'
					}}
					// defaultValue="// let's write some broken code 😈"
					onValidate={(markers) => handleEditorValidation(markers)}
				/>

				<div className="flex max-w-full flex-wrap justify-end gap-4 border-y border-y-gray-700 bg-gray-200 p-6 dark:border-y-gray-500 dark:bg-gray-800">
					<Button variant="primary">Run code</Button>
					<Button variant="success">Submit</Button>
				</div>
			</div>

			<TestCases />
			<Loader />
		</div>
	)
})

MonacoEditor.displayName = 'monaco-editor'

export default MonacoEditor
