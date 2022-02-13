import React from 'react'

import Editor, { Monaco, EditorProps } from '@monaco-editor/react'

interface indexProps {}

const index: React.FC<indexProps> = ({}) => {
	const options = {
		// scrolling: true,
		inherit: true,
		automaticLayout: true,
		scrollBeyondLastLine: true,
		minimap: {
			enabled: false
		},
		scrollbar: {
			alwaysConsumeMouseWheel: true
		},
		fontSize: 16,
		// cursorStyle: 'block',
		wordWrap: 'on',
		// wordWrap: 'wordWrapColumn',
		// wordWrapColumn: 90,
		// Set this to false to not auto word wrap minified files
		wordWrapMinified: true,
		// try "same", "indent" or "none"
		wrappingIndent: 'same'
	}
	function handleEditorValidation(markers: any) {
		// model markers
		markers.forEach((marker: any) => console.log('onValidate:', marker.message))
	}
	return (
		<div className="bg-blue-500 h-full">
			<h2 className="bg-red-500 text-xl">hej</h2>
			<Editor
				defaultLanguage="typescript"
				theme="vs-dark"
				options={{
					// scrolling: true,
					inherit: true,
					automaticLayout: true,
					scrollBeyondLastLine: true,
					minimap: {
						enabled: false
					},
					scrollbar: {
						alwaysConsumeMouseWheel: true
					},
					fontSize: 16,
					// cursorStyle: 'block',
					wordWrap: 'on',
					// wordWrap: 'wordWrapColumn',
					// wordWrapColumn: 90,
					// Set this to false to not auto word wrap minified files
					wordWrapMinified: true,
					// try "same", "indent" or "none"
					wrappingIndent: 'same'
				}}
				defaultValue="// let's write some broken code 😈"
				onValidate={(markers) => handleEditorValidation(markers)}
			/>
		</div>
	)
}

export default index
