import React from 'react'
import { useModal } from '@/context/ModalContext'
import { useEditorSettings, FontSize, CursorStyle } from '@/context/EditorSettingsContext'
import { X, Type, MousePointer } from 'react-feather'
import Select from '@/components/form/Select'
import { Switch } from '@headlessui/react'

const EditorSettingsModal: React.FC = () => {
	const { setShowModal } = useModal()
	const { editorSettings, setEditorSettings } = useEditorSettings()

	return (
		<div
			className="fixed inset-0 z-10 overflow-y-auto"
			aria-labelledby="modal-title"
			role="dialog"
			aria-modal="true"
		>
			<div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
				{/* A dark overlay */}
				<div className="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="true"></div>

				<span className="hidden sm:inline-block sm:h-screen sm:align-middle" aria-hidden="true">
					&#8203;
				</span>

				<div className="prose prose-gray inline-block max-h-[95vh] transform overflow-x-hidden overflow-y-scroll rounded-lg bg-gray-50 p-4 pb-6 text-left align-bottom shadow-xl transition-all dark:prose-invert dark:bg-gray-900 sm:my-8 sm:w-full sm:max-w-lg sm:align-middle">
					<div
						className="absolute top-2 left-2 cursor-pointer rounded-full p-1 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800/70"
						onClick={() => {
							setShowModal(false)
						}}
					>
						<X className="text-black dark:text-gray-100" />
					</div>
					<h2 className="m-0 mb-2 text-center text-4xl">Editor settings</h2>
					<p className="text-center">Modify your editor preferences</p>

					<div className="mb-5 flex items-end">
						<div className="mr-auto pr-2">
							<h4 className="m-0 -mb-1 text-lg">Font size</h4>
							<p className="m-0 text-sm text-gray-800 dark:text-gray-300">
								Determines the size of the text inside your editor
							</p>
						</div>
						<Select
							name="editor-font_size"
							id="editor-font_size"
							value={editorSettings.fontSize}
							onChange={(e) =>
								setEditorSettings({
									...editorSettings,
									fontSize: parseInt(e.target.value) as FontSize
								})
							}
							Icon={Type}
						>
							<option value={10}>10px</option>
							<option value={12}>12px</option>
							<option value={14}>14px</option>
							<option value={16}>16px</option>
							<option value={18}>18px</option>
							<option value={20}>20px</option>
						</Select>
					</div>

					<div className="mb-5 flex items-end">
						<div className="mr-auto pr-2">
							<h4 className="m-0 -mb-1 text-lg">Show line number</h4>
							<p className="m-0 text-sm text-gray-800 dark:text-gray-300">
								Line numbers will be displayed on the left of your code
							</p>
						</div>
						<Switch
							checked={editorSettings.showLineNumber}
							onChange={(val) => setEditorSettings({ ...editorSettings, showLineNumber: val })}
							className={`${
								editorSettings.showLineNumber ? 'bg-theme-900' : 'bg-theme-400'
							} relative inline-flex h-6 w-12 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
						>
							<span className="sr-only">Use setting</span>
							<span
								aria-hidden="true"
								className={`${editorSettings.showLineNumber ? 'translate-x-6' : 'translate-x-0'}
            pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
							/>
						</Switch>
					</div>

					<div className="mb-5 flex items-end">
						<div className="mr-auto pr-2">
							<h4 className="m-0 -mb-1 text-lg">Show minimap</h4>
							<p className="m-0 text-sm text-gray-800 dark:text-gray-300">
								Minimap will be displayed on the right of your code
							</p>
						</div>
						<Switch
							checked={editorSettings.minimap}
							onChange={(val) => setEditorSettings({ ...editorSettings, minimap: val })}
							className={`${
								editorSettings.minimap ? 'bg-theme-900' : 'bg-theme-400'
							} relative inline-flex h-6 w-12 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
						>
							<span className="sr-only">Use setting</span>
							<span
								aria-hidden="true"
								className={`${editorSettings.minimap ? 'translate-x-6' : 'translate-x-0'}
            pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
							/>
						</Switch>
					</div>

					<div className="mb-5 flex items-end">
						<div className="mr-auto pr-2">
							<h4 className="m-0 -mb-1 text-lg">Cursor style</h4>
							<p className="m-0 text-sm text-gray-800 dark:text-gray-300">
								Change the style of the cursor
							</p>
						</div>
						<Select
							name="editor-cursor_style"
							id="editor-cursor_style"
							value={editorSettings.cursorStyle}
							onChange={(e) =>
								setEditorSettings({ ...editorSettings, cursorStyle: e.target.value as CursorStyle })
							}
							Icon={MousePointer}
						>
							<option value="line">Line</option>
							<option value="line-thin">Line thin</option>
							<option value="block">Block</option>
							<option value="block-outline">Block outline</option>
							<option value="underline">Underline</option>
							<option value="underline-thin">Underline thin</option>
						</Select>
					</div>
				</div>
			</div>
		</div>
	)
}

export default EditorSettingsModal
