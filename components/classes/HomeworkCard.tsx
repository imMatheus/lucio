import Homework from '@/types/Homework'
import React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Calendar } from 'react-feather'
interface HomeworkCardProps {
	homework: Homework
}

const HomeworkCard: React.FC<HomeworkCardProps> = ({ homework }) => {
	const router = useRouter()
	return (
		<Link href={`${router.asPath}/${homework.id}`} passHref={true}>
			<div className="border border-text border-separate p-4 mb-2 cursor-pointer transition-shadow hover:shadow-lg focus:bg-red-600">
				<div className="flex mb-1 items-center">
					<Calendar className="w-4 h-4 flex-shrink-0 mr-1" />
					<p className="text-xs font-semibold">Pased dua date</p>
				</div>
				<h3>{homework.title}</h3>
				<p>{homework.description}</p>
			</div>
		</Link>
	)
}

export default HomeworkCard
