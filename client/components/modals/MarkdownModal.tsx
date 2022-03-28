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
		<div className="prose mb-1 flex items-center justify-between border-b border-b-gray-400 bg-gray-200/50 px-4 prose-headings:m-0">
			<div>
				<p className="text-base font-semibold text-black">{markdown}</p>
			</div>
			<div ref={divRef}></div>
		</div>
	)
}

const SignInModal: React.FC = () => {
	const { setShowModal } = useModal()

	return (
		<div
			className="fixed inset-0 z-10 overflow-y-auto"
			aria-labelledby="modal-title"
			role="dialog"
			aria-modal="true"
		>
			<div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
				<div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

				<span className="hidden sm:inline-block sm:h-screen sm:align-middle" aria-hidden="true">
					&#8203;
				</span>

				<div className="prose inline-block max-h-[95vh]  transform overflow-x-hidden overflow-y-scroll rounded-lg bg-white p-4 pb-6 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle">
					<div
						className="absolute top-2 left-2 cursor-pointer rounded-full p-1 transition-colors hover:bg-gray-100"
						onClick={() => {
							setShowModal(false)
						}}
					>
						<X className="text-black" />
					</div>
					<h2 className="m-0 mb-2 text-center text-4xl">Markdown</h2>
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
