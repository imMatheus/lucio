import React from 'react'
import type { NextPage } from 'next'
import { ArrowLeft } from 'react-feather'
import Link from 'next/link'
import { useRouter } from 'next/router'

const Create: NextPage = () => {
	const router = useRouter()
	const { classId } = router.query
	console.log(router.query)
	console.log('-___-')

	return (
		<main className="p-6 md:p-8">
			<Link href={`/classes/${classId}/homework`} passHref={true}>
				<a className="mb-2 w-8 h-8 transition-colors hover:bg-gray-200/80 dark:hover:bg-gray-800/80 rounded-full flex justify-center items-center">
					<ArrowLeft className="w-5 h-5" />
				</a>
			</Link>

			<h2 className="text-4xl font-bold">Create you class</h2>
		</main>
	)
}

export default Create
