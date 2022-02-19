import React from 'react'
import type { NextPage } from 'next'
import { useAuth } from '@/context/AuthContext'
import Button from '@/components/button'
import Image from 'next/image'
import ThemeCard from '@/components/profile/ThemeCard'
import Input from '@/components/profile/Input'
import useDarkMode from '@/hooks/useDarkMode'

const Profile: NextPage = () => {
	const { fetchingUser, currentUser, logout } = useAuth()
	const [darkMode, setDarkMode] = useDarkMode()
	console.log(darkMode)

	return (
		<main className="mx-auto max-w-7xl p-4 md:px-8">
			<section className="my-5 max-w-2xl">
				<h2 className="mb-2 text-lg font-bold md:text-xl lg:text-2xl">Personal info</h2>

				<Input type="text" label="Name" placeholder="Joe doe" id="name" autoComplete="name" />
				<Input
					type="email"
					label="Email address"
					placeholder="you@example.com"
					id="email-address"
					autoComplete="email"
				/>

				<div className="mb-3">
					<label htmlFor="bio" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
						Bio
					</label>
					<div className="mt-1">
						<textarea
							id="bio"
							name="bio"
							rows={4}
							className="mt-1 block max-h-[30rem] min-h-[3rem] w-full rounded-md border border-gray-300 shadow-sm focus:border-theme-500 focus:ring-theme-500 dark:border-gray-700 dark:bg-black sm:text-sm"
							placeholder="Tell people about yourself"
						></textarea>
					</div>
				</div>
			</section>
			<section className="my-5">
				<h2 className="mb-2 text-lg font-bold md:text-xl lg:text-2xl">Themes</h2>
				<form className="grid grid-cols-2 gap-3 lg:flex lg:flex-wrap lg:gap-5">
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
			<section className="my-5">
				<h2 className="mb-2 text-lg font-bold md:text-xl lg:text-2xl">Actions</h2>
				<div className="flex flex-wrap items-center gap-3">
					<Button variant="warning">Change password</Button>
					<Button variant="error" onClick={async () => await logout()}>
						Logout
					</Button>
					<div className="w-full"></div>
					<button className="btn-shadow">Create a class</button>
					<button className="btn-shadow-1">Change password</button>
					<button className="btn-shadow-2">Logout</button>
					<button className="btn-shadow-3">Create</button>
					<button className="btn-shadow-4">Make a class to help students</button>
					<button className="btn-shadow-5">Lorem ipsum dolor sit amet.</button>
					<button className="btn-shadow-6">Lorem, ipsum dolor.</button>
				</div>
			</section>
		</main>
	)
}

export default Profile
