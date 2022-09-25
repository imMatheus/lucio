import React from 'react'
import { inferQueryOutput } from '@/utils/trpc'
import styles from './index.module.scss'
import Link from 'next/link'
import Chip from './Chip'
import { Book, Link as LinkIcon, Code, Inbox, MapPin, Lock } from 'react-feather'

interface ClassroomCardProps {
	classroom: inferQueryOutput<'classrooms.getAll'>[number]
}

const ClassroomCard: React.FC<ClassroomCardProps> = ({
	classroom: { name, id, code, mainColor, secondaryColor, privacy, _count }
}) => {
	return (
		<Link href={`/classes/${id}`} passHref={true}>
			<a>
				<div className="group relative cursor-pointer overflow-hidden rounded-2xl bg-gradient-to-br text-white shadow-lg transition-colors">
					<div
						className="absolute -inset-12 transition-all group-hover:inset-0"
						style={{ backgroundImage: `linear-gradient(125deg, ${mainColor},${secondaryColor}` }}
					></div>
					<div
						className={`relative z-50 flex min-h-[200px] w-full flex-col bg-clr-bg/10 p-4 transition hover:bg-clr-bg/20 md:py-5 lg:h-80`}
					>
						<p className="text-two-line lg:text-five-line overflow-hidden text-ellipsis break-words font-serif text-2xl font-black text-white sm:text-3xl">
							{name}
						</p>
						<p className="font-serif text-sm font-medium">{_count.members} members</p>
						<div className="mt-auto flex flex-wrap gap-1">
							<Chip Icon={MapPin}>Harvard</Chip>
							<Chip Icon={Code}>Programing</Chip>
							<Chip Icon={privacy === 'OPEN' ? Book : privacy === 'INVITE' ? Inbox : Lock}>
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

export default ClassroomCard
