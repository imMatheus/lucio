import React from 'react'
import Link from 'next/link'
import styles from 'styles/classes.module.scss'
import Image from 'next/image'
import ClassType from '@/types/ClassType'
import { validateThemeColors } from 'utils/validateClassThemeColors'
// import { style } from '@dicebear/avatars/dist/utils'

interface ClassesCardProps {
	data: ClassType
}

/* <div
	className={`bg-gradient-to-br from-lime-500 bg-opacity-60 backdrop-blur-xl to-purple-400 text-white rounded-2xl px-4 md:px-5`} */

// ></div>

export default function ClassCard({ data: { _id, name, code, participants, theme } }: ClassesCardProps) {
	theme = validateThemeColors(theme)

	return (
		<Link href={`/classes/${_id}`} passHref={true}>
			<div
				className={`min-h-[200px] lg:h-80 transition-colors bg-gradient-to-br shadow-lg text-white overflow-hidden rounded-2xl p-0 m-0 cursor-pointer`}
				style={{ backgroundImage: `linear-gradient(to bottom right, ${theme[0]},${theme[1]}` }}
			>
				<div className={`transition bg-black/10 hover:bg-black/20 p-4 md:py-5 w-full h-full`}>
					<p className="text-xs font-normal text-gray-50 uppercase m-0 py-1 px-2 bg-gray-100/10 w-max rounded-lg">
						Programing
					</p>
					<p className="font-black [white-space:_unset] [display:_-webkit-box] overflow-hidden break-words text-ellipsis [-webkit-box-orient:_vertical] [-webkit-line-clamp:_5] font-serif m-0 mt-2 md:mt-4 text-white text-3xl pr-0 md:pr-12 lg:pr-16">
						{/* <p className="font-black overflow-hidden break-all text-ellipsis font-serif m-0 mt-2 md:mt-4 text-white text-4xl pr-0 md:pr-12"> */}
						{name}
					</p>
					<p className="font-medium font-serif text-sm lg:text-base">24 students | 3 tests</p>
				</div>
			</div>
		</Link>
	)
}
