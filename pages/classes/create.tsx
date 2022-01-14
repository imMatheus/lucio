import React, { useState } from 'react'
import type { NextPage } from 'next'
import { Lock, Inbox, BookOpen } from 'react-feather'
import { PrivacyEnum } from '@/types/ClassType'
import PrivacyOption from '@/components/classes/PrivacyOption'
import Button from '@/components/button'
import axios from 'axios'
import { useRouter } from 'next/router'
interface CreateProps {
	iColors: [String, String]
}

function arrayEquals(a: any[], b: any[]) {
	return Array.isArray(a) && Array.isArray(b) && a.length === b.length && a.every((val, index) => val === b[index])
}

const Create: NextPage = () => {
	const router = useRouter()
	const [name, setName] = useState('')
	const [colors, setColors] = useState<[String, String]>(['#2266ff', '#2266ff'])
	const [privacy, setPrivacy] = useState(PrivacyEnum.Public)

	async function createClassRoom() {
		const res = await axios.post('http://localhost:3000/api/class/create', {
			name,
			privacy,
			theme: colors
		})
		console.log('this is the shiii')

		console.log(res.status)
		if (res.status === 200) router.push('/classes')
	}

	const Color: React.FC<CreateProps> = ({ iColors }) => {
		return (
			<div
				className={`w-12 h-12 md:w-14 md:h-14 rounded-full flex overflow-hidden cursor-pointer border-2 ${
					arrayEquals(iColors, colors)
						? 'border-black bg-black dark:border-white dark:bg-white'
						: 'border-white bg-white dark:border-black dark:bg-black'
				}`}
				onClick={() => setColors([...iColors])}
			>
				{/* @ts-ignore */}
				<div className="h-full w-full" style={{ background: iColors[0] }}></div>
				{iColors[0] !== iColors[1] && (
					<>
						{/* @ts-ignore */}
						<div className="h-full w-full" style={{ background: iColors[1] }}></div>
					</>
				)}
			</div>
		)
	}
	console.log(PrivacyEnum)

	return (
		<div className="p-4 md:p-6 min-h-full-wo-nav bg-neutral-200/40 dark:bg-neutral-900">
			<h2>Create a class</h2>

			<div className="">
				<label
					htmlFor="first-name"
					className="mb-2 block text-sm lg:text-base font-bold text-neutral-900 dark:text-neutral-50"
				>
					Class name
				</label>
				<input
					type="text"
					name="first-name"
					value={name}
					onChange={(e) => setName(e.target.value)}
					id="first-name"
					autoComplete="given-name"
					className="mt-1 bg-transparent focus:ring-theme-500 focus:border-theme-500 block w-full sm:max-w-lg lg:max-w-lg 2xl:max-w-5xl shadow-sm sm:text-sm border-neutral-300 dark:border-neutral-600/70 rounded-md"
				/>
			</div>

			<div className="my-3 md:py-4">
				<p className="m-0 text-lg font-black text-neutral-900 dark:text-neutral-50">Theme</p>
				<div className="flex gap-2 my-2 flex-wrap max-w-3xl">
					<Color iColors={['#2266ff', '#2266ff']} />
					<Color iColors={['#A71D31', '#A71D31']} />
					<Color iColors={['#FF9B42', '#FF9B42']} />
					<Color iColors={['#00916e', '#00916e']} />
					<Color iColors={['#dd9787', '#dd9787']} />
					<Color iColors={['#f7567c', '#f7567c']} />
					<Color iColors={['#3d2c2e', '#3d2c2e']} />
					<Color iColors={['#606c38', '#606c38']} />
					<Color iColors={['#ED6A5A', '#F4F1BB']} />
					<Color iColors={['#071E22', '#1D7874']} />
					<Color iColors={['#3a0ca3', '#4895ef']} />
					<Color iColors={['#F75C03', '#2274A5']} />
					<Color iColors={['#14213d', '#fca311']} />
					<Color iColors={['#0aefff', '#deff0a']} />
					<Color iColors={['#00916e', '#ffcf00']} />
					<Color iColors={['#301A4B', '#6DB1BF']} />
					<Color iColors={['#F7B2AD', '#333232']} />
					<Color iColors={['#93B7BE', '#F1FFFA']} />
					<Color iColors={['#93A8AC', '#424B54']} />
					<Color iColors={['#EDAE49', '#D1495B']} />
					<Color iColors={['#1d3958', '#ab2836']} />
					<Color iColors={['#160f29', '#368f8b']} />
					<Color iColors={['#000000', '#502F4C']} />
					<Color iColors={['#F18805', '#F0A202']} />
				</div>
			</div>

			<div className="my-3 md:py-4">
				<form>
					<p className="m-0 mb-2 text-lg font-black text-neutral-900 dark:text-neutral-50">Privacy</p>
					<div className="space-y-3">
						<PrivacyOption
							Icon={BookOpen}
							value={PrivacyEnum.Public}
							id="privacy_public"
							setPrivacy={setPrivacy}
							privacy={privacy}
						>
							<span className="text-neutral-900 dark:text-neutral-50 font-semibold"> Public: </span>{' '}
							anyone with the class code can join
						</PrivacyOption>
						<PrivacyOption
							Icon={Inbox}
							value={PrivacyEnum.Invite}
							id="privacy_invite"
							setPrivacy={setPrivacy}
							privacy={privacy}
						>
							<span className="text-neutral-900 dark:text-neutral-50 font-semibold"> Invite: </span>
							anyone with the class code ca send an invite to join
						</PrivacyOption>
						<PrivacyOption
							Icon={Lock}
							value={PrivacyEnum.Closed}
							id="privacy_closed"
							setPrivacy={setPrivacy}
							privacy={privacy}
						>
							<span className="text-neutral-900 dark:text-neutral-50 font-semibold"> Closed: </span>no-one
							can join or request to join
						</PrivacyOption>
					</div>
				</form>
			</div>
			<Button onClick={createClassRoom}>Create class</Button>
		</div>
	)
}

export default Create
