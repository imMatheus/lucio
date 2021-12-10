import React from 'react'
import Link from 'next/link'
import styles from 'styles/Classes.module.scss'
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
				<TopBarOption link={`/classes/${classId}`}>main</TopBarOption>

				<TopBarOption link={`/classes/${classId}/homework`}>homework</TopBarOption>
				<TopBarOption link={`/classes/${classId}/students`}>students</TopBarOption>
			</div>
		</div>
	)
}

export default ClassNavbar
