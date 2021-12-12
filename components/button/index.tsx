import React from 'react'
import styles from './Button.module.scss'

interface indexProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	dimmed?: boolean
}

const index: React.FC<indexProps> = ({ children, dimmed, ...props }) => {
	return dimmed ? (
		<button {...props} className={styles.btnDimmed + (props.className ? ' ' + props.className : '')}>
			{children}
		</button>
	) : (
		<button {...props} className={styles.btnPrimary + (props.className ? ' ' + props.className : '')}>
			{children}
		</button>
	)
}

export default index
