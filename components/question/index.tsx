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
			className="bg-neutral-100 dark:bg-neutral-900 min-w-[max(20vw,_200px)] lg:max-w-[60vw] max-w-[40vw] h-full overflow-scroll"
			ref={ref}
		>
			<article className="py-10 sm:py-12">
				<div
					className="px-6 prose prose-neutral dark:prose-invert
					prose-headings:text-theme-800
					prose-li:marker:text-theme-1000
					dark:prose-li:marker:text-theme-300
					prose-strong:text-theme-500
					prose-strong:bg-theme-100/20
					dark:prose-strong:text-theme-500
					dark:prose-strong:bg-theme-200/10
					prose-strong:py-1
					prose-strong:px-2
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
