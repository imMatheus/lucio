import React, { useState } from 'react'
import { X } from 'react-feather'
import { useAuth } from '@/context/AuthContext'

interface WelcomeCardProps {
	colors: [string, string]
}

const WelcomeCard: React.FC<WelcomeCardProps> = ({ colors }) => {
	const [show, setShow] = useState(true)
	const { currentUser } = useAuth()
	if (!show) return null
	return (
		<div
			className="relative my-2 rounded-xl p-8 text-clr-bg"
			style={{ backgroundImage: `linear-gradient(45deg, ${colors[0]}, ${colors[1]}` }}
		>
			<h2 className="mb-1 break-words text-4xl font-black md:mb-2 lg:text-5xl">Welcome, {currentUser?.name}</h2>
			<p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quasi dolores delectus iste!</p>
			<div
				onClick={() => setShow(false)}
				className="absolute top-3 right-3 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-gray-800 transition-colors hover:bg-clr-text"
			>
				<X className="h-5 w-5" />
			</div>
		</div>
	)
}

export default WelcomeCard
