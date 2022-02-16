import React from 'react'
import type { NextPage } from 'next'
import { useAuth } from '@/context/AuthContext'
import Button from '@/components/button'
import Image from 'next/image'
import ThemeCard from '@/components/profile/ThemeCard'
import useDarkMode from '@/hooks/useDarkMode'

const Profile: NextPage = () => {
	const { fetchingUser, currentUser, logout } = useAuth()
	const [darkMode, setDarkMode] = useDarkMode()

	return (
		<main className="max-w-7xl mx-auto p-4 md:p-8">
			Profile
			<section className="my-5 max-w-2xl">
				<h2 className="text-lg md:text-xl lg:text-2xl font-bold mb-2">Personal info</h2>

				<div className="mb-3">
					<label
						htmlFor="email-address"
						className="block text-sm font-medium text-gray-700 dark:text-gray-200"
					>
						Email address
					</label>
					<input
						type="text"
						name="email-address"
						placeholder="you@example.com"
						id="email-address"
						autoComplete="email"
						className="dark:bg-black mt-1 focus:ring-theme-500 focus:border-theme-500 block w-full shadow-sm sm:text-sm border-gray-300 dark:border-gray-700 rounded-md"
					/>
				</div>
				<div className="mb-3">
					<label htmlFor="bio" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
						Bio
					</label>
					<div className="mt-1">
						<textarea
							id="bio"
							name="bio"
							rows={4}
							className="dark:bg-black min-h-[3rem] max-h-[30rem] shadow-sm focus:ring-theme-500 focus:border-theme-500 mt-1 block w-full sm:text-sm border border-gray-300 dark:border-gray-700 rounded-md"
							placeholder="Tell people about yourself"
						></textarea>
					</div>
				</div>
			</section>
			<section className="my-5">
				<h2 className="text-lg md:text-xl lg:text-2xl font-bold mb-2">Themes</h2>
				<form className="grid grid-cols-2 lg:flex gap-3 lg:gap-5 lg:flex-wrap">
					<ThemeCard
						id="theme_dark"
						label="Dark"
						onClick={() => setDarkMode('dark')}
						checked={darkMode === 'dark'}
					>
						<Image src="/theme_dark.svg" layout="fill" alt="theme dark" objectFit="cover" />
					</ThemeCard>
					<ThemeCard
						id="theme_light"
						label="Light"
						onClick={() => setDarkMode('light')}
						checked={darkMode === 'light'}
					>
						<Image src="/theme_light.svg" layout="fill" alt="theme light" objectFit="cover" />
					</ThemeCard>
					<ThemeCard
						id="theme_system"
						label="System"
						onClick={() => setDarkMode('system')}
						checked={darkMode === 'system'}
					>
						<Image src="/theme_light.svg" layout="fill" alt="theme light" objectFit="cover" />
						<div className="absolute w-full h-full inset-0 left-1/2">
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
			<section className="my-5">
				<h2 className="text-lg md:text-xl lg:text-2xl font-bold mb-2">Actions</h2>
				<div className="flex gap-2">
					<Button variant="warning">Change password</Button>
					<Button variant="error" onClick={async () => await logout()}>
						Logout
					</Button>
				</div>
			</section>
		</main>
	)
}

export default Profile
