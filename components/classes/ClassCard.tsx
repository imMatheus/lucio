import React from 'react'
import Link from 'next/link'
import styles from 'styles/Classes.module.scss'

interface ClassesCardProps {
    classId: string
}

export default function ClassCard({ classId }: ClassesCardProps) {
    return (
        <Link href={`/classes/${classId}`} passHref={true}>
            <div className={styles.classCard}>
                <h3>CS50 Harvard</h3>
                <p>12 students</p>
                <p>Class code: {classId}</p>
            </div>
        </Link>
    )
}
