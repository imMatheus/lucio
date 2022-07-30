import React, { useState } from 'react'
import type { NextPage } from 'next'
import { Lock, Inbox, BookOpen } from 'react-feather'
import { PrivacyEnum } from '@/types/ClassType'

import Button from '@/components/button'
import { useRouter } from 'next/router'
import { arrayEquals } from '@/utils/arrayEquals'
import { colors as Colors } from '@/constants'
import { useAuth } from '@/context/AuthContext'

const Create: NextPage = () => {
	const router = useRouter()
	const { currentUser } = useAuth()
	const [name, setName] = useState('')
	const [colors, setColors] = useState<[string, string]>([Colors.theme, Colors.theme])
	const [privacy, setPrivacy] = useState(PrivacyEnum.Public)
	const [loading, setLoading] = useState(false)

	// async function createClassRoom() {
	// 	if (!currentUser) return
	// 	const data = {
	// 		name,
	// 		colors,
	// 		privacy,
	// 		ownerId: currentUser.uid,
	// 		members: [{ name: currentUser.name, email: currentUser.email, id: currentUser.uid }]
	// 	}

	// 	setLoading(true)
	// 	const res = await addDoc(collection(fs, 'classes'), data)
	// 	setLoading(false)
	// 	if (res.id) router.push('/classes/' + res.id)
	// }

	return (
		<div className="min-h-full-wo-nav p-4 md:p-6">
			<div
				className="text-hollow w-max"
				style={{ backgroundImage: `linear-gradient(45deg, ${colors[0]}, ${colors[1]}` }}
			>
				<h2 className="mb-4 text-2xl font-black md:mb-6 md:text-5xl">Create a class</h2>
			</div>

			<label htmlFor="name" className="mb-2 block text-base font-semibold text-clr-text lg:text-lg">
				Class name
			</label>
			<input
				type="text"
				name="name"
				value={name}
				onChange={(e) => setName(e.target.value)}
				id="name"
				placeholder="Intro to computer science..."
				autoComplete="given-name"
				className="mt-1 block w-full max-w-lg rounded-md border-clr-border bg-transparent shadow-sm focus:border-clr-accent focus:ring-clr-accent sm:text-sm lg:max-w-lg 2xl:max-w-5xl"
			/>

			<div className="my-3 md:my-4">
				<p className="m-0 text-base font-semibold text-clr-text lg:text-lg">Theme</p>
			</div>

			<div className="my-3 md:py-4">
				<form>
					<p className="m-0 mb-2 text-lg font-black text-clr-text">Privacy</p>
					<div className="space-y-3">
						Public:Anyone with the class code can join the class Anyone with the class code can send an
						invite to join the class Closed: No-one can join or request to join the class
					</div>
				</form>
			</div>
			{/* <Button >Create class</Button> */}
		</div>
	)
}

export default Create
