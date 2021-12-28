import React, { useEffect, useRef } from 'react'
import type { NextPage } from 'next'
import Question from '@/components/question'
import fs from 'fs'
import { readdir } from 'fs/promises'
import path from 'path'
import { GetServerSideProps, GetStaticProps, GetStaticPaths } from 'next'
import getConfig from 'next/config'
const { serverRuntimeConfig } = getConfig()

interface Props {
	markdown: string
}

export const getStaticPaths: GetStaticPaths = async () => {
	const markdownFiles = await readdir(path.join(serverRuntimeConfig.PROJECT_ROOT, `markdown`))

	const paths = markdownFiles.map((file) => ({
		params: { problemId: file.replaceAll('.md', '') }
	}))

	return {
		paths,
		fallback: false
	}
}

export const getStaticProps: GetStaticProps<Props> = async (context) => {
	const markdown = fs.readFileSync(
		path.join(serverRuntimeConfig.PROJECT_ROOT, `markdown/${context.params?.problemId}.md`),
		'utf8'
	)

	return {
		props: {
			markdown
		}
	}
}

const Problem: NextPage<Props> = ({ markdown }) => {
	const resizeBarRef = useRef<HTMLDivElement>(null)
	const questionRef = React.createRef<HTMLElement>()
	let isDragging = false

	const mouseDownHandler = () => {
		isDragging = true
	}
	useEffect(() => {
		if (!resizeBarRef) return
		document.addEventListener('mousemove', function (e) {
			if (!isDragging || !questionRef?.current) return

			let barWidth = resizeBarRef.current?.clientWidth || 0
			//setting width to the mouse x cord or to a min or max value specified in the css
			var pointerRelativeXpos = e.clientX

			questionRef.current.style.width = pointerRelativeXpos - barWidth + 'px'
		})

		document &&
			document.addEventListener('mouseup', function (e) {
				// Turn off dragging flag when user mouse is up
				isDragging = false
			})
	}, [resizeBarRef.current])

	useEffect(() => {}, [questionRef.current])

	return (
		<section className="grid grid-cols-[auto_auto_1fr] h-full-wo-nav">
			<Question ref={questionRef} markdown={markdown} />
			<div
				ref={resizeBarRef}
				className="w-2 h-full bg-red-900 cursor-ew-resize"
				onMouseDown={mouseDownHandler}
			></div>
		</section>
	)
}

export default Problem
