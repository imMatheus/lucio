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
	const classes = await axios.get('http://localhost:3000/api/class/mine', {
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
	const [colors, setColors] = useState<[String, String]>(['#F4F1BB', '#ED6A5A'])
	console.log('asas')
	console.log(colors)

	// https://dribbble.com/shots/14653202-Coursebook-Your-Education-Platform

	return (
		<section className="">
			{/* <section className="py-8 px-6 bg-red-200"> */}
			<main className="py-8 px-6 w-maxed mx-auto relative h-full-wo-nav">
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
				{/* {JSON.stringify(classes)} */}
				{/*
			 	<div className="flex gap-2 my-2 flex-wrap">
					<div
						className="w-28 h-28 rounded-full flex overflow-hidden"
						onClick={() => setColors(['#F4F1BB', '#ED6A5A'])}
					>
						<div className="h-full w-full bg-[#F4F1BB]"></div>
						<div className="h-full w-full bg-[#ED6A5A]"></div>
					</div>
					<div
						className="w-28 h-28 rounded-full flex overflow-hidden"
						onClick={() => setColors(['#1D7874', '#071E22'])}
					>
						<div className="h-full w-full bg-[#1D7874]"></div>
						<div className="h-full w-full bg-[#071E22]"></div>
					</div>
					<div
						className="w-28 h-28 rounded-full flex overflow-hidden"
						onClick={() => setColors(['#F75C03', '#2274A5'])}
					>
						<div className="h-full w-full bg-[#F75C03]"></div>
						<div className="h-full w-full bg-[#2274A5]"></div>
					</div>
					<div
						className="w-28 h-28 rounded-full flex overflow-hidden"
						onClick={() => setColors(['#6DB1BF', '#301A4B'])}
					>
						<div className="h-full w-full bg-[#6DB1BF]"></div>
						<div className="h-full w-full bg-[#301A4B]"></div>
					</div>
					<div
						className="w-28 h-28 rounded-full flex overflow-hidden"
						onClick={() => setColors(['#333232', '#F7B2AD'])}
					>
						<div className="h-full w-full bg-[#F7B2AD]"></div>
						<div className="h-full w-full bg-[#333232]"></div>
					</div>
					<div
						className="w-28 h-28 rounded-full flex overflow-hidden"
						onClick={() => setColors(['#F1FFFA', '#93B7BE'])}
					>
						<div className="h-full w-full bg-[#F1FFFA]"></div>
						<div className="h-full w-full bg-[#93B7BE]"></div>
					</div>

					<div
						className="w-28 h-28 rounded-full flex overflow-hidden"
						onClick={() => setColors(['#93A8AC', '#424B54'])}
					>
						<div className="h-full w-full bg-[#93A8AC]"></div>
						<div className="h-full w-full bg-[#424B54]"></div>
					</div>
					<div
						className="w-28 h-28 rounded-full flex overflow-hidden"
						onClick={() => setColors(['#EDAE49', '#D1495B'])}
					>
						<div className="h-full w-full bg-[#EDAE49]"></div>
						<div className="h-full w-full bg-[#D1495B]"></div>
					</div>
				</div>
				*/}

				{classes?.length > 0 ? (
					<div className="grid gap-3 md:gap-4 lg:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
						{classes?.map((classRoom) => (
							<>
								<ClassCard data={classRoom} key={classRoom._id} colors={colors} />
								<ClassCard data={classRoom} key={classRoom._id} colors={['#EDAE49', '#D1495B']} />
								<ClassCard data={classRoom} key={classRoom._id} colors={['#1D7874', '#071E22']} />
								<ClassCard data={classRoom} key={classRoom._id} colors={['#1D7874', '#071E22']} />
								<ClassCard data={classRoom} key={classRoom._id} colors={['#d3d3d3', '#071E22']} />
								<ClassCard data={classRoom} key={classRoom._id} colors={['#93B7BE', '#93B7BE']} />
								<ClassCard data={classRoom} key={classRoom._id} colors={['#1D7874', '#071E22']} />
							</>
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
