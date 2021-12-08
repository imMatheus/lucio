import React from 'react'
import styles from './Button.module.scss'

interface indexProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	dimmed?: boolean
}

const index: React.FC<indexProps> = ({ children, dimmed, ...props }) => {
	return dimmed ? (
		<button className={styles.btnDimmed} {...props}>
			{children}
		</button>
	) : (
		<button className={styles.btnPrimary} {...props}>
			{children}
		</button>
	)
}

export default index
