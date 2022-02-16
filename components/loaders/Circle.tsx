import React from 'react'
import styles from './Circle.module.scss'

interface circleProps {}

const Circle: React.FC<circleProps> = ({}) => {
	const pr = 50

	return (
		<div className="relative h-12 w-12">
			<div className="absolute h-full w-full rounded-full border-2 border-green-800"></div>
			<div className={styles.bar}></div>
			<div className="absolute left-0 top-0 h-full w-1/2 bg-cyan-600"></div>
		</div>
	)
}

export default Circle
