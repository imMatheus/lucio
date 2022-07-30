import React, { useEffect, useLayoutEffect, useState } from 'react'
import type { NextPage } from 'next'
import { ArrowLeft } from 'react-feather'
import Link from 'next/link'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import Dropzone, { FileProps } from '@/components/dropzone'
import FileCard from '@/components/dropzone/FileCard'
import FileCardWrapper from '@/components/dropzone/FileCardWrapper'
import PaddingContainer from '@/components/classes/PaddingContainer'

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
		<PaddingContainer>
			<Link href={`/classes/${classId}/homework`} passHref={true}>
				<a className="mb-2 flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-gray-200/80">
					<ArrowLeft className="h-5 w-5" />
				</a>
			</Link>

			<h2 className="mb-2 text-3xl font-bold md:text-4xl">Create you class</h2>
			<h3 className="mb-2 text-2xl font-bold">
				Files
				{files.length >= 1 && (
					<span className="text-base font-normal text-clr-text-grayed"> - {files.length} added</span>
				)}
			</h3>
			<FileCardWrapper>
				{files.map((file) => (
					<FileCard file={file} key={file.lastModified} />
				))}
			</FileCardWrapper>
			<Dropzone setFiles={setFiles} />
		</PaddingContainer>
	)
}

//@ts-ignore
const Create: NextPage = dynamic(() => Promise.resolve(NoSsr), {
	ssr: false
})

export default Create
