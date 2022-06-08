import React, { useEffect, ReactElement, useState } from 'react'
import ClassCard from '@/components/classes/classcard/index'
import { useToast } from '@/context/ToastContext'
import Button from '@/components/button'
import { GetServerSideProps } from 'next'
import type { NextPage } from 'next'
import { ClassType } from '@/types/ClassType'
import NoClasses from '@/components/classes/NoClasses'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { fs, auth } from '@/firebase'
import { useAuth } from '@/context/AuthContext'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { useDocs } from '@/firebase'
import Loader from '@/components/loaders/Loader'

interface Props {
	classes: ClassType[]
}

// https://dribbble.com/shots/14653202-Coursebook-Your-Education-Platform
const Classes: NextPage<Props> = ({}) => {
	const router = useRouter()
	const { setToast } = useToast()
	const { currentUser } = useAuth()
	const [classes, loading, error] = useDocs<ClassType>('classes', where('ownerId', '==', currentUser?.uid))

	console.log('asasasas')
	console.log(classes)

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

				{loading ? (
					<Loader />
				) : classes?.length > 0 ? (
					<div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:gap-4 lg:grid-cols-3 lg:gap-6 xl:grid-cols-4 2xl:grid-cols-5">
						{classes?.map((classRoom) => (
							<ClassCard data={classRoom} key={classRoom.name} />
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
