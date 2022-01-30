import React from 'react'
import styles from '../../styles/alert.module.scss'

interface indexProps extends React.HTMLAttributes<HTMLDivElement> {
	variant?: 'primary' | 'error' | 'success' | 'warning'
}

const Alert: React.FC<indexProps> = ({ children, variant = 'primary', ...props }) => {
	return (
		<div {...props} className={styles[variant] + (props.className ? ' ' + props.className : '')}>
			{children}
		</div>
	)
}

export default Alert
