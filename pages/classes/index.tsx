import React, { useEffect, ReactElement, useState } from 'react'
// import styles from 'styles/Classes.module.scss'
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
interface Props {
	classes: ClassType[]
}

export const getServerSideProps: GetServerSideProps<Props> = async ({ req, res }) => {
	const cookies = new Cookies(req, res)
	console.log('hhhhhhhhhhhhh')

	// get token from the users cookie
	const token = cookies.get('jwt')
	console.log('token', token)

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

	console.log('classes 34 data')
	console.log(classes.data)

	return {
		props: { classes: classes.data }
	}
}

const Classes: NextPage<Props> = ({ classes }) => {
	console.log('classes')
	console.log(classes)

	// https://dribbble.com/shots/14653202-Coursebook-Your-Education-Platform

	return (
		<section className="py-8 px-3 sm:px-6 lg:px-8">
			<main className="w-maxed mx-auto relative min-h-full-wo-nav">
				<div className="flex mb-3 gap-2">
					<Link href="/classes/create" passHref={true}>
						<Button>Create class</Button>
					</Link>

					<Button
						variant="dimmed"
						onClick={async () => {
							const code = prompt('Whats the code?')
							const res: any = await axios.post('/api/classes/join', {
								code
							})
							console.log('res')
							console.log(res)
						}}
					>
						Join class
					</Button>
				</div>

				{classes?.length > 0 ? (
					<div className="grid gap-3 md:gap-4 lg:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
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
