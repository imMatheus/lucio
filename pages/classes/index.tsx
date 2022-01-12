import React, { useEffect, ReactElement } from 'react'
// import styles from 'styles/Classes.module.scss'
import ClassCard from '@/components/classes/ClassCard'
import { useToast } from '@/context/ToastContext'
import Button from '@/components/button'
import { GetServerSideProps } from 'next'
import axios from 'axios'
import type { NextPage } from 'next'
import Cookies from 'cookies'

interface Props {
	classes: any[]
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
	const classes: any = await axios.get('http://localhost:3000/api/class/mine', {
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
		<section className="py-8 px-6">
			{/* <section className="py-8 px-6 bg-red-200"> */}
			<main className="w-maxed mx-auto">
				<div className="flex mb-3 gap-2">
					<Button
						variant="dimmed"
						onClick={async () => {
							const code = prompt('Whats the code?')
							const res: any = await axios.post('/api/class/join', {
								code
							})
							console.log('res')
							console.log(res)
						}}
					>
						Join class
					</Button>
				</div>
				{/* <div className={styles.classesWrapper}></div> */}
				{JSON.stringify(classes)}
			</main>
		</section>
	)
}

export default Classes
