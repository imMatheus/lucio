import React, { ReactElement } from 'react'
import styles from 'styles/Classes.module.scss'
import SVG from 'react-inlinesvg'

interface Props {
    image: string
    name: string
}

export default function StudentCard({ image, name }: Props): ReactElement {
    return (
        <div className={styles.studentCard}>
            <span className='rounded-full bg-red-400 w-7 h-7 mr-3 overflow-hidden'>
                <SVG src={image} />
            </span>
            <p>{name}</p>
            studetn card
        </div>
    )
}
