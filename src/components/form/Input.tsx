import React, { useState, useId } from 'react'
import classNames from 'classnames'

interface InputProps {
	value: string
	onChange: React.Dispatch<React.SetStateAction<string>>
	label: string
	maxLength: number
	required?: boolean
	error?: string
	noSpaces?: boolean
}

const Input: React.FC<InputProps> = ({ value, onChange, label, maxLength, required, error, noSpaces }) => {
	const textEmpty = value.length < 1
	const invalidText = (required && textEmpty) || error
	const inputId = useId()
	return (
		<div className="my-6">
			<label
				htmlFor={inputId}
				className={classNames(
					'border-clr-text/20 group relative block rounded border p-2 focus-within:border-clr-accent',
					invalidText && '!border-clr-danger'
				)}
			>
				<div className="flex justify-between text-sm text-clr-text-grayed">
					<div>
						<div
							className={classNames(
								textEmpty &&
									'absolute translate-y-[calc(50%_-_4px)] text-lg group-focus-within:translate-y-0 group-focus-within:text-sm',
								'transition-all group-focus-within:text-clr-accent',
								invalidText && 'group-focus-within:text-clr-danger'
							)}
						>
							{label}
						</div>
					</div>
					<div className="invisible group-focus-within:visible">
						{value.length}/{maxLength}
					</div>
				</div>
				<div className={classNames(textEmpty && 'opacity-0', 'group-focus-within:opacity-100')}>
					<input
						id={inputId}
						name={label}
						type="text"
						value={value}
						className="w-full bg-transparent text-lg text-clr-text outline-none"
						onChange={(e) =>
							onChange(
								e.target.value.length > maxLength
									? noSpaces
										? value.split(' ').join('')
										: value
									: noSpaces
									? e.target.value.split(' ').join('')
									: e.target.value
							)
						}
					/>
				</div>
			</label>
			{invalidText && <p className="pl-2 text-xs text-clr-danger">{error || 'This field can not be empty'}</p>}
		</div>
	)
}

export default Input
