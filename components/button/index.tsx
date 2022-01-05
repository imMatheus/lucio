import React from 'react'
// import styles from '../../styles/Button.module.scss'

interface indexProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: 'primary' | 'white' | 'dimmed' | 'error' | 'success' | 'warning'
}

const Button: React.FC<indexProps> = ({ children, variant = 'primary', ...props }) => {
	return (
		// <button {...props} className={styles[variant] + (props.className ? ' ' + props.className : '')}>
		<button>{children}</button>
	)
}

export default Button
