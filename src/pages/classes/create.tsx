import React, { useState } from 'react'
import type { NextPage } from 'next'
import { Lock, Inbox, BookOpen } from 'react-feather'
import Button from '@/components/button'
import { useRouter } from 'next/router'
import { arrayEquals } from '@/utils/arrayEquals'
import { colors as Colors } from '@/constants'
import { useAuth } from '@/context/AuthContext'
import Input from '@/components/form/Input'
import { MAX_LENGTHS, CLASS_PRIVACY } from '@/constants'
import PrivacyOption from '@/components/classes/PrivacyOption'

const Create: NextPage = () => {
	const router = useRouter()
	const { currentUser } = useAuth()
	const [name, setName] = useState('')
	const [colors, setColors] = useState<[string, string]>([Colors.theme, Colors.theme])
	const [privacy, setPrivacy] = useState(CLASS_PRIVACY.OPEN)
	const [loading, setLoading] = useState(false)

	function createClassroom() {}

	return (
		<div className="min-h-full-wo-nav max-w-4xl p-4 md:p-6">
			<div
				className="text-hollow w-max"
				style={{ backgroundImage: `linear-gradient(45deg, ${colors[0]}, ${colors[1]}` }}
			>
				<h2 className="mb-4 text-2xl font-black md:mb-6 md:text-5xl">Create a class</h2>
			</div>

			<div className="space-y-4">
				<Input label="Class name" value={name} onChange={setName} maxLength={MAX_LENGTHS.CLASS_NAME} />

				<div>
					<h2 className="mb-2 text-xl font-bold">Privacy</h2>
					<div className="grid grid-cols-3 gap-4" role="radiogroup">
						<PrivacyOption
							privacy={CLASS_PRIVACY.OPEN}
							label="Public"
							Icon={BookOpen}
							value={privacy}
							setValue={setPrivacy}
						>
							Anyone with the class code can join the class
						</PrivacyOption>
						<PrivacyOption
							privacy={CLASS_PRIVACY.INVITE}
							label="Invite"
							Icon={Inbox}
							value={privacy}
							setValue={setPrivacy}
						>
							Anyone with the class code can send an invite to join the class
						</PrivacyOption>
						<PrivacyOption
							privacy={CLASS_PRIVACY.CLOSED}
							label="Closed"
							Icon={Lock}
							value={privacy}
							setValue={setPrivacy}
						>
							No-one can join or request to join the class
						</PrivacyOption>
					</div>
				</div>

				<Button>Create class</Button>
			</div>
		</div>
	)
}

export default Create
