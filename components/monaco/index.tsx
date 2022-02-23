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
		<div className="max-h-full-wo-nav relative w-full">
			<Editor
				height={'100%'}
				className="max-h-full-wo-nav h-full-wo-nav"
				defaultLanguage="typescript"
				theme="vs-dark"
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
		</div>
	)
}

// MonacoEditor.displayName = 'monaco-editor'

export default MonacoEditor
