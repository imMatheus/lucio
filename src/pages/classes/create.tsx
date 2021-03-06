import React, { useState } from 'react'
import type { NextPage } from 'next'
import { Lock, Inbox, BookOpen } from 'react-feather'
import { PrivacyEnum } from '@/types/ClassType'
import Button from '@/components/button'
import { useRouter } from 'next/router'
import { arrayEquals } from '@/utils/arrayEquals'
import { colors as Colors } from '@/constants'
import { useAuth } from '@/context/AuthContext'
import Input from '@/components/form/Input'
import { MAX_LENGTHS } from '@/constants'

const Create: NextPage = () => {
	const router = useRouter()
	const { currentUser } = useAuth()
	const [name, setName] = useState('')
	const [colors, setColors] = useState<[string, string]>([Colors.theme, Colors.theme])
	const [privacy, setPrivacy] = useState(PrivacyEnum.Public)
	const [loading, setLoading] = useState(false)

	return (
		<div className="min-h-full-wo-nav max-w-xl p-4 md:p-6">
			<div
				className="text-hollow w-max"
				style={{ backgroundImage: `linear-gradient(45deg, ${colors[0]}, ${colors[1]}` }}
			>
				<h2 className="mb-4 text-2xl font-black md:mb-6 md:text-5xl">Create a class</h2>
			</div>

			<Input label="Class name" value={name} onChange={setName} maxLength={MAX_LENGTHS.CLASS_NAME} />

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
