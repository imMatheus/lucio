import React from 'react'
import { useRouter } from 'next/router'
import ClassNavbarOption from './tab'
import { ArrowLeft } from 'react-feather'
import Link from 'next/link'

const ClassNavbar: React.FC = () => {
	const router = useRouter()
	const { classId } = router.query

	// TODO fix bug were changing url is clunky

	return (
		<div>
			<Link href="/classes" passHref={true}>
				<a className="group mb-1 flex w-max items-center gap-1 text-clr-text-grayed">
					<ArrowLeft className="h-4 w-4" />
					<p className="text-xs underline-offset-1 group-hover:underline sm:text-sm">All classes</p>
				</a>
			</Link>
			{/* <h2 className="mb-2 text-3xl font-medium">{classData.name}</h2> */}
			<div className="flex border-b">
				<ClassNavbarOption link={`/classes/${classId}`}>Class</ClassNavbarOption>
				<ClassNavbarOption link={`/classes/${classId}/homework`}>Homework</ClassNavbarOption>
				<ClassNavbarOption link={`/classes/${classId}/members`}>Members</ClassNavbarOption>
				<ClassNavbarOption link={`/classes/${classId}/settings`}>Settings</ClassNavbarOption>
			</div>
		</div>
	)
}

export default ClassNavbar
