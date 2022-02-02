import React from 'react'
import Button from '@/components/button'
import Link from 'next/link'
import axios from 'axios'
import { Data } from '@/types/returns/api/classes/join'
import { useRouter } from 'next/router'
interface NoClassesProps {}

const NoClasses: React.FC<NoClassesProps> = ({}) => {
	const router = useRouter()

	return (
		<div className="p-3 md:p-16 text-center">
			<h1 className="text-2xl md:text-4xl lg:text-6xl mb-3">Seems like you dont have any classes :\</h1>
			<p className="text-sm md:text-base m-0">You can join a class or you can create a class</p>
			<div className="flex justify-center gap-3 md:gap-4 my-3">
				<Link href="/classes/create" passHref={true}>
					{/* <a> */}
					<Button>Create class</Button>
					{/* </a> */}
				</Link>
				<Button
					onClick={async () => {
						const code = prompt('Whats the code?')
						const { data }: { data: Data } = await axios.post('/api/classes/join', {
							code
						})
						if (data.classRoom) {
							router.push(`/classes/${data.classRoom._id}`)
						}
					}}
				>
					Join class
				</Button>
			</div>
		</div>
	)
}

export default NoClasses
