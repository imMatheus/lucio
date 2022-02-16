import React from 'react'
import type { NextPage } from 'next'
import { useAuth } from '@/context/AuthContext'
import Button from '@/components/button'
import Image from 'next/image'
import ThemeCard from '@/components/profile/ThemeCard'

const Profile: NextPage = () => {
	const { fetchingUser, currentUser, logout } = useAuth()

	return (
		<main className="max-w-7xl mx-auto p-4 md:p-8">
			Profile
			<section className="my-3">
				<h2 className="text-2xl font-bold mb-2">Themes</h2>

				<form className="grid grid-cols-2 lg:flex gap-3 lg:gap-5 lg:flex-wrap">
					<ThemeCard id="theme_dark" label="Dark">
						<Image src="/theme_dark.svg" layout="fill" alt="theme dark" objectFit="cover" />
					</ThemeCard>
					<ThemeCard id="theme_light" label="Light">
						<Image src="/theme_light.svg" layout="fill" alt="theme light" objectFit="cover" />
					</ThemeCard>
					<ThemeCard id="theme_system" label="System">
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
			<Button>Logout</Button>
		</main>
	)
}

export default Profile
