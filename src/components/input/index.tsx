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
	const colors = success ? 'border-clr-success text-clr-success' : 'border-[#627597] text-[#627597]'
	const showActionsButtons = isLastedRendered || focused
	const inputRef = useRef<HTMLInputElement>(null)

	useEffect(() => {
		if (inputRef.current) inputRef.current.focus()
	}, [])

	return (
		<form
			className={`mb-5 flex items-center`}
			onSubmit={(e) => {
				e.preventDefault()
				success ? onClick() : undefined
			}}
		>
			{focused ? (
				<ArrowRight className="mr-2 w-5 flex-shrink-0 text-clr-text" />
			) : success ? (
				<Check className="text-clr-success mr-2 w-5 flex-shrink-0" />
			) : (
				<X className="text-error mr-2 w-5 flex-shrink-0" />
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
				className="flex-1 self-stretch bg-transparent pr-2 outline-none"
			/>
			{showActionsButtons && RightIcon}
			<button
				onClick={() => {
					setIsLastedRendered(false)
				}}
				type="submit"
				disabled={!success}
				style={{ visibility: showActionsButtons ? 'visible' : 'hidden' }}
				className={'ml-3 rounded-md border-[1px] bg-transparent py-1 px-3 text-sm ' + colors}
			>
				{buttonText}
			</button>
		</form>
	)
}
