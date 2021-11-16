import React from 'react'
import Link from 'next/link'
import styles from 'styles/Classes.module.scss'

interface ClassesCardProps {
    name: string
    code: string
    participantsIds: string[]
}

export default function ClassCard({
    name,
    code,
    participantsIds,
}: ClassesCardProps) {
    return (
        <Link href={`/classes/${code}`} passHref={true}>
            <div className={styles.classCard}>
                <h3>{name}</h3>
                <p>{participantsIds.length} students</p>
                <p>Class code: {code}</p>
            </div>
        </Link>
    )
}
