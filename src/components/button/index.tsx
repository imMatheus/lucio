import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: string
	children: React.ReactNode
}

const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
	return (
		<button
			{...props}
			className="rounded-md bg-clr-accent px-4 py-1.5 text-sm text-white transition-opacity hover:opacity-90"
		>
			{children}
		</button>
	)
}

export default Button
