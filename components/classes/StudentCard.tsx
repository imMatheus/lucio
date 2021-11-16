import React, { ReactElement } from 'react'
import styles from 'styles/Classes.module.scss'
import SVG from 'react-inlinesvg'

interface Props {
    image: string
    name: string
}

export default function StudentCard({ image, name }: Props): ReactElement {
    return (
        // <div className={styles.studentCard}>
        //     <span className='rounded-full bg-red-400 w-6 h-6 mr-3 overflow-hidden'>
        //         <SVG src={image} />
        //     </span>
        //     <p className='mr-3'>{name}</p>
        //     studetn card
        // </div>
        <tr className={styles.studentCard}>
            <td className='flex items-center'>
                <SVG src={image} className='w-8 h-8 rounded-full overflow-hidden mr-3' />
                {name}
            </td>
            <td>10000</td>
            <td>10000</td>
            <td>10000</td>
        </tr>
    )
}
