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
			<a>
				<div
					className={`relative cursor-pointer overflow-hidden rounded-2xl bg-gradient-to-br text-white shadow-lg transition-colors`}
					style={{ backgroundImage: `linear-gradient(to bottom right, ${theme[0]},${theme[1]}` }}
				>
					<div
						className={`min-h-[200px] w-full bg-black/10 p-4 transition hover:bg-black/20 md:py-5 lg:h-80`}
					>
						<p className="m-0 w-max rounded-lg bg-gray-100/10 py-1 px-2 text-xs font-normal uppercase text-gray-50">
							Programing
						</p>
						<p className="m-0 mt-2 overflow-hidden text-ellipsis break-words pr-0 font-serif text-3xl font-black text-white [white-space:_unset] [display:_-webkit-box] [-webkit-box-orient:_vertical] [-webkit-line-clamp:_2] md:mt-4 md:pr-3 lg:pr-5 lg:[-webkit-line-clamp:_5]">
							{name}
						</p>
						<p className="font-serif text-sm font-medium lg:text-base">
							{participants.length || 1} {participants.length > 1 ? 'students' : 'student'} | 3 tests
						</p>
					</div>
				</div>
			</a>
		</Link>
	)
}
