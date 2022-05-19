import { useAuth } from '@/context/AuthContext'
import React from 'react'
import Spinner from '@/components/spinner'
import Registration from './Registration'
import Image from 'next/image'
import Link from 'next/link'

interface DisplayUserProps {}

const DisplayUser: React.FC<DisplayUserProps> = ({}) => {
	const { fetchingUser, currentUser } = useAuth()

	return (
		<div className="flex items-center border-l border-l-gray-400 pl-3">
			{fetchingUser ? (
				<div className="mx-2 h-8 w-8">
					<Spinner />
				</div>
			) : currentUser ? (
				// <p className="text-xl mx-2">{currentUser.name}</p>
				<div className="flex gap-2">
					<div className="text-right">
						<p className="text-sm text-clr-text">{currentUser.name}</p>
						<p className="text-sm text-clr-bg-grayed">{currentUser.email}</p>
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
			) : (
				<Registration />
			)}
		</div>
	)
}

export default DisplayUser
