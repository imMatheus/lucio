import React from 'react'
import styles from './alert.module.scss'

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
	variant?: 'primary' | 'error' | 'success' | 'warning'
	children: React.ReactNode
}

const Alert: React.FC<AlertProps> = ({ children, variant = 'primary', ...props }) => {
	return (
		<div {...props} className={styles[variant] + (props.className ? ' ' + props.className : '')}>
			{children}
		</div>
	)
}

export default Alert
