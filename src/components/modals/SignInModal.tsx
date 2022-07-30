import React, { useRef, useState } from 'react'
import { useModal } from '@/context/ModalContext'
import { X, Mail, Lock } from 'react-feather'
import Button from '@/components/button'
import { useAuth } from '@/context/AuthContext'
const SignInModal: React.FC = () => {
	const [showPassword, setShowPassword] = useState(false)
	const emailRef = useRef<HTMLInputElement>(null)
	const passwordRef = useRef<HTMLInputElement>(null)
	const [error, setError] = useState('')
	const { setShowModal } = useModal()
	const [loading, setLoading] = useState(false)
	const { login } = useAuth()

	return (
		<div
			className="fixed inset-0 z-10 overflow-y-auto"
			aria-labelledby="modal-title"
			role="dialog"
			aria-modal="true"
		>
			<div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
				<div
					className="fixed inset-0 bg-clr-bg-grayed bg-opacity-75 transition-opacity"
					aria-hidden="true"
				></div>

				<span className="hidden sm:inline-block sm:h-screen sm:align-middle" aria-hidden="true">
					&#8203;
				</span>

				<div className="prose inline-block transform overflow-hidden rounded-lg bg-white p-4 pb-6 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle">
					<div
						className="absolute top-2 left-2 cursor-pointer rounded-full p-1 transition-colors hover:bg-clr-bg"
						onClick={() => {
							setShowModal(false)
						}}
					>
						<X className="text-black" />
					</div>
					<h2 className="m-0 mb-2 text-center text-4xl">hello</h2>
					<p className="text-center">sign into your Luciocode account</p>
					<div className="relative mb-6">
						<input
							ref={emailRef}
							type="text"
							placeholder="Email..."
							className="peer h-11 w-full rounded-lg border border-gray-300 pl-11 outline-none focus-within:border-clr-accent"
						/>
						<Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 peer-focus-within:text-clr-accent" />
					</div>
					<div className="group relative mb-6 flex h-11 items-center rounded-lg border border-gray-300 focus-within:border-clr-accent ">
						<input
							ref={passwordRef}
							type={showPassword ? 'text' : 'password'}
							placeholder="Password..."
							className="peer w-full border-none bg-transparent pl-11 pr-2 outline-none focus:border-none focus:outline-none"
						/>
						<Lock className="absolute left-3 top-1/2 -translate-y-1/2 bg-transparent text-gray-300 group-focus-within:text-clr-accent" />
						<Button
							variant="white"
							className="mr-2 flex-shrink-0"
							onClick={() => {
								setShowPassword((c) => !c)
							}}
						>
							{showPassword ? 'Hide' : 'Show'}
						</Button>
					</div>
					{error && <p className="text-sm text-error">{error}</p>}
					<Button
						disabled={loading}
						className="!h-10 w-full !text-base"
						onClick={async () => {
							if (!loading && emailRef.current && passwordRef.current) {
								setLoading(true)
								setError('')

								try {
									const res = await login(emailRef.current.value, passwordRef.current.value)
									console.log(res)
								} catch (error) {
									setLoading(false)
									setError('Could not log you in, make sure you enter valid user information')
								}
							}
						}}
					>
						Sign in
					</Button>
				</div>
			</div>
		</div>
	)
}

export default SignInModal
