import React, { useRef, useEffect } from 'react'
import { useModal } from '@/context/ModalContext'
import { X, Mail, Lock } from 'react-feather'
import Button from '@/components/button'
import { marked } from 'marked'
import hljs from 'highlight.js'
// import 'highlight.js/styles/night-owl.css'

const Section: React.FC<{ markdown: string }> = ({ markdown }) => {
	const divRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if (divRef.current) {
			marked.setOptions({
				renderer: new marked.Renderer(),
				highlight: function (code, lang) {
					const language = hljs.getLanguage(lang) ? lang : 'plaintext'
					return hljs.highlight(code, { language }).value
				},
				langPrefix: 'hljs language-', // highlight.js css expects a top-level 'hljs' class.
				pedantic: false,
				gfm: true,
				breaks: false,
				sanitize: false,
				smartLists: true,
				smartypants: false,
				xhtml: false
			})

			divRef.current.innerHTML = marked.parse(markdown)
		}
	}, [markdown])
	return (
		<div className="bg-gray-200/50 border-b px-4 border-b-gray-400 mb-1 prose flex justify-between items-center prose-headings:m-0">
			<div>
				<p className="text-black text-base font-semibold">{markdown}</p>
			</div>
			<div ref={divRef}></div>
		</div>
	)
}

const SignInModal: React.FC = () => {
	const { setShowModal } = useModal()

	return (
		<div
			className="fixed z-10 inset-0 overflow-y-auto"
			aria-labelledby="modal-title"
			role="dialog"
			aria-modal="true"
		>
			<div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
				<div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

				<span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
					&#8203;
				</span>

				<div className="p-4 pb-6 max-h-[95vh]  inline-block align-bottom bg-white rounded-lg text-left overflow-x-hidden overflow-y-scroll shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full prose">
					<div
						className="absolute top-2 left-2 cursor-pointer p-1 hover:bg-gray-100 transition-colors rounded-full"
						onClick={() => {
							setShowModal(false)
						}}
					>
						<X className="text-black" />
					</div>
					<h2 className="text-center m-0 mb-2 text-4xl">Markdown</h2>
					<p className="text-center">sign into your Luciocode markdown</p>
					<Section markdown="# h1" />
					<Section markdown="## h2" />
					<Section markdown="### h3" />
					<Section markdown="this is **bold text**" />
					<Section markdown="this is *italic text*" />
					<Section markdown={`1. First item \n 2. Second item \n 3. Third item`} />
				</div>
			</div>
		</div>
	)
}

export default SignInModal
