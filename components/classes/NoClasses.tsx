import React from 'react'
import Button from '@/components/button'
import Link from 'next/link'
import axios from 'axios'
import { Data } from '@/types/returns/api/classes/join'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { useToast } from '@/context/ToastContext'

const NoClasses: React.FC = ({}) => {
	const router = useRouter()
	const { setToast } = useToast()

	async function joinClassHandler() {
		const code = prompt('Whats the code?')
		if (!code) return

		try {
			const { data }: { data: Data } = await axios.post('/api/classes/join', {
				code
			})

			if (data.classRoom) {
				router.push(`/classes/${data.classRoom._id}`)
			}
		} catch (error) {
			setToast({ message: 'Could not find class', type: 'error' })
		}
	}

	return (
		<div className="p-3 text-center md:p-16">
			<div className="relative mx-auto mb-4 h-48 sm:h-56 md:mb-8 lg:h-72">
				<Image src="/book.png" layout="fill" alt="holding book" objectFit="contain" />
			</div>
			<h1 className="mb-3 text-2xl md:text-4xl lg:text-6xl">Seems like you dont have any classes :\</h1>
			<p className="m-0 text-sm md:text-base">You can join a class or you can create a class</p>
			<div className="my-3 flex justify-center gap-3 md:gap-4">
				<Link href="/classes/create" passHref={true}>
					<a>
						<Button>Create class</Button>
					</a>
				</Link>
				<Button onClick={joinClassHandler}>Join class</Button>
			</div>
		</div>
	)
}

export default NoClasses
