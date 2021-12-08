import React from 'react'
import styles from './Button.module.scss'

interface indexProps {
	dimmed?: boolean
}

const index: React.FC<indexProps> = ({ children, dimmed }) => {
	return dimmed ? (
		<button className={styles.btnDimmed}>{children}</button>
	) : (
		<button className={styles.btnPrimary}>{children}</button>
	)
}

export default index
