import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import Editor from '@monaco-editor/react'
import { editor } from 'monaco-editor'
import Button from '@/components/button'
import Loader from './Loader'
import TestCases from './TestCases'
import { Italic, Sun } from 'react-feather'

const MonacoEditor = React.forwardRef<HTMLDivElement>(({}, ref) => {
	const [language, setLanguage] = useState('js')
	const [theme, setTheme] = useState('vs-dark')

	function handleEditorValidation(markers: any) {
		markers.forEach((marker: any) => console.log('onValidate:', marker.message))
	}

	console.log(theme)

	return (
		<div className="max-h-full-wo-nav h-full-wo-nav relative w-full overflow-y-scroll">
			<div
				ref={ref}
				className="grid h-full w-full min-w-[max(30vw,_250px)] max-w-[65vw] grid-cols-1 grid-rows-[auto_1fr_auto] overflow-y-scroll lg:max-w-[80vw]"
			>
				<div className="flex flex-wrap gap-2 bg-gray-200 p-2 dark:bg-gray-700">
					<div className="relative">
						<select
							name="lang"
							id="lang"
							defaultValue="python"
							className="rounded-lg border-gray-500 bg-gray-100 py-1.5 pl-7 text-xs shadow-sm dark:bg-gray-800 md:text-sm"
						>
							<option value="cpp">C++</option>
							<option value="js">Javascript</option>
							<option value="ts">Typescript</option>
							<option value="python">Python</option>
							<option value="ruby">Ruby</option>
						</select>
						<Italic className="absolute top-1/2 left-1.5 h-3 w-3 -translate-y-1/2 text-gray-700 dark:text-gray-300 xl:h-4 xl:w-4" />
					</div>
					<div className="relative">
						<select
							name="theme"
							id="theme"
							defaultValue={theme}
							onChange={(e) => {
								setTheme(e.target.value)
								// console.log(val)
							}}
							className="rounded-lg border-gray-500 bg-gray-100 py-1.5 pl-7 text-xs shadow-sm dark:bg-gray-800 md:text-sm"
						>
							<option value="light">Light</option>
							<option value="vs-dark">Dark</option>
							<option value="drakula">Drakula</option>
							<option value="tokyo_night">Tokyo night</option>
						</select>
						<Sun className="absolute top-1/2 left-1.5 h-3 w-3 -translate-y-1/2 text-gray-700 dark:text-gray-300 xl:h-4 xl:w-4" />
					</div>
					{theme}
				</div>
				<Editor
					height={'100%'}
					// className="!w-full"
					defaultLanguage="typescript"
					theme={theme}
					options={{
						scrollBeyondLastLine: true,
						automaticLayout: true,
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
