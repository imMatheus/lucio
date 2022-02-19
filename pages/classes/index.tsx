import React, { useEffect, ReactElement, useState } from 'react'
import ClassCard from '@/components/classes/ClassCard'
import { useToast } from '@/context/ToastContext'
import Button from '@/components/button'
import { GetServerSideProps } from 'next'
import axios from 'axios'
import type { NextPage } from 'next'
import Cookies from 'cookies'
import ClassType from '@/types/ClassType'
import NoClasses from '@/components/classes/NoClasses'
import Link from 'next/link'
import { Data } from '@/types/returns/api/classes/join'
import { useRouter } from 'next/router'
interface Props {
	classes: ClassType[]
}

export const getServerSideProps: GetServerSideProps<Props> = async ({ req, res }) => {
	const cookies = new Cookies(req, res)

	// get token from the users cookie
	const token = cookies.get('jwt')

	if (!token) {
		return {
			props: { classes: [] }
		}
	}

	const classes = await axios.get('http://localhost:3000/api/classes/mine', {
		headers: {
			token
		}
	})

	return {
		props: { classes: classes.data }
	}
}

const Classes: NextPage<Props> = ({ classes }) => {
	const router = useRouter()

	// https://dribbble.com/shots/14653202-Coursebook-Your-Education-Platform

	return (
		<section className="py-8 px-3 sm:px-6 lg:px-8">
			<main className="w-maxed relative mx-auto">
				<div className="mb-3 flex gap-2">
					<Link href="/classes/create" passHref={true}>
						<a>
							<Button>Create class</Button>
						</a>
					</Link>

					<Button
						variant="dimmed"
						onClick={async () => {
							const code = prompt('Whats the code?')
							const { data }: { data: Data } = await axios.post('/api/classes/join', {
								code
							})
							if (data.classRoom) {
								router.push(`/classes/${data.classRoom._id}`)
							}
						}}
					>
						Join class
					</Button>
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
				{/* {JSON.stringify(classes)} */}
			</main>
		</section>
	)
}

export default Classes
