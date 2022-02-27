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
import Editor, { EditorProps } from '@monaco-editor/react'

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
	const monacoRef = useRef<HTMLDivElement>(null)
	const questionRef = React.createRef<HTMLElement>()
	const [isDragging, setIsDragging] = useState(false)

	const mouseDownHandler = () => {
		setIsDragging(true)
	}

	useEffect(() => {
		if (!resizeBarRef) return
		document.addEventListener('mousemove', function (e) {
			if (!isDragging || !questionRef?.current || !editorWrapperRef.current) return
			// if (!isDragging || !questionRef?.current || !editorWrapperRef.current || !monacoRef.current) return

			let barWidth = resizeBarRef.current?.clientWidth || 0
			//setting width to the mouse x cord or to a min or max value specified in the css
			const pointerRelativeXpos = e.clientX
			const windowWidth = window.innerWidth
			console.log(window.innerWidth)

			editorWrapperRef.current.style.width = windowWidth - pointerRelativeXpos - barWidth + 'px'
		})

		document &&
			document.addEventListener('mouseup', function (e) {
				// Turn off dragging flag when user mouse is up
				setIsDragging(false)
			})
	}, [resizeBarRef.current, mouseDownHandler])

	return (
		<main className="md:h-full-wo-nav w-screen md:grid md:grid-cols-[1fr_auto_auto]">
			<Question ref={questionRef} markdown={markdown} />
			<div
				ref={resizeBarRef}
				className="hidden h-full w-2 cursor-ew-resize flex-col items-center justify-center gap-1 bg-gray-300 dark:bg-gray-700 md:flex"
				onMouseDown={mouseDownHandler}
			>
				<div className="h-0.5 w-0.5 rounded-full bg-gray-600 dark:bg-gray-200"></div>
				<div className="h-0.5 w-0.5 rounded-full bg-gray-600 dark:bg-gray-200"></div>
				<div className="h-0.5 w-0.5 rounded-full bg-gray-600 dark:bg-gray-200"></div>
				<div className="h-0.5 w-0.5 rounded-full bg-gray-600 dark:bg-gray-200"></div>
			</div>
			<Monaco ref={editorWrapperRef} />
		</main>
	)
}

export default Problem
