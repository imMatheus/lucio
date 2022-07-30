import React from 'react'
import type { NextPage } from 'next'
import Image from 'next/image'
import styles from '../styles/404.module.scss'

const index: NextPage = () => {
	return (
		<main className="h-full-wo-nav w-full bg-clr-text">
			{/* <main className="w-full bg-[#e95052] h-full-wo-nav"> */}
			<div className="relative mx-auto flex h-full max-w-7xl flex-col justify-center">
				{/* <Image src="/404.webp" layout="fill" alt="404" objectFit="contain" /> */}
				<h2 className={styles.h2}>404</h2>
				<h3 className={styles.h3}>Could not find what your are looking for</h3>
			</div>
		</main>
	)
}

export default index
