// import Homework from '@/types/ClassType'
import React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Calendar } from 'react-feather'
interface HomeworkCardProps {
	// homework: Homework
}

// const HomeworkCard: React.FC<HomeworkCardProps> = ({ homework }) => {
const HomeworkCard: React.FC<HomeworkCardProps> = ({}) => {
	const router = useRouter()
	return (
		<p className="bg-red-500">hell world</p>
		// <Link href={`${router.asPath}/${homework.id}`} passHref={true}>
		// 	<div className="border border-orange-500 border-separate p-4 mb-2 cursor-pointer transition-shadow hover:shadow-lg focus:bg-red-600">
		// 		<div className="flex mb-1 items-center">
		// 			<Calendar className="w-4 h-4 flex-shrink-0 mr-1" />
		// 			<p className="text-xs font-semibold">Pased dua date</p>
		// 		</div>
		// 		<h3>{homework.title}</h3>
		// 		<p>{homework.description}</p>
		// 	</div>
		// </Link>
	)
}

export default HomeworkCard
