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
		<section className="h-full w-full overflow-scroll bg-gray-100 dark:bg-gray-900" ref={ref}>
			<article className="py-10 sm:py-12">
				<div
					className={`prose prose-gray max-w-none px-6 text-gray-800 
					prose-headings:text-gray-900 prose-strong:rounded-lg 
					prose-strong:bg-gray-900/10 prose-strong:px-2 prose-strong:py-0.5 
					prose-strong:text-gray-900 prose-li:marker:text-theme-1000 
					prose-img:max-w-[min(48rem,_100%)] dark:text-gray-200 dark:prose-headings:text-gray-100 
					dark:prose-strong:bg-gray-600/10 dark:prose-strong:text-gray-50 
					dark:prose-li:marker:text-gray-100`}
					ref={divRef}
				></div>
			</article>
		</section>
	)
})
Question.displayName = 'Question'
export default Question
