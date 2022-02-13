import React, { useEffect, useRef, useState } from 'react'
import type { NextPage } from 'next'
import Question from '@/components/question'
import fs from 'fs'
import { readdir } from 'fs/promises'
import path from 'path'
import AlgorithmProblem from '@/types/AlgorithmProblem'
import { GetServerSideProps, GetStaticProps, GetStaticPaths } from 'next'
import getConfig from 'next/config'
const { serverRuntimeConfig } = getConfig()
import Monaco from '@/components/monaco'
import { editor } from 'monaco-editor'
interface Props {
	markdown: string
}

export const getStaticPaths: GetStaticPaths = async () => {
	const response = await fetch('http://localhost:3000/api/problems')
	const data = await response.json()
	console.log(data)

	const problems: AlgorithmProblem[] = data.problems.map((prob: any) => prob as AlgorithmProblem)
	const paths = problems.map((problem) => ({
		params: { problemId: problem.name }
	}))

	return {
		paths,
		fallback: false
	}
}

export const getStaticProps: GetStaticProps<Props> = async (context) => {
	if (!context.params)
		return {
			props: {
				markdown: '**404 /:**'
			}
		}
	const response = await fetch(`http://localhost:3000/api/problems/${context.params.problemId}`)
	const data = await response.json()

	return {
		props: {
			markdown: data.markdown
		}
	}
}

const Problem: NextPage<Props> = ({ markdown }) => {
	const resizeBarRef = useRef<HTMLDivElement>(null)
	const editorWrapperRef = useRef<HTMLDivElement>(null)
	const questionRef = React.createRef<HTMLElement>()
	const editorRef = React.useRef<editor.IStandaloneCodeEditor | null>(null)
	const [isDragging, setIsDragging] = useState(false)

	const mouseDownHandler = () => {
		setIsDragging(true)
	}

	useEffect(() => {
		if (!resizeBarRef) return
		document.addEventListener('mousemove', function (e) {
			if (!isDragging || !questionRef?.current || !editorWrapperRef.current) return

			let barWidth = resizeBarRef.current?.clientWidth || 0
			//setting width to the mouse x cord or to a min or max value specified in the css
			const pointerRelativeXpos = e.clientX
			const windowWidth = window.innerWidth

			editorWrapperRef.current.style.width = windowWidth - pointerRelativeXpos - barWidth + 'px'
			console.log('****************************************************************')

			console.log(editorRef.current)

			// editorRef.current?.layout()
		})

		document &&
			document.addEventListener('mouseup', function (e) {
				// Turn off dragging flag when user mouse is up
				setIsDragging(false)
			})
	}, [resizeBarRef.current, mouseDownHandler])

	function handleEditorDidMount(editor: editor.IStandaloneCodeEditor) {
		console.log('mount')
		console.log(editor)

		// console.log(editor.layout)
		if (editorRef) {
			editorRef.current = editor
		}
	}

	useEffect(() => {
		console.log('abc')
		console.log(editorRef.current)
	}, [editorRef, editorRef.current])

	return (
		<section className="grid grid-cols-[1fr_auto_auto] h-full-wo-nav w-screen">
			<Question ref={questionRef} markdown={markdown} />
			<div
				ref={resizeBarRef}
				className="w-2 h-full bg-gray-300 dark:bg-gray-700 cursor-ew-resize flex flex-col justify-center items-center gap-1"
				onMouseDown={mouseDownHandler}
			>
				<div className="w-0.5 h-0.5 rounded-full bg-gray-600 dark:bg-gray-200"></div>
				<div className="w-0.5 h-0.5 rounded-full bg-gray-600 dark:bg-gray-200"></div>
				<div className="w-0.5 h-0.5 rounded-full bg-gray-600 dark:bg-gray-200"></div>
				<div className="w-0.5 h-0.5 rounded-full bg-gray-600 dark:bg-gray-200"></div>
			</div>
			<div
				className="bg-red-500 w-full relative min-w-[max(30vw,_250px)] lg:max-w-[80vw] max-w-[65vw]"
				ref={editorWrapperRef}
			>
				<Monaco ref={editorRef} handleEditorDidMount={handleEditorDidMount} />
			</div>
		</section>
	)
}

export default Problem
