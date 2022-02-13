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
		<div className="flex items-center pl-3 border-l border-l-gray-400 dark:border-l-gray-600">
			{fetchingUser ? (
				<div className="w-8 h-8 mx-2">
					<Spinner />
				</div>
			) : currentUser ? (
				// <p className="text-xl mx-2">{currentUser.username}</p>
				<div className="flex gap-2">
					<div className="text-right">
						<p className="text-sm text-gray-900 dark:text-gray-100">{currentUser.username}</p>
						<p className="text-sm text-gray-500">{currentUser.email}</p>
					</div>

					<Link href="/profile" passHref={true}>
						<a className="w-10 h-10 relative cursor-pointer">
							<div className="w-full h-full bg-gray-500 animate-pulse rounded-full"></div>
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
