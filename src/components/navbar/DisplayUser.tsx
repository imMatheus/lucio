import { useAuth } from '@/context/AuthContext'
import React from 'react'
import Spinner from '@/components/spinner'
import Image from 'next/image'
import Link from 'next/link'
import Button from '@/components/button'

interface DisplayUserProps {}

const DisplayUser: React.FC<DisplayUserProps> = ({}) => {
	const { fetchingUser, currentUser, login } = useAuth()

	if (fetchingUser)
		return (
			<div className="mx-2 h-8 w-8">
				<Spinner />
				hej
			</div>
		)

	return (
		<div className="flex items-center border-l border-l-clr-border pl-3">
			{currentUser ? (
				<>
					<p className="mx-2 text-xl">{currentUser.name}</p>
					<div className="flex gap-2">
						<div className="text-right">
							<p className="text-sm text-clr-text">{currentUser.name}</p>
							<p className="text-sm text-clr-text-grayed">{currentUser.email}</p>
						</div>

						<Link href="/profile" passHref={true}>
							<a className="relative h-10 w-10 cursor-pointer">
								<div className="h-full w-full animate-pulse rounded-full bg-clr-bg-grayed"></div>
								<Image src="/rock.jpeg" className="rounded-full" layout="fill" alt="rock" />
								{/* <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-white text-xs flex justify-center items-center">
								3
							</div> */}
							</a>
						</Link>
					</div>
				</>
			) : (
				<div className="flex gap-2">
					<Button onClick={login}>Sign in</Button>
					<Button>Create account</Button>
				</div>
			)}
		</div>
	)
}

export default DisplayUser
