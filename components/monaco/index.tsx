import React, { useEffect, useLayoutEffect, useRef } from 'react'

import Editor from '@monaco-editor/react'
import { editor } from 'monaco-editor'

interface Props {
	// handleEditorDidMount: (editor: editor.IStandaloneCodeEditor) => void
}

const MonacoEditor: React.FC<Props> = () => {
	// const MonacoEditor = React.forwardRef<editor.IStandaloneCodeEditor | null, Props>(({ handleEditorDidMount }, ref) => {
	// const wrapperRef = useRef<HTMLDivElement>(null)

	function handleEditorValidation(markers: any) {
		markers.forEach((marker: any) => console.log('onValidate:', marker.message))
	}

	return (
		<div className="max-h-full-wo-nav h-full-wo-nav relative w-full overflow-y-scroll bg-blue-500">
			<div className="max-h-full-wo-nav h-full-wo-nav relative grid grid-rows-[1fr_auto] bg-rose-600">
				<Editor
					height={'100%'}
					// className=""
					defaultLanguage="typescript"
					// theme="vs-dark"
					options={{
						scrollBeyondLastLine: true,
						minimap: {
							enabled: false
						},
						scrollbar: {
							alwaysConsumeMouseWheel: false
						},
						fontSize: 16,
						// cursorStyle: 'block',
						wordWrap: 'on',
						// wordWrap: 'wordWrapColumn',
						// wordWrapColumn: 90,

						// try "same", "indent" or "none"
						wrappingIndent: 'same'
					}}
					defaultValue="// let's write some broken code 😈"
					onValidate={(markers) => handleEditorValidation(markers)}
				/>
				<div className="flex justify-end gap-4 border-y border-y-gray-400 bg-theme-900 p-6 dark:border-y-gray-500 dark:bg-theme-800">
					<button className="btn-shadow-3">Run code</button>
					<button className="btn-shadow-4">Submit</button>
				</div>
			</div>
			<div className="bg-amber-900 p-10">Hello world</div>
		</div>
	)
}

// MonacoEditor.displayName = 'monaco-editor'

export default MonacoEditor
