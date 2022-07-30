import React from 'react'
import { useModal } from '@/context/ModalContext'
import { useEditorSettings, FontSize, CursorStyle } from '@/context/EditorSettingsContext'
import { X, Type, MousePointer } from 'react-feather'
import Select from '@/components/form/Select'
import Switch from '@/components/form/Switch'

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
			<div className="flex min-h-screen items-center justify-center p-4 text-center sm:block sm:p-0">
				{/* A dark overlay */}
				<div className="bg-clr-bg-grayed/75 fixed inset-0 transition-opacity" aria-hidden="true"></div>

				<span className="hidden sm:inline-block sm:h-screen sm:align-middle" aria-hidden="true">
					&#8203;
				</span>

				<div className="prose prose-gray inline-block max-h-[95vh] transform overflow-x-hidden overflow-y-scroll rounded-lg bg-clr-text p-4 pb-6 text-left align-bottom shadow-xl transition-all dark:prose-invert sm:my-8 sm:w-full sm:max-w-lg sm:align-middle">
					<div
						className="absolute top-2 left-2 cursor-pointer rounded-full p-1 transition-colors hover:bg-clr-bg"
						onClick={() => {
							setShowModal(false)
						}}
					>
						<X className="text-black" />
					</div>
					<h2 className="m-0 mb-2 text-center text-2xl md:text-4xl">Editor settings</h2>
					<p className="text-center text-xs md:text-sm">Modify your editor preferences</p>

					<div className="mb-5 flex items-end">
						<div className="mr-auto pr-2">
							<h4 className="m-0 -mb-1 text-base md:text-lg">Font size</h4>
							<p className="m-0 text-xs text-gray-800 md:text-sm">
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
							<h4 className="m-0 -mb-1 text-base md:text-lg">Show line number</h4>
							<p className="m-0 text-xs text-gray-800 md:text-sm">
								Line numbers will be displayed on the left of your code
							</p>
						</div>
						<Switch
							checked={editorSettings.showLineNumber}
							onChange={(val) => setEditorSettings({ ...editorSettings, showLineNumber: val })}
							srText="Use line numbers"
						/>
					</div>

					<div className="mb-5 flex items-end">
						<div className="mr-auto pr-2">
							<h4 className="m-0 -mb-1 text-base md:text-lg">Show minimap</h4>
							<p className="m-0 text-xs text-gray-800 md:text-sm">
								Minimap will be displayed on the right of your code
							</p>
						</div>
						<Switch
							checked={editorSettings.minimap}
							onChange={(val) => setEditorSettings({ ...editorSettings, minimap: val })}
							srText="Use minimap"
						/>
					</div>

					<div className="mb-5 flex items-end">
						<div className="mr-auto pr-2">
							<h4 className="m-0 -mb-1 text-base md:text-lg">Cursor style</h4>
							<p className="m-0 text-xs text-gray-800 md:text-sm">Change the style of the cursor</p>
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
