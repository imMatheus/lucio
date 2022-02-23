import React, { useRef, useState } from 'react'
import type { NextPage } from 'next'
import { useAuth } from '@/context/AuthContext'
import Button from '@/components/button'
import Image from 'next/image'
import ThemeCard from '@/components/profile/ThemeCard'
import Input from '@/components/profile/Input'
import useDarkMode from '@/hooks/useDarkMode'
import { useToast } from '@/context/ToastContext'

const Profile: NextPage = () => {
	const { currentUser, logout, updateUser } = useAuth()
	const { setToast } = useToast()
	const [darkMode, setDarkMode] = useDarkMode()
	const [loading, setLoading] = useState(false)

	// state for form
	// name
	const nameInputRef = useRef<HTMLInputElement>(null)
	const [nameError, setNameError] = useState('')

	//location
	const locationInputRef = useRef<HTMLInputElement>(null)
	const [locationError, setLocationError] = useState('')

	//school
	const schoolInputRef = useRef<HTMLInputElement>(null)
	const [schoolError, setSchoolError] = useState('')

	// bio
	const [bioError, setBioError] = useState('')
	const bioInputRef = useRef<HTMLTextAreaElement>(null)

	console.log(currentUser)
	console.log('Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam.'.length)

	if (!currentUser) return null

	async function updateProfileHandler() {
		try {
			if (nameInputRef.current && bioInputRef.current && locationInputRef.current && schoolInputRef.current) {
				setLoading(true)

				const { message, errorType } = await updateUser({
					name: nameInputRef.current.value,
					bio: bioInputRef.current.value,
					location: locationInputRef.current.value,
					school: schoolInputRef.current.value
				})

				// success
				if (!message) {
					setToast({ message: 'Successfully updated profile', type: 'success' })
					setLoading(false)
					return
				}

				// it was not an error with the name or bio, something else went wrong
				if (!errorType) {
					setToast({ message: message, type: 'error' })
				}
				if (errorType === 'name') {
					setNameError(message)
					setBioError('')
					nameInputRef.current.focus()
				}
				if (errorType === 'bio') {
					setBioError(message)
					setNameError('')
					bioInputRef.current.focus()
				}
			}
		} catch (error) {
			setToast({ message: 'Could not update profile', type: 'error' })
		}
		setLoading(false)
	}

	return (
		<main className="mx-auto max-w-7xl p-4 md:px-8">
			<section className="my-5 max-w-2xl">
				<h2 className="mb-2 text-lg font-bold md:text-xl lg:text-2xl">
					Personal info{' '}
					<span className="text-sm font-light text-gray-500 xl:text-base">- {currentUser.email}</span>
				</h2>

				<Input
					ref={nameInputRef}
					type="text"
					label="Name"
					placeholder="Joe doe"
					id="name"
					autoComplete="name"
					maxLength={40}
					defaultValue={currentUser.name}
				/>
				<div className="grid md:grid-cols-2 md:gap-3">
					<Input
						ref={locationInputRef}
						type="text"
						label="Location"
						placeholder="United States of America..."
						id="location"
						autoComplete="location"
						maxLength={50}
						defaultValue={currentUser.location}
					/>
					<Input
						ref={schoolInputRef}
						type="text"
						label="School"
						placeholder="Harvard..."
						id="school"
						autoComplete="school"
						maxLength={50}
						defaultValue={currentUser.school}
					/>
				</div>

				<div className="mb-3">
					<label htmlFor="bio" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
						Bio
					</label>
					<div className="mt-1">
						<textarea
							ref={bioInputRef}
							id="bio"
							name="bio"
							rows={4}
							maxLength={1000}
							defaultValue={currentUser.bio}
							className="mt-1 block max-h-80 min-h-[3rem] w-full rounded-md border border-gray-300 shadow-sm focus:border-theme-500 focus:ring-theme-500 dark:border-gray-700 dark:bg-black sm:text-sm"
							placeholder="Tell people about yourself"
						></textarea>
					</div>
				</div>
			</section>

			<section className="my-5">
				<h2 className="mb-2 text-lg font-bold md:text-xl lg:text-2xl">Actions</h2>
				<div className="flex flex-wrap items-center gap-3">
					<button className="btn-shadow-3" onClick={updateProfileHandler}>
						Update profile
					</button>
					<button className="btn-shadow-2">Change password</button>
					<button className="btn-shadow-1" onClick={async () => await logout()}>
						Logout
					</button>
				</div>
			</section>

			<section className="my-5">
				<h2 className="mb-2 text-lg font-bold md:text-xl lg:text-2xl">Themes</h2>
				<form className="grid grid-cols-2 gap-3 lg:flex lg:flex-wrap lg:gap-5">
					<ThemeCard
						id="theme_light"
						label="Light"
						onClick={() => setDarkMode('light')}
						checked={darkMode === 'light'}
					>
						<Image src="/theme_light.svg" layout="fill" alt="theme light" objectFit="cover" />
					</ThemeCard>
					<ThemeCard
						id="theme_dark"
						label="Dark"
						onClick={() => setDarkMode('dark')}
						checked={darkMode === 'dark'}
					>
						<Image src="/theme_dark.svg" layout="fill" alt="theme dark" objectFit="cover" />
					</ThemeCard>
					<ThemeCard
						id="theme_system"
						label="System"
						onClick={() => setDarkMode('system')}
						checked={darkMode === 'system'}
					>
						<Image src="/theme_light.svg" layout="fill" alt="theme light" objectFit="cover" />
						<div className="absolute inset-0 left-1/2 h-full w-full">
							<Image
								src="/theme_dark.svg"
								layout="fill"
								alt="theme light"
								objectFit="cover"
								className="-translate-x-1/2"
							/>
						</div>
					</ThemeCard>
				</form>
			</section>
		</main>
	)
}

export default Profile
