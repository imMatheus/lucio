import React, { useState } from 'react'
import type { NextPage } from 'next'
import { Lock, Inbox, BookOpen } from 'react-feather'
import { PrivacyEnum } from '@/types/ClassType'
import PrivacyOption from '@/components/classes/PrivacyOption'
import Button from '@/components/button'
import axios from 'axios'
import { useRouter } from 'next/router'
import { arrayEquals } from '@/utils/arrayEquals'
import { Data } from '@/types/returns/api/classes/create'
import ColorSelector from '@/components/classes/colorselector'

import { colors as Colors } from '@/constants'

const Create: NextPage = () => {
	const router = useRouter()
	const [name, setName] = useState('')
	const [colors, setColors] = useState<[string, string]>([Colors.theme, Colors.theme])
	const [privacy, setPrivacy] = useState(PrivacyEnum.Public)

	async function createClassRoom() {
		const res = await axios.post('http://localhost:3000/api/classes/create', {
			name,
			privacy,
			theme: colors
		})
		const { data }: { data: Data } = res
		if (res.status === 200 && data.class && data.class._id) return router.push(`/classes/${data.class._id}`)

		router.push('/classes')
	}

	return (
		<div className="min-h-full-wo-nav bg-gray-200/40 p-4 dark:bg-gray-900 md:p-6">
			<div
				className="text-hollow w-max"
				style={{ backgroundImage: `linear-gradient(45deg, ${colors[0]}, ${colors[1]}` }}
			>
				<h2 className="mb-4 text-2xl font-black md:mb-6 md:text-5xl">Create a class</h2>
			</div>

			<label
				htmlFor="name"
				className="mb-2 block text-base font-semibold text-gray-900 dark:text-gray-50 lg:text-lg"
			>
				Class name
			</label>
			<input
				type="text"
				name="name"
				value={name}
				onChange={(e) => setName(e.target.value)}
				id="name"
				autoComplete="given-name"
				className="mt-1 block w-full rounded-md border-gray-300 bg-transparent shadow-sm focus:border-theme-500 focus:ring-theme-500 dark:border-gray-600/70 sm:max-w-lg sm:text-sm lg:max-w-lg 2xl:max-w-5xl"
			/>

			<div className="my-3 md:my-4">
				<p className="m-0 text-base font-semibold text-gray-900 dark:text-gray-50 lg:text-lg">Theme</p>
				<ColorSelector currentColors={colors} setColors={setColors} />
			</div>

			<div className="my-3 md:py-4">
				<form>
					<p className="m-0 mb-2 text-lg font-black text-gray-900 dark:text-gray-50">Privacy</p>
					<div className="space-y-3">
						<PrivacyOption
							Icon={BookOpen}
							value={PrivacyEnum.Public}
							id="privacy_public"
							setPrivacy={setPrivacy}
							privacy={privacy}
						>
							<span className="font-semibold text-gray-900 dark:text-gray-50"> Public: </span> Anyone with
							the class code can join the class
						</PrivacyOption>
						<PrivacyOption
							Icon={Inbox}
							value={PrivacyEnum.Invite}
							id="privacy_invite"
							setPrivacy={setPrivacy}
							privacy={privacy}
						>
							<span className="font-semibold text-gray-900 dark:text-gray-50"> Invite: </span>
							Anyone with the class code can send an invite to join the class
						</PrivacyOption>
						<PrivacyOption
							Icon={Lock}
							value={PrivacyEnum.Closed}
							id="privacy_closed"
							setPrivacy={setPrivacy}
							privacy={privacy}
						>
							<span className="font-semibold text-gray-900 dark:text-gray-50"> Closed: </span>No-one can
							join or request to join the class
						</PrivacyOption>
					</div>
				</form>
			</div>
			<Button onClick={createClassRoom}>Create class</Button>
		</div>
	)
}

export default Create
