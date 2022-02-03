import React from 'react'
import styles from './Circle.module.scss'

interface circleProps {}

const Circle: React.FC<circleProps> = ({}) => {
	const pr = 50

	return (
		<div className="w-12 h-12 relative">
			<div className="w-full h-full absolute border-2 border-green-800 rounded-full"></div>
			<div className={styles.bar}></div>
			<div className="w-1/2 h-full absolute left-0 top-0 bg-cyan-600"></div>
		</div>
	)
}

export default Circle
