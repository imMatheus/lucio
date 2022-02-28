import React, { useEffect, useState } from 'react'
import { Italic, Sun, Settings } from 'react-feather'
import { useModal } from '@/context/ModalContext'
import { useEditorSettings, Language, Theme } from '@/context/EditorSettingsContext'
import Select from '@/components/form/Select'

const Options: React.FC = () => {
	const { setModal, setShowModal } = useModal()
	const { editorSettings, setEditorSettings } = useEditorSettings()

	//TODO fix this
	const [_, set] = useState('')
	useEffect(() => {
		set('a')
	}, [])

	return (
		<div className="flex flex-wrap items-center gap-2 bg-gray-200 p-2 dark:bg-gray-700">
			<Select
				name="lang"
				id="lang"
				value={editorSettings.language}
				onChange={(e) => {
					setEditorSettings({ ...editorSettings, language: e.target.value as Language })
				}}
				Icon={Italic}
			>
				<option value="cpp">C++</option>
				<option value="go">Go</option>
				<option value="java">Java</option>
				<option value="javascript">Javascript</option>
				<option value="typescript">Typescript</option>
				<option value="python">Python</option>
			</Select>

			<Select
				name="theme"
				id="theme"
				value={editorSettings.theme}
				onChange={(e) => {
					setEditorSettings({ ...editorSettings, theme: e.target.value as Theme })
				}}
				Icon={Sun}
			>
				<option value="light">Light</option>
				<option value="vs-dark">Dark</option>
				<option value="hc-black">Hc black</option>
				<option value="dracula">Dracula</option>
				<option value="monokai">Monokai</option>
				<option value="hallowsEve">Hallows eve</option>
				<option value="cobalt">Cobalt</option>
			</Select>

			<Settings
				className="h-5 w-5 cursor-pointer text-gray-900 dark:text-gray-100"
				role="button"
				onClick={() => {
					setModal('editor')
					setShowModal(true)
				}}
			/>
		</div>
	)
}

export default Options
