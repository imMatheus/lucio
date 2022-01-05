import React from 'react'
import Link from 'next/link'
import styles from '../../styles/classes.module.scss'
import Image from 'next/image'
import ClassType from '@/types/ClassType'

interface ClassesCardProps {
	data: ClassType
	img: string
}

export default function ClassCard({ data: { id, name, code, participantsIds }, img }: ClassesCardProps) {
	return (
		<Link href={`/classes/${id}`} passHref={true}>
			<div className={styles.classCard}>
				{/* <div className='mr-3 relative'> */}
				<div className={styles.image}>
					<Image src={img} className="rounded-md" alt="me" layout="fill" objectFit="cover" />
				</div>
				{/* </div> */}
				<div className="ml-3">
					<h3>{name}</h3>
					<p>{participantsIds.length} students</p>
					<p>Class code: {code}</p>
					<p>Class code: {id}</p>
				</div>
			</div>
		</Link>
	)
}
