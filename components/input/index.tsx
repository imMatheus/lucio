import React, { useState, useEffect, useRef } from 'react'
import { ArrowRight, Check, X } from 'react-feather'

interface InputFieldProps {
	state: string
	setState: React.Dispatch<React.SetStateAction<string>>
	onClick: () => void
	buttonText: string
	type: React.HTMLInputTypeAttribute
	success: boolean
	RightIcon?: React.ReactNode
}

export default function InputField({
	state,
	setState,
	onClick,
	buttonText,
	success,
	RightIcon,
	type
}: InputFieldProps) {
	const [focused, setFocused] = useState(false)
	const [isLastedRendered, setIsLastedRendered] = useState(true)
	const colors = success ? 'border-success text-success' : 'border-[#627597] text-[#627597]'
	const showActionsButtons = isLastedRendered || focused
	const inputRef = useRef<HTMLInputElement>(null)

	useEffect(() => {
		if (inputRef.current) inputRef.current.focus()
	}, [])

	return (
		<form
			className={`flex items-center mb-5`}
			onSubmit={(e) => {
				e.preventDefault()
				success ? onClick() : undefined
			}}
		>
			{focused ? (
				<ArrowRight className="mr-2 w-5 text-gray-900 dark:text-gray-100 flex-shrink-0" />
			) : success ? (
				<Check className="mr-2 w-5 text-success flex-shrink-0" />
			) : (
				<X className="mr-2 w-5 text-error flex-shrink-0" />
			)}
			<input
				value={state}
				onChange={(e) => {
					setState(e.target.value)
				}}
				ref={inputRef}
				type={type}
				onFocus={() => setFocused(true)}
				onBlur={() => setFocused(false)}
				className="flex-1 outline-none self-stretch bg-transparent pr-2"
			/>
			{showActionsButtons && RightIcon}
			<button
				onClick={() => {
					setIsLastedRendered(false)
				}}
				type="submit"
				disabled={!success}
				style={{ visibility: showActionsButtons ? 'visible' : 'hidden' }}
				className={'bg-transparent border-[1px] rounded-md py-1 px-3 ml-3 text-sm ' + colors}
			>
				{buttonText}
			</button>
		</form>
	)
}
