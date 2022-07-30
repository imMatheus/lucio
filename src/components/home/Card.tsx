import React from 'react'
import Image from 'next/image'

interface CardProps {
	src: string
	alt: string
	title: string
	children: React.ReactNode
}

const Card: React.FC<CardProps> = ({ src, alt, title, children }) => {
	return (
		<article>
			<div className="relative mb-5 aspect-square w-56 max-w-full sm:w-64 lg:w-full">
				<Image src={src} layout="fill" alt={alt} objectFit="cover" />
			</div>
			<h3 className="mb-2 text-lg font-bold md:text-xl">{title}</h3>
			<p className="font-light">{children}</p>
		</article>
	)
}

export default Card
