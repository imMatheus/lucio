import React from 'react'
import styles from './loader.module.scss'

interface LoaderProps {}

const Loader: React.FC<LoaderProps> = ({}) => {
	return (
		<section className="flex min-h-[20rem] items-center justify-center bg-gray-100">
			<div className={styles.ball1}></div>
			<div className={styles.ball2}></div>
		</section>
	)
}

export default Loader
