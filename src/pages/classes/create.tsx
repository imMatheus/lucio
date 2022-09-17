import React, { useState } from 'react'
import type { NextPage } from 'next'
import { Lock, Inbox, BookOpen } from 'react-feather'
import Button from '@/components/button'
import { useRouter } from 'next/router'
import Input from '@/components/form/Input'
import { MAX_LENGTHS, CLASS_PRIVACY } from '@/constants'
import PrivacyOption from '@/components/classes/PrivacyOption'
import { trpc } from '@/utils'

const Create: NextPage = () => {
	const router = useRouter()
	const [name, setName] = useState('')
	const [privacy, setPrivacy] = useState(CLASS_PRIVACY.OPEN)
	const createClassroomMutation = trpc.useMutation(['classrooms.create'])

	function createClassroom() {
		createClassroomMutation.mutate(
			{
				name,
				privacy
			},
			{
				onSuccess(res) {
					console.log('abc')
					console.log(res)
					router.push(`/classes/${res.id}`)
				},
				onError(e) {
					console.log('we succ')
					console.log(e)
				}
			}
		)
	}

	return (
		<div className="min-h-full-wo-nav max-w-4xl p-4 md:p-6">
			<div className="text-hollow w-max">
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

				<Button onClick={createClassroom}>Create class - {createClassroomMutation.isLoading + ''}</Button>
			</div>
		</div>
	)
}

export default Create
