import Homework from '@/types/Homework'
import React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/Link'

interface HomeworkCardProps {
	homework: Homework
}

const HomeworkCard: React.FC<HomeworkCardProps> = ({ homework }) => {
	const router = useRouter()
	return (
		<Link href={`${router.asPath}/${homework.id}`}>
			<div className="border border-text border-separate p-4 mb-2 cursor-pointer">
				<p className="text-sm font-bold">Pased dua date</p>
				<h3>{homework.title}</h3>
				<p>hej på dig snälla sluta vara gay</p>
			</div>
		</Link>
	)
}

export default HomeworkCard
