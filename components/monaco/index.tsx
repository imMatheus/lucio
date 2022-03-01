import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import Editor, { useMonaco } from '@monaco-editor/react'
import { editor } from 'monaco-editor'
import Button from '@/components/button'
import Loader from './Loader'
import TestCases from './TestCases'
import { Italic, Sun } from 'react-feather'
import Options from './Options'
import useLocalStorage from '@/hooks/useLocalStorage'
import { useEditorSettings } from '@/context/EditorSettingsContext'
import themes from './themes'
import { generator } from '@/utils/editor/startingcode'
import { Data } from '@/api/problems/[problemName]'

interface Props {
	problem: Data
}

const MonacoEditor = React.forwardRef<HTMLDivElement, Props>(({ problem }, ref) => {
	const { editorSettings, setEditorSettings } = useEditorSettings()
	const monaco = useMonaco()
	const [code, setCode] = useLocalStorage(
		`${problem?._id}-${editorSettings.language}`,
		generator[editorSettings.language]('adam')
	)

	useEffect(() => {
		// all available themes - https://editor.bitwiser.in/
		if (monaco) {
			// adds alla themes to the editor instance
			for (const [key, value] of Object.entries(themes)) {
				monaco.editor.defineTheme(key, value)
			}
			monaco.editor.setTheme(editorSettings.theme)
		}
	}, [monaco])

	// useEffect(() => {
	// 	setCode(generator[editorSettings.language]('adam'))
	// }, [editorSettings.language])

	return (
		<div className="md:max-h-full-wo-nav md:h-full-wo-nav h-screen w-screen overflow-y-scroll md:w-full">
			{editorSettings.zenMode && (
				<button
					className="rounded-4 fixed bottom-7 right-7 z-50 rounded-md border border-gray-200 bg-gray-900 px-3 py-1.5 font-light text-gray-100"
					onClick={() => {
						setEditorSettings({ ...editorSettings, zenMode: false })
					}}
				>
					Click to disable zen mode
				</button>
			)}
			<div
				ref={ref}
				className="h-full-wo-nav grid min-w-[100vw] max-w-[100vw] grid-cols-1 grid-rows-[auto_1fr_auto] overflow-y-scroll md:h-full md:w-[60vw] md:min-w-[350px] md:max-w-[65vw] lg:max-w-[80vw]"
			>
				<Options />

				<Editor
					wrapperProps={{
						style: {
							position: editorSettings.zenMode ? 'static' : 'relative',
							display: 'flex',
							textAlign: 'initial',
							width: '100%',
							height: '100%'
						}
						// style: 'padding:10px;position:absolute;'
						// className: '!p-1 !background-red-500 !block'
					}}
					className={editorSettings.zenMode ? '!absolute top-0 left-0 h-screen w-screen' : ''}
					height={'100%'}
					language={editorSettings.language}
					value={code}
					onChange={(val) => setCode(val || '')}
					theme={editorSettings.theme}
					options={{
						scrollBeyondLastLine: false,
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
						// wordWrapBreakAfterCharacters: 'continue',

						// try "same", "indent" or "none"
						wrappingIndent: 'same'
					}}
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
