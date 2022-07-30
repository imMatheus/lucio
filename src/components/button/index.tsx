import React from 'react'
import styles from './button.module.scss'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: 'primary' | 'white' | 'black' | 'dimmed' | 'error' | 'success' | 'warning'
	children: React.ReactNode
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', ...props }) => {
	return (
		<button {...props} className={styles[variant] + (props.className ? ' ' + props.className : '')}>
			{children}
		</button>
	)
}

export default Button
