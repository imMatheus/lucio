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
			className="fixed z-10 inset-0 overflow-y-auto"
			aria-labelledby="modal-title"
			role="dialog"
			aria-modal="true"
		>
			<div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
				<div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

				<span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
					&#8203;
				</span>

				<div className="p-4 pb-6 inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full prose">
					<div
						className="absolute top-2 left-2 cursor-pointer p-1 hover:bg-gray-100 transition-colors rounded-full"
						onClick={() => {
							setShowModal(false)
						}}
					>
						<X className="text-black" />
					</div>
					<h2 className="text-center m-0 mb-2 text-4xl">hello</h2>
					<p className="text-center">sign into your Luciocode account &#127825;</p>
					<div className="relative mb-6">
						<input
							ref={emailRef}
							type="text"
							placeholder="Email..."
							className="peer w-full outline-none pl-11 h-11 border border-gray-300 rounded-lg focus-within:border-theme"
						/>
						<Mail className="text-gray-300 absolute left-3 top-1/2 -translate-y-1/2 peer-focus-within:text-theme" />
					</div>
					<div className="relative mb-6 flex items-center h-11 border border-gray-300 rounded-lg group focus-within:border-theme ">
						<input
							ref={passwordRef}
							type={showPassword ? 'text' : 'password'}
							placeholder="Password..."
							className="peer w-full pl-11 pr-2 bg-transparent outline-none focus:outline-none border-none focus:border-none"
						/>
						<Lock className="text-gray-300 bg-transparent absolute left-3 top-1/2 -translate-y-1/2 group-focus-within:text-theme" />
						<Button
							variant="white"
							className="flex-shrink-0 mr-2"
							onClick={() => {
								setShowPassword((c) => !c)
							}}
						>
							{showPassword ? 'Hide' : 'Show'}
						</Button>
					</div>
					{error && <p className="text-error text-sm">{error}</p>}
					<Button
						disabled={loading}
						className="w-full !text-base !h-10"
						onClick={async () => {
							if (!loading && emailRef.current && passwordRef.current) {
								setLoading(true)
								setError('')

								try {
									const res = await login(emailRef.current.value, passwordRef.current.value)
									console.log('absbvafad')
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
