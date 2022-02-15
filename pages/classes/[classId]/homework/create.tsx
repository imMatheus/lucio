import React, { useEffect, useLayoutEffect, useState } from 'react'
import type { NextPage } from 'next'
import { ArrowLeft } from 'react-feather'
import Link from 'next/link'
import { useRouter } from 'next/router'
import ReactQuill from 'react-quill'
import { Quill } from 'quill'
import dynamic from 'next/dynamic'
import Dropzone, { FileProps } from '@/components/dropzone'
import FileCard from '@/components/dropzone/FileCard'
import FileCardWrapper from '@/components/dropzone/FileCardWrapper'

const NoSsr = () => {
	const router = useRouter()
	const { classId } = router.query
	console.log(router.query)
	console.log('-___-')
	const [text, setText] = useState('hello world!')
	const [files, setFiles] = useState<FileProps[]>([])
	function handeChange(text: string) {
		setText(text)
	}

	useEffect(() => {
		console.log('opoooasasas')

		console.log(files)
	}, [files])

	return (
		<main className="p-6 md:p-8">
			<Link href={`/classes/${classId}/homework`} passHref={true}>
				<a className="mb-2 w-8 h-8 transition-colors hover:bg-gray-200/80 dark:hover:bg-gray-800/80 rounded-full flex justify-center items-center">
					<ArrowLeft className="w-5 h-5" />
				</a>
			</Link>

			<h2 className="text-3xl md:text-4xl mb-2 font-bold">Create you class</h2>
			<h3 className="text-2xl mb-2 font-bold">
				Files
				{files.length >= 1 && (
					<span className="text-gray-600 dark:text-gray-400 text-base font-normal">
						{' '}
						- {files.length} added
					</span>
				)}
			</h3>
			{/* <ReactQuill value={'.text'} /> */}
			{/* <ReactQuill value={text} onChange={handeChange} /> */}
			<FileCardWrapper>
				{files.map((file) => (
					<FileCard file={file} key={file.lastModified} />
				))}
			</FileCardWrapper>
			<Dropzone setFiles={setFiles} />
		</main>
	)
}

//@ts-ignore
const Create: NextPage = dynamic(() => Promise.resolve(NoSsr), {
	ssr: false
})

export default Create
