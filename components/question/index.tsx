import React, { useEffect, useRef } from 'react'
import { marked } from 'marked'

interface QuestionProps {
	markdown: string
}

const Question = React.forwardRef<HTMLElement, QuestionProps>(({ markdown }, ref) => {
	const divRef = useRef<HTMLDivElement>(null)
	// const {markdown} = props
	useEffect(() => {
		if (divRef.current) {
			marked.setOptions({
				renderer: new marked.Renderer()
				// highlight: function (code, lang) {
				//     const language = hljs.getLanguage(lang) ? lang : 'plaintext'
				//     return hljs.highlight(code, { language }).value
				// },
				// langPrefix: 'hljs language-', // highlight.js css expects a top-level 'hljs' class.
				// pedantic: false,
				// gfm: true,
				// breaks: false,
				// sanitize: false,
				// smartLists: true,
				// smartypants: false,
				// xhtml: false
			})

			divRef.current.innerHTML = marked.parse(markdown)
		}
	}, [markdown])

	return (
		<main
			className="bg-gray-100 dark:bg-gray-900 min-w-[max(20vw,_200px)] lg:max-w-[60vw] max-w-[40vw] h-full overflow-scroll"
			ref={ref}
		>
			<article className="py-10 sm:py-12">
				<div
					className="px-6 prose prose-neutral dark:prose-invert
					prose-headings:text-gray-900
					dark:prose-headings:text-theme-50
					prose-li:marker:text-theme-1000
					dark:prose-li:marker:text-gray-100
					prose-strong:text-gray-900
					prose-strong:bg-gray-900/10
					dark:prose-strong:text-gray-50
					dark:prose-strong:bg-gray-600/10
					prose-strong:py-0.5
					prose-strong:px-2
					text-gray-800
					dark:text-gray-200
					prose-strong:rounded-lg
					max-w-none
					prose-img:max-w-[min(48rem,_100%)]
					sm:prose-sm md:prose-base lg:prose-lg"
					ref={divRef}
				></div>
			</article>
		</main>
	)
})
Question.displayName = 'Question'
export default Question
