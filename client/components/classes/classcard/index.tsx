import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import ClassType from '@/types/ClassType'
import { validateThemeColors } from '@/utils/validateThemeColors'
// import { style } from '@dicebear/avatars/dist/utils'
import { MapPin, Link as LinkIcon, Code, Book, Inbox, Lock } from 'react-feather'
import Chip from './Chip'

interface ClassesCardProps {
	data: ClassType
}

export default function ClassCard({ data: { _id, name, code, members, theme, privacy } }: ClassesCardProps) {
	theme = validateThemeColors(theme)

	return (
		<Link href={`/classes/${_id}`} passHref={true}>
			<a>
				<div
					className={`relative cursor-pointer overflow-hidden rounded-2xl bg-gradient-to-br text-white shadow-lg transition-colors`}
					style={{ backgroundImage: `linear-gradient(to bottom right, ${theme[0]},${theme[1]}` }}
				>
					<div
						className={`bg-clr-bg/10 hover:bg-clr-bg/20 flex min-h-[200px] w-full flex-col p-4 transition md:py-5 lg:h-80`}
					>
						<p className="text-two-line lg:text-five-line m-0 mt-2 overflow-hidden text-ellipsis break-words font-serif text-3xl font-black text-white">
							{name}
						</p>
						<p className="font-serif text-sm font-medium">
							{members.length || 1} {members.length > 1 ? 'members' : 'member'}
						</p>
						<div className="mt-auto flex flex-wrap gap-1">
							<Chip Icon={MapPin}>Harvard</Chip>
							<Chip Icon={Code}>Programing</Chip>
							<Chip Icon={privacy === 'public' ? Book : privacy === 'invite' ? Inbox : Lock}>
								{privacy}
							</Chip>
							<Chip Icon={LinkIcon}>{code}</Chip>
						</div>
					</div>
				</div>
			</a>
		</Link>
	)
}
