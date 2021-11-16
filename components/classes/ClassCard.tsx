import React from 'react'
import Link from 'next/link'
import styles from 'styles/Classes.module.scss'
import Image from 'next/image'

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
                <div className='mr-3'>
                    <Image
                        src='/rock.jpeg'
                        className='rounded-lg'
                        alt='me'
                        layout='intrinsic'
                        width='100%'
                        height='100%'
                    />
                </div>
                <div>
                    <h3>{name}</h3>
                    <p>{participantsIds.length} students</p>
                    <p>Class code: {code}</p>
                </div>
            </div>
        </Link>
    )
}
