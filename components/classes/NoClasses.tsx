import React from 'react'
import Button from '@/components/button'
import Link from 'next/link'
import axios from 'axios'

interface NoClassesProps {}

const NoClasses: React.FC<NoClassesProps> = ({}) => {
	return (
		<div className="p-3 md:p-16 text-center absolute top-1/2 -translate-y-1/2 left-0 right-0">
			<h1 className="text-2xl md:text-4xl lg:text-6xl mb-3">Seems like you dont have any classes :\</h1>
			<p className="text-sm md:text-base m-0">You can join a class or you can create a class</p>
			<div className="flex justify-center gap-3 md:gap-4 my-3">
				<Link href="/classes/create" passHref={true}>
					<Button>Create class</Button>
				</Link>
				<Button
					onClick={async () => {
						const code = prompt('Whats the code?')
						const res: any = await axios.post('/api/class/join', {
							code
						})
						console.log('res')
						console.log(res)
					}}
				>
					Join class
				</Button>
			</div>
		</div>
	)
}

export default NoClasses
