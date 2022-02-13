import React, { useState } from 'react'
import { X } from 'react-feather'

interface WelcomeCardProps {
	colors: [string, string]
}

const WelcomeCard: React.FC<WelcomeCardProps> = ({ colors }) => {
	const [show, setShow] = useState(true)
	if (!show) return null
	return (
		<div
			className="p-8 my-2 bg-red-500 rounded-xl relative"
			style={{ backgroundImage: `linear-gradient(45deg, ${colors[0]}, ${colors[1]}` }}
		>
			<h2 className="text-4xl lg:text-5xl font-black mb-1 md:mb-2 break-words">Welcome, Adam</h2>
			<p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quasi dolores delectus iste!</p>
			<div
				onClick={() => setShow(false)}
				className="absolute cursor-pointer w-7 h-7 top-3 right-3 transition-colors bg-gray-800 hover:bg-gray-900 rounded-full flex items-center justify-center"
			>
				<X className="w-5 h-5" />
			</div>
		</div>
	)
}

export default WelcomeCard
