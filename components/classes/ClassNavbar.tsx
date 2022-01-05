import React from 'react'
import Link from 'next/link'
import styles from '../../styles/classes.module.scss'
import { useRouter } from 'next/router'
interface TopBarOptionProps {
	link: string
}

const TopBarOption: React.FC<TopBarOptionProps> = ({ children, link }) => {
	const router = useRouter()
	const active = router.asPath === link
	return (
		<Link href={link} passHref={true}>
			<div className={active ? styles.optionActive : styles.option}>{children}</div>
		</Link>
	)
}

const ClassNavbar: React.FC = () => {
	const router = useRouter()
	const { classId } = router.query

	return (
		<div>
			<div className="flex border-b">
				<TopBarOption link={`/classes/${classId}`}>Class</TopBarOption>

				<TopBarOption link={`/classes/${classId}/homework`}>Homework</TopBarOption>
				<TopBarOption link={`/classes/${classId}/students`}>Students</TopBarOption>
			</div>
		</div>
	)
}

export default ClassNavbar
