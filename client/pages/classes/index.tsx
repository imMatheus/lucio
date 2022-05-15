import React, { useEffect, ReactElement, useState } from 'react'
import ClassCard from '@/components/classes/classcard/index'
import { useToast } from '@/context/ToastContext'
import Button from '@/components/button'
import { GetServerSideProps } from 'next'
import type { NextPage } from 'next'
import ClassType from '@/types/ClassType'
import NoClasses from '@/components/classes/NoClasses'
import Link from 'next/link'
import { useRouter } from 'next/router'
interface Props {
	classes: ClassType[]
}

const Classes: NextPage<Props> = ({ classes }) => {
	const router = useRouter()
	const { setToast } = useToast()

	// https://dribbble.com/shots/14653202-Coursebook-Your-Education-Platform

	return (
		<section className="py-8 px-3 sm:px-6 lg:px-8">
			<main className="w-maxed relative mx-auto">
				<div className="mb-3 flex gap-2">
					<Link href="/classes/create" passHref={true}>
						<a>
							<Button>Create a class</Button>
						</a>
					</Link>

					<Button variant="dimmed">Join class</Button>
				</div>

				{classes?.length > 0 ? (
					<div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:gap-4 lg:grid-cols-3 lg:gap-6 xl:grid-cols-4 2xl:grid-cols-5">
						{classes?.map((classRoom) => (
							<ClassCard data={classRoom} key={classRoom._id} />
						))}
					</div>
				) : (
					<NoClasses />
				)}
			</main>
		</section>
	)
}

export default Classes
