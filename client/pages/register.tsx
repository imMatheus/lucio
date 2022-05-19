import React, { ReactElement, useEffect, useState } from 'react'
import styles from 'styles/registration.module.scss'
import { Eye, EyeOff } from 'react-feather'
import * as EmailValidator from 'email-validator'
import TypedText from '@/components/TypedText'
import InputField from '@/components/input/index'
import * as style from '@dicebear/adventurer-neutral'
import { createAvatar } from '@dicebear/avatars'
import Image from 'next/image'
import usePasswordStrength from '@/hooks/usePasswordStrength'
import Head from 'next/head'
import { useAuth } from '@/context/AuthContext'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'

export default function Register(): ReactElement {
	const router = useRouter()
	const [email, setEmail] = useState('')
	const [isValidEmail, setIsValidEmail] = useState(false)
	const [showPassword, setShowPassword] = useState(false)
	const [showPasswordContainer, setShowPasswordContainer] = useState(false)
	const [password, setPassword] = useState('')
	const PasswordStrength = usePasswordStrength(password)
	const [name, setName] = useState('')
	const [showNameContainer, setShowNameContainer] = useState(false)
	const [avatar, setAvatar] = useState('')
	const { signup } = useAuth()

	useEffect(() => {
		// validates email for UI purposes
		setIsValidEmail(EmailValidator.validate(email))
		setAvatar(
			createAvatar(style, {
				seed: email
			})
		)
	}, [email])

	async function signupHandler() {
		console.log('signup 70')
		const signupRes = await signup(email, password, name)
		console.log('sss')
		console.log(signupRes)
		if (!signupRes) {
			router.replace('/profile')
		}
	}

	const buff = new Buffer(avatar)
	const base64data = buff.toString('base64')

	return (
		<section className="min-h-full-wo-nav relative flex items-center">
			<Head>
				<title>Sign up | LucioCode</title>
				<meta property="og:title" content="Sign up to LucioCode" key="title" />
			</Head>
			{/* <div className={styles.blob}></div> */}
			<div className={styles.modal}>
				<TypedText className="text-clr-accent-700">Welcome to LucioCode</TypedText>
				<TypedText className="text-clr-accent-700" delay={1}>
					<span>Let us begin the adventure</span>
				</TypedText>
				{/* <Image src={`data:image/svg+xml;base64,${base64data}`} alt="" width={100} height={100} /> */}
				<TypedText className="mt-5 mb-2 text-base font-semibold text-clr-accent" delay={2}>
					Enter your email
				</TypedText>
				<InputField
					state={email}
					setState={setEmail}
					type="email"
					onClick={() => setShowPasswordContainer(true)}
					success={isValidEmail}
					buttonText="Continue"
				/>
				{showPasswordContainer && (
					<>
						<TypedText className="mt-5 text-base font-semibold text-clr-accent" delay={0}>
							Create a password
						</TypedText>
						<InputField
							state={password}
							setState={setPassword}
							onClick={() => setShowNameContainer(true)}
							buttonText="Continue"
							type={showPassword ? 'text' : 'password'}
							success={PasswordStrength === 'strong' || PasswordStrength === 'medium'}
							RightIcon={
								showPassword ? (
									<Eye
										onClick={() => setShowPassword((c) => !c)}
										className="w-4 flex-shrink-0 cursor-pointer"
									/>
								) : (
									<EyeOff
										onClick={() => setShowPassword((c) => !c)}
										className="w-4 flex-shrink-0 cursor-pointer"
									/>
								)
							}
						/>

						{showNameContainer && (
							<>
								<TypedText className="mt-5 text-base font-semibold text-[#00cfc8]" delay={0}>
									Enter a name
								</TypedText>
								<InputField
									state={name}
									setState={setName}
									onClick={signupHandler}
									type="text"
									buttonText="Sing up"
									success={name.length > 1}
								/>
							</>
						)}
					</>
				)}
				{!isValidEmail && email !== '' && (
					<p className="p-5 text-center text-[#627597]">The email is not valid or already in use</p>
				)}

				{/* <div className="flex items-center"> */}
				{/* <div className={styles.chip}></div>
				{PasswordStrength === 'medium' || PasswordStrength === 'strong' ? (
					<div className={styles.chip}></div>
				) : (
					<div className={styles.emptyChip}></div>
				)}
				{PasswordStrength === 'strong' ? (
					<div className={styles.chip}></div>
				) : (
					<div className={styles.emptyChip}></div>
				)}
				<p
					className={`px-3 text-center ${
						PasswordStrength === 'weak'
							? 'text-red-500'
							: PasswordStrength === 'medium'
							? 'text-yellow-500'
							: 'text-green-500'
					}`}
				>
					{PasswordStrength}
				</p>
				</div> */}
			</div>
		</section>
	)
}
