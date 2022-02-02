import { useAuth } from '@/context/AuthContext'
import React from 'react'
import Spinner from '@/components/spinner'
import Registration from './Registration'
import Image from 'next/image'

interface DisplayUserProps {}

const DisplayUser: React.FC<DisplayUserProps> = ({}) => {
	const { fetchingUser, currentUser, logout } = useAuth()
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
						<p className="text-sm text-gray-100">{currentUser.username}</p>
						<p className="text-sm text-gray-500">{currentUser.email}</p>
					</div>
					<div className="w-10 h-10 relative cursor-pointer">
						<div className="w-full h-full bg-gray-500 animate-pulse rounded-full"></div>
						<Image src="/rock.jpeg" className="rounded-full" layout="fill" alt="rock" />
						{/* <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-red-600 text-white text-xs flex justify-center items-center">
							3
						</div> */}
					</div>
				</div>
			) : (
				<Registration />
			)}
		</div>
	)
}

export default DisplayUser
